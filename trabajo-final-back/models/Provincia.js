const { DataTypes } = require("sequelize");
const { textoObligatorio } = require("../utils/modelValidations");

module.exports = (sequelize) => {
  sequelize.define("provincia", {
    id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false, validate: { textoObligatorio }, unique: true }
  }, {
    tableName: "provincia",
    timestamps: false
  });
};
