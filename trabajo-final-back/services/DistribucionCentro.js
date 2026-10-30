
const { distribucionCentro } = require("../models");

const listarDistribucionesCentro = async () => {
  return await distribucionCentro.findAll({
    order: [["id", "ASC"]],
  });
};

const obtenerDistribucionCentroPorId = async (id) => {
  return await distribucionCentro.findByPk(id);
};

const crearDistribucionCentro = async (datos) => {
  return await distribucionCentro.create(datos);
};

const actualizarDistribucionCentro = async (id, datos) => {
  const registro = await distribucionCentro.findByPk(id);

  if (!registro) {
    return null;
  }

  await registro.update(datos);
  return registro;
};

const eliminarDistribucionCentro = async (id) => {
  const registro = await distribucionCentro.findByPk(id);

  if (!registro) {
    return null;
  }

  await registro.destroy();
  return registro;
};

module.exports = {
  listarDistribucionesCentro,
  obtenerDistribucionCentroPorId,
  crearDistribucionCentro,
  actualizarDistribucionCentro,
  eliminarDistribucionCentro,
};
