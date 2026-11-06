
const { Comprobante: comprobante } = require("../db");

const listar = async () => {
  return await comprobante.findAll({
    order: [["id", "ASC"]],
  });
};

const obtenerPorId = async (id) => {
  return await comprobante.findOne({
    where: { id },
  });
};

const crear = async (datos) => {
  return await comprobante.create({
    ...datos,
    estado: "BORRADOR",
  });
};

const actualizar = async (id, datos) => {
  const registro = await obtenerPorId(id);

  if (!registro) return null;

  // El estado se gestiona mediante acciones específicas.
  const { id: ignorado, estado, ...datosActualizables } = datos;

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

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  anular,
};
