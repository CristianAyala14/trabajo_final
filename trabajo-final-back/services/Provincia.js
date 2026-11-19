
const { Provincia: provincia } = require("../db");

const listarProvincias = async () => {
  return await provincia.findAll({
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

  if (!registro) {
    return null;
  }

  await registro.update(datos);
  return registro;
};

const eliminarProvincia = async (id) => {
  const registro = await provincia.findByPk(id);

  if (!registro) {
    return null;
  }

  await registro.destroy();
  return registro;
};

module.exports = {
  listarProvincias,
  obtenerProvinciaPorId,
  crearProvincia,
  actualizarProvincia,
  eliminarProvincia,
};
