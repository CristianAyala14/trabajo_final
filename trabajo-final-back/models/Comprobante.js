const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Comprobante",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },

      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["FACTURA", "NOTA_CREDITO", "NOTA_DEBITO"]],
        },
      },

      numero: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      fechaEmision: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: "fecha_emision",
      },

      contratoId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "contrato_id",
      },

      periodoServicioId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "periodo_servicio_id",
      },

      cuentaContableId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "cuenta_contable_id",
      },

      facturaOrigenId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "factura_origen_id",
      },

      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      importeNeto: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: "importe_neto",
        validate: {
          min: 0,
        },
      },

      importeIva: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: "importe_iva",
        validate: {
          min: 0,
        },
      },

      estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "BORRADOR",
        validate: {
          isIn: [["BORRADOR", "CONFIRMADO", "ANULADO"]],
        },
      },

      importeTotal: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        field: "importe_total",
      },
    },
    {
      tableName: "comprobante",
      timestamps: false,
    }
  );
};