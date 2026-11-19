const { DataTypes } = require("sequelize");
const { textoObligatorio } = require("../utils/modelValidations");

module.exports = (sequelize) => {
  sequelize.define("cuentaContable", {
    id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    codigo: { type: DataTypes.STRING(40), allowNull: false, validate: { textoObligatorio }, unique: true },
    nombre: { type: DataTypes.STRING(150), allowNull: false, validate: { textoObligatorio } },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  }, {
    tableName: "cuenta_contable",
    timestamps: false
  });
};
