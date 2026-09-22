const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "distribucionComprobante",
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

      centroCostoId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "centro_costo_id",
      },

      importeNeto: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: "importe_neto",
      },
    },
    {
      tableName: "distribucion_comprobante",
      timestamps: false,
    }
  );
};