
const { provincia } = require("../models");

const listarProvincias = async () => {
  return await provincia.findAll({
    where: { activo: true },
    order: [["id", "ASC"]],
  });
};

const obtenerProvinciaPorId = async (id) => {
  return await provincia.findByPk(id);
};

const crearProvincia = async (datos) => {
  return await provincia.create(datos);
};

const actualizarProvincia = async (id, datos) => {
  const registro = await provincia.findByPk(id);

  if (!registro || !registro.activo) {
    return null;
  }

  await registro.update(datos);
  return registro;
};

const eliminarProvincia = async (id) => {
  const registro = await provincia.findByPk(id);

  if (!registro || !registro.activo) {
    return null;
  }

  await registro.update({ activo: false });
  return registro;
};

module.exports = {
  listarProvincias,
  obtenerProvinciaPorId,
  crearProvincia,
  actualizarProvincia,
  eliminarProvincia,
};
