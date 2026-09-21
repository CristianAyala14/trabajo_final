const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Provincia",
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
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      tableName: "provincia",
      timestamps: false,
    }
  );
};