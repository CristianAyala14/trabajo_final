const { DataTypes } = require("sequelize");
const { importePositivo } = require("../utils/modelValidations");

module.exports = (sequelize) => {
  sequelize.define("distribucionComprobante", {
    id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    comprobanteId: { type: DataTypes.BIGINT, allowNull: false, field: "comprobante_id" },
    categoriaFiscalId: { type: DataTypes.BIGINT, allowNull: false, field: "categoria_fiscal_id" },
    centroCostoId: { type: DataTypes.BIGINT, allowNull: false, field: "centro_costo_id" },
    importeNeto: { type: DataTypes.DECIMAL(20, 2), allowNull: false, field: "importe_neto", validate: { importePositivo } }
  }, {
    tableName: "distribucion_comprobante",
    timestamps: false,
    indexes: [
      { unique: true, fields: ["comprobante_id", "categoria_fiscal_id", "centro_costo_id"] },
      { name: "distribucion_comprobante_categoria_idx", fields: ["categoria_fiscal_id"] },
      { name: "distribucion_comprobante_centro_idx", fields: ["centro_costo_id"] }
    ]
  });
};
