const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "provincia",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },

      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "provincia",
      timestamps: false,
    }
  );
};