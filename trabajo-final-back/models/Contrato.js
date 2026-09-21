const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Contrato",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },

      clienteId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "cliente_id",
      },

      numero: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      fechaInicio: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: "fecha_inicio",
      },

      fechaFin: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: "fecha_fin",
      },

      cuentaContableId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "cuenta_contable_id",
      },
    },
    {
      tableName: "contrato",
      timestamps: false,
    }
  );
};