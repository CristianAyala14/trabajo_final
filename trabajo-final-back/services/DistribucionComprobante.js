
const { distribucionComprobante } = require("../models");

const listarDistribucionesComprobante = async () => {
  return await distribucionComprobante.findAll({
    order: [["id", "ASC"]],
  });
};

const obtenerDistribucionComprobantePorId = async (id) => {
  return await distribucionComprobante.findByPk(id);
};

const crearDistribucionComprobante = async (datos) => {
  return await distribucionComprobante.create(datos);
};

const actualizarDistribucionComprobante = async (id, datos) => {
  const registro = await distribucionComprobante.findByPk(id);

  if (!registro) {
    return null;
  }

  await registro.update(datos);
  return registro;
};

const eliminarDistribucionComprobante = async (id) => {
  const registro = await distribucionComprobante.findByPk(id);

  if (!registro) {
    return null;
  }

  await registro.destroy();
  return registro;
};

module.exports = {
  listarDistribucionesComprobante,
  obtenerDistribucionComprobantePorId,
  crearDistribucionComprobante,
  actualizarDistribucionComprobante,
  eliminarDistribucionComprobante,
};
