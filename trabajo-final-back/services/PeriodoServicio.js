
const { periodoServicio } = require("../models");

const listarPeriodosServicio = async () => {
  return await periodoServicio.findAll({
    order: [["id", "ASC"]],
  });
};

const obtenerPeriodoServicioPorId = async (id) => {
  return await periodoServicio.findByPk(id);
};

const crearPeriodoServicio = async (datos) => {
  return await periodoServicio.create(datos);
};

const actualizarPeriodoServicio = async (id, datos) => {
  const registro = await periodoServicio.findByPk(id);

  if (!registro) {
    return null;
  }

  await registro.update(datos);
  return registro;
};

const eliminarPeriodoServicio = async (id) => {
  const registro = await periodoServicio.findByPk(id);

  if (!registro) {
    return null;
  }

  await registro.destroy();
  return registro;
};

module.exports = {
  listarPeriodosServicio,
  obtenerPeriodoServicioPorId,
  crearPeriodoServicio,
  actualizarPeriodoServicio,
  eliminarPeriodoServicio,
};
