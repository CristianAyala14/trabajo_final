const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "distribucionCentro",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },

      comprobanteId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "comprobante_id",
      },

      centroCostoId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "centro_costo_id",
      },

      importe: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      tableName: "distribucion_centro_anterior",
      timestamps: false,
    }
  );
};