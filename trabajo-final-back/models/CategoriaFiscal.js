const { DataTypes } = require("sequelize");
const { textoObligatorio, alicuota } = require("../utils/modelValidations");

module.exports = (sequelize) => {
  sequelize.define("categoriaFiscal", {
    id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    provinciaId: { type: DataTypes.BIGINT, allowNull: true, field: "provincia_id" },
    nombre: { type: DataTypes.STRING(120), allowNull: false, validate: { textoObligatorio }, unique: true },
    imponible: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    alicuota: { type: DataTypes.DECIMAL(9, 6), allowNull: true, validate: { alicuota } }
  }, {
    tableName: "categoria_fiscal",
    timestamps: false,
    validate: { provinciaImponible() { if (this.imponible && this.provinciaId == null) throw new Error("Una categoría imponible requiere provincia"); } },
    indexes: [{ name: "categoria_fiscal_provincia_idx", fields: ["provincia_id"] }]
  });
};
