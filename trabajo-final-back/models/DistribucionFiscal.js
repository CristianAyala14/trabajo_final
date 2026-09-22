const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "distribucionFiscal",
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

      categoriaFiscalId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "categoria_fiscal_id",
      },

      importe: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      tableName: "distribucion_fiscal_anterior",
      timestamps: false,
    }
  );
};