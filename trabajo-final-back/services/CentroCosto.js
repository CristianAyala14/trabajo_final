
const { centroCosto } = require("../models");

const listarCentrosCosto = async () => {
  return await centroCosto.findAll({
    where: { activo: true },
    order: [["id", "ASC"]],
  });
};

const obtenerCentroCostoPorId = async (id) => {
  return await centroCosto.findByPk(id);
};



const crearCentroCosto = async (datos) => {
  return await centroCosto.create(datos);
};

const actualizarCentroCosto = async (id, datos) => {
  const registro = await centroCosto.findByPk(id);

  if (!registro || !registro.activo) {
    return null;
  }

  await registro.update(datos);
  return registro;
};

const eliminarCentroCosto = async (id) => {
  const registro = await centroCosto.findByPk(id);

  if (!registro || !registro.activo) {
    return null;
  }

  await registro.update({ activo: false });
  return registro;
};

module.exports = {
  listarCentrosCosto,
  obtenerCentroCostoPorId,
  crearCentroCosto,
  actualizarCentroCosto,
  eliminarCentroCosto,
};
