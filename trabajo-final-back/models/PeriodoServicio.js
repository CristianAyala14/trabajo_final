const { DataTypes } = require("sequelize");
const { textoObligatorio, fechasOrdenadas } = require("../utils/modelValidations");

module.exports = (sequelize) => {
  sequelize.define("periodoServicio", {
    id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(80), allowNull: false, validate: { textoObligatorio } },
    fechaInicio: { type: DataTypes.DATEONLY, allowNull: false, field: "fecha_inicio" },
    fechaFin: { type: DataTypes.DATEONLY, allowNull: false, field: "fecha_fin" }
  }, {
    tableName: "periodo_servicio",
    timestamps: false,
    validate: { fechasOrdenadas }
  });
};
