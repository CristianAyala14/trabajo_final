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
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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