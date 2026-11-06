const { DataTypes, ValidationError } = require("sequelize");
const { textoObligatorio, importe, importePositivo } = require("../utils/modelValidations");

module.exports = (sequelize) => {
  sequelize.define("comprobante", {
    id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    tipo: { type: DataTypes.STRING(20), allowNull: false, validate: { isIn: [["FACTURA", "NOTA_CREDITO", "NOTA_DEBITO"]] } },
    numero: { type: DataTypes.STRING(80), allowNull: false, validate: { textoObligatorio } },
    fechaEmision: { type: DataTypes.DATEONLY, allowNull: false, field: "fecha_emision" },
    contratoId: { type: DataTypes.BIGINT, allowNull: false, field: "contrato_id" },
    periodoServicioId: { type: DataTypes.BIGINT, allowNull: false, field: "periodo_servicio_id" },
    cuentaContableId: { type: DataTypes.BIGINT, allowNull: false, field: "cuenta_contable_id" },
    facturaOrigenId: { type: DataTypes.BIGINT, allowNull: true, field: "factura_origen_id" },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
    importeNeto: { type: DataTypes.DECIMAL(20, 2), allowNull: false, field: "importe_neto", validate: { importe } },
    importeIva: { type: DataTypes.DECIMAL(20, 2), allowNull: false, field: "importe_iva", validate: { importe } },
    // PostgreSQL calcula esta columna. No se incluye en escrituras del ORM.
    importeTotal: { type: DataTypes.DECIMAL(21, 2), field: "importe_total", allowNull: true,
      set() { throw new ValidationError("importeTotal es calculado por PostgreSQL y no se puede editar"); } },
    estado: { type: DataTypes.STRING(20), allowNull: false, defaultValue: "BORRADOR", validate: { isIn: [["BORRADOR", "CONFIRMADO", "ANULADO"]] } }
  }, {
    tableName: "comprobante",
    timestamps: false,
    validate: {
      origenYMotivo() {
        if (this.tipo === "FACTURA" && this.facturaOrigenId != null) throw new Error("Una factura no puede tener factura de origen");
        if (["NOTA_CREDITO", "NOTA_DEBITO"].includes(this.tipo)) {
          if (this.facturaOrigenId == null) throw new Error("La nota requiere factura de origen");
          textoObligatorio(this.descripcion);
        }
        if (this.id != null && this.facturaOrigenId != null && String(this.id) === String(this.facturaOrigenId)) throw new Error("El origen no puede ser el propio comprobante");
      },
      netoConfirmado() { if (this.estado === "CONFIRMADO") importePositivo(this.importeNeto); }
    },
    hooks: {
      beforeSave(registro, options) { options.fields = options.fields.filter(field => field !== "importeTotal"); },
      beforeBulkCreate(registros, options) { options.fields = options.fields.filter(field => field !== "importeTotal"); },
      beforeBulkUpdate(options) { delete options.attributes.importeTotal; options.fields = options.fields.filter(field => field !== "importeTotal"); }
    },
    indexes: [
      { unique: true, fields: ["tipo", "numero"] },
      { name: "comprobante_contrato_fecha_idx", fields: ["contrato_id", "fecha_emision"] },
      { name: "comprobante_periodo_fecha_idx", fields: ["periodo_servicio_id", "fecha_emision"] },
      { name: "comprobante_cuenta_idx", fields: ["cuenta_contable_id"] },
      { name: "comprobante_origen_idx", fields: ["factura_origen_id"] },
      { name: "comprobante_fecha_estado_idx", fields: ["fecha_emision", "estado"] }
    ]
  });
};
