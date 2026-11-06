
const { CategoriaFiscal: categoriaFiscal } = require("../db");

const listarCategoriasFiscales = async () => {
  return await categoriaFiscal.findAll({
    order: [["id", "ASC"]],
  });
};

const obtenerCategoriaFiscalPorId = async (id) => {
  return await categoriaFiscal.findByPk(id);
};

const crearCategoriaFiscal = async (datos) => {
  return await categoriaFiscal.create(datos);
};

const actualizarCategoriaFiscal = async (id, datos) => {
  const registro = await categoriaFiscal.findByPk(id);

  if (!registro) {
    return null;
  }

  await registro.update(datos);
  return registro;
};

const eliminarCategoriaFiscal = async (id) => {
  const registro = await categoriaFiscal.findByPk(id);

  if (!registro) {
    return null;
  }

  await registro.destroy();
  return registro;
};

module.exports = {
  listarCategoriasFiscales,
  obtenerCategoriaFiscalPorId,
  crearCategoriaFiscal,
  actualizarCategoriaFiscal,
  eliminarCategoriaFiscal,
};
