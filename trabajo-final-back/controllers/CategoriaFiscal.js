
const categoriaFiscalService = require("../services/CategoriaFiscal");

const listarCategoriasFiscales = async (req, res) => {
  try {
    const categorias = await categoriaFiscalService.listarCategoriasFiscales();
    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al listar categorías fiscales",
      error: error.message,
    });
  }
};

const obtenerCategoriaFiscalPorId = async (req, res) => {
  try {
    const categoria = await categoriaFiscalService.obtenerCategoriaFiscalPorId(
      req.params.id
    );

    if (!categoria) {
      return res.status(404).json({
        mensaje: "Categoría fiscal no encontrada",
      });
    }

    return res.status(200).json(categoria);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener la categoría fiscal",
      error: error.message,
    });
  }
};

const crearCategoriaFiscal = async (req, res) => {
  try {
    const categoria = await categoriaFiscalService.crearCategoriaFiscal(
      req.body
    );

    return res.status(201).json(categoria);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        mensaje: "Ya existe una categoría fiscal con ese nombre",
      });
    }

    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      return res.status(400).json({
        mensaje: "Los datos de la categoría fiscal no son válidos",
        error: error.message,
      });
    }

    return res.status(500).json({
      mensaje: "Error al crear la categoría fiscal",
      error: error.message,
    });
  }
};

const actualizarCategoriaFiscal = async (req, res) => {
  try {
    const categoria = await categoriaFiscalService.actualizarCategoriaFiscal(
      req.params.id,
      req.body
    );

    if (!categoria) {
      return res.status(404).json({
        mensaje: "Categoría fiscal no encontrada o inactiva",
      });
    }

    return res.status(200).json(categoria);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        mensaje: "Ya existe una categoría fiscal con ese nombre",
      });
    }

    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      return res.status(400).json({
        mensaje: "Los datos de la categoría fiscal no son válidos",
        error: error.message,
      });
    }

    return res.status(500).json({
      mensaje: "Error al actualizar la categoría fiscal",
      error: error.message,
    });
  }
};

const eliminarCategoriaFiscal = async (req, res) => {
  try {
    const categoria = await categoriaFiscalService.eliminarCategoriaFiscal(
      req.params.id
    );

    if (!categoria) {
      return res.status(404).json({
        mensaje: "Categoría fiscal no encontrada o ya inactiva",
      });
    }

    return res.status(200).json({
      mensaje: "Categoría fiscal desactivada correctamente",
      categoria,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al desactivar la categoría fiscal",
      error: error.message,
    });
  }
};

module.exports = {
  listarCategoriasFiscales,
  obtenerCategoriaFiscalPorId,
  crearCategoriaFiscal,
  actualizarCategoriaFiscal,
  eliminarCategoriaFiscal,
};
