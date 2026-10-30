
const { contrato, cliente } = require("../models");

const listarContratos = async () => {
  return await contrato.findAll({
    where: { activo: true },
    order: [["id", "ASC"]],
  });
};

const obtenerContratoPorId = async (id) => {
  return await contrato.findByPk(id);
};

const crearContrato = async (datos) => {
  const clienteExistente = await cliente.findByPk(datos.clienteId);

  if (!clienteExistente || !clienteExistente.activo) {
    const error = new Error("El cliente no existe o está inactivo");
    error.status = 400;
    throw error;
  }

  return await contrato.create(datos);
};

const actualizarContrato = async (id, datos) => {
  const registro = await contrato.findByPk(id);

  if (!registro || !registro.activo) {
    return null;
  }

  if (datos.clienteId !== undefined) {
    const clienteExistente = await cliente.findByPk(datos.clienteId);

    if (!clienteExistente || !clienteExistente.activo) {
      const error = new Error("El cliente no existe o está inactivo");
      error.status = 400;
      throw error;
    }
  }

  await registro.update(datos);
  return registro;
};

const eliminarContrato = async (id) => {
  const registro = await contrato.findByPk(id);

  if (!registro || !registro.activo) {
    return null;
  }

  await registro.update({ activo: false });
  return registro;
};

module.exports = {
  listarContratos,
  obtenerContratoPorId,
  crearContrato,
  actualizarContrato,
  eliminarContrato,
};
