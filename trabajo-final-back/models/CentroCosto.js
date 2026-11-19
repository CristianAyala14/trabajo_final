const { DataTypes } = require("sequelize");
const { textoObligatorio } = require("../utils/modelValidations");

module.exports = (sequelize) => {
  sequelize.define("centroCosto", {
    id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    codigo: { type: DataTypes.STRING(30), allowNull: false, validate: { textoObligatorio }, unique: true },
    nombre: { type: DataTypes.STRING(150), allowNull: false, validate: { textoObligatorio } },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  }, {
    tableName: "centro_costo",
    timestamps: false
  });
};
