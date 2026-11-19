const { DataTypes } = require("sequelize");
const { textoObligatorio } = require("../utils/modelValidations");

module.exports = (sequelize) => {
  sequelize.define("cliente", {
    id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(200), allowNull: false, validate: { textoObligatorio } },
    razonSocial: { type: DataTypes.STRING(200), allowNull: true, field: "razon_social" },
    identificacionFiscal: { type: DataTypes.STRING(30), allowNull: true, field: "identificacion_fiscal", unique: true },
    telefono: { type: DataTypes.STRING(40), allowNull: true },
    domicilio: { type: DataTypes.TEXT, allowNull: true },
    email: { type: DataTypes.STRING(254), allowNull: true, validate: { isEmail: true } },
    provinciaId: { type: DataTypes.BIGINT, allowNull: true, field: "provincia_id" },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  }, {
    tableName: "cliente",
    timestamps: false,
    indexes: [{ name: "cliente_provincia_idx", fields: ["provincia_id"] }]
  });
};
