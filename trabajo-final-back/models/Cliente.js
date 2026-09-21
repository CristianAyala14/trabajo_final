const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Cliente",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },

      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      identificacionFiscal: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        field: "identificacion_fiscal",
      },

      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      razonSocial: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "razon_social",
      },

      telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      domicilio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      provinciaId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "provincia_id",
      },
    },
    {
      tableName: "cliente",
      timestamps: false,
    }
  );
};