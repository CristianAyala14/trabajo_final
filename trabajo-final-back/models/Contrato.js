const { DataTypes } = require("sequelize");
const { textoObligatorio, fechasOrdenadas } = require("../utils/modelValidations");

module.exports = (sequelize) => {
  sequelize.define("contrato", {
    id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    clienteId: { type: DataTypes.BIGINT, allowNull: false, field: "cliente_id" },
    numero: { type: DataTypes.STRING(80), allowNull: false, validate: { textoObligatorio } },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
    fechaInicio: { type: DataTypes.DATEONLY, allowNull: true, field: "fecha_inicio" },
    fechaFin: { type: DataTypes.DATEONLY, allowNull: true, field: "fecha_fin" },
    cuentaContableId: { type: DataTypes.BIGINT, allowNull: true, field: "cuenta_contable_id" },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  }, {
    tableName: "contrato",
    timestamps: false,
    validate: { fechasOrdenadas }, indexes: [{ unique: true, fields: ["cliente_id", "numero"] }, { name: "contrato_cuenta_idx", fields: ["cuenta_contable_id"] }]
  });
};
