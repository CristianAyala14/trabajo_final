
const { comprobante } = require("../models");

const listar = async () => {
  return await comprobante.findAll({
    where: { activo: true },
    order: [["id", "ASC"]],
  });
};

const obtenerPorId = async (id) => {
  return await comprobante.findOne({
    where: { id, activo: true },
  });
};

const crear = async (datos) => {
  return await comprobante.create({
    ...datos,
    estado: "BORRADOR",
    activo: true,
  });
};

const actualizar = async (id, datos) => {
  const registro = await obtenerPorId(id);

  if (!registro) return null;

  // El estado y la baja lógica se gestionan por separado.
  const { id: ignorado, estado, activo, ...datosActualizables } = datos;

  await registro.update(datosActualizables);

  return registro;
};

const anular = async (id) => {
  const registro = await obtenerPorId(id);

  if (!registro) return null;

  if (registro.estado === "ANULADO") {
    const error = new Error("El comprobante ya está anulado");
    error.statusCode = 409;
    throw error;
  }

  await registro.update({ estado: "ANULADO" });

  return registro;
};

const eliminar = async (id) => {
  const registro = await obtenerPorId(id);

  if (!registro) return null;

  await registro.update({ activo: false });

  return registro;
};

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  anular,
  eliminar,
};
