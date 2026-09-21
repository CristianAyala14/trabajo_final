const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "CategoriaFiscal",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },

      provinciaId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "provincia_id",
      },

      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },

      imponible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      alicuota: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        validate: {
          min: 0,
          max: 1,
        },
      },
    },
    {
      tableName: "categoria_fiscal",
      timestamps: false,
    }
  );
};