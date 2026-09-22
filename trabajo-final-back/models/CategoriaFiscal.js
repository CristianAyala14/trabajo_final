const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "categoriaFiscal",
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
      },

      imponible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      alicuota: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
    },
    {
      tableName: "categoria_fiscal",
      timestamps: false,
    }
  );
};