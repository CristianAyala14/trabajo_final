
const { distribucionFiscal } = require("../models");

const listarDistribucionesFiscales = async () => {
  return await distribucionFiscal.findAll({
    order: [["id", "ASC"]],
  });
};

const obtenerDistribucionFiscalPorId = async (id) => {
  return await distribucionFiscal.findByPk(id);
};

const crearDistribucionFiscal = async (datos) => {
  return await distribucionFiscal.create(datos);
};

const actualizarDistribucionFiscal = async (id, datos) => {
  const registro = await distribucionFiscal.findByPk(id);

  if (!registro) {
    return null;
  }

  await registro.update(datos);
  return registro;
};

const eliminarDistribucionFiscal = async (id) => {
  const registro = await distribucionFiscal.findByPk(id);

  if (!registro) {
    return null;
  }

  await registro.destroy();
  return registro;
};

module.exports = {
  listarDistribucionesFiscales,
  obtenerDistribucionFiscalPorId,
  crearDistribucionFiscal,
  actualizarDistribucionFiscal,
  eliminarDistribucionFiscal,
};
