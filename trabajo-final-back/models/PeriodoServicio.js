const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "PeriodoServicio",
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

      fechaInicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: "fecha_inicio",
      },

      fechaFin: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: "fecha_fin",
      },
    },
    {
      tableName: "periodo_servicio",
      timestamps: false,
    }
  );
};