
const { cliente } = require("../models");

const listarClientes = async () => {
  return await cliente.findAll({
    where: { activo: true },
    order: [["id", "ASC"]],
  });
};

const obtenerClientePorId = async (id) => {
  return await cliente.findByPk(id);
};

const crearCliente = async (datos) => {
  return await cliente.create(datos);
};

const actualizarCliente = async (id, datos) => {
  const registro = await cliente.findByPk(id);

  if (!registro || !registro.activo) {
    return null;
  }

  await registro.update(datos);
  return registro;
};

const eliminarCliente = async (id) => {
  const registro = await cliente.findByPk(id);

  if (!registro || !registro.activo) {
    return null;
  }

  await registro.update({ activo: false });
  return registro;
};

module.exports = {
  listarClientes,
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
};
