
const { cuentaContable } = require("../models");

const listarCuentasContables = async () => {
  return await cuentaContable.findAll({
    where: { activo: true },
    order: [["id", "ASC"]],
  });
};

const obtenerCuentaContablePorId = async (id) => {
  return await cuentaContable.findByPk(id);
};

const crearCuentaContable = async (datos) => {
  return await cuentaContable.create(datos);
};

const actualizarCuentaContable = async (id, datos) => {
  const registro = await cuentaContable.findByPk(id);

  if (!registro || !registro.activo) {
    return null;
  }

  await registro.update(datos);
  return registro;
};

const eliminarCuentaContable = async (id) => {
  const registro = await cuentaContable.findByPk(id);

  if (!registro || !registro.activo) {
    return null;
  }

  await registro.update({ activo: false });
  return registro;
};

module.exports = {
  listarCuentasContables,
  obtenerCuentaContablePorId,
  crearCuentaContable,
  actualizarCuentaContable,
  eliminarCuentaContable,
};
