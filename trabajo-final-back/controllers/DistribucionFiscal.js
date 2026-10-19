
const distribucionFiscalService = require("../services/DistribucionFiscal");

const listarDistribucionesFiscales = async (req, res) => {
  try {
    const distribuciones =
      await distribucionFiscalService.listarDistribucionesFiscales();

    return res.status(200).json(distribuciones);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al listar las distribuciones fiscales",
      error: error.message,
    });
  }
};

const obtenerDistribucionFiscalPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const distribucion =
      await distribucionFiscalService.obtenerDistribucionFiscalPorId(id);

    if (!distribucion) {
      return res.status(404).json({
        mensaje: "Distribución fiscal no encontrada",
      });
    }

    return res.status(200).json(distribucion);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener la distribución fiscal",
      error: error.message,
    });
  }
};

const crearDistribucionFiscal = async (req, res) => {
  try {
    const distribucion =
      await distribucionFiscalService.crearDistribucionFiscal(req.body);

    return res.status(201).json({
      mensaje: "Distribución fiscal creada correctamente",
      distribucion,
    });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      return res.status(400).json({
        mensaje: "Datos inválidos para crear la distribución fiscal",
        errores: error.errors?.map((e) => e.message) || [error.message],
      });
    }

    return res.status(500).json({
      mensaje: "Error al crear la distribución fiscal",
      error: error.message,
    });
  }
};

const actualizarDistribucionFiscal = async (req, res) => {
  try {
    const { id } = req.params;
    const distribucion =
      await distribucionFiscalService.actualizarDistribucionFiscal(
        id,
        req.body
      );

    if (!distribucion) {
      return res.status(404).json({
        mensaje: "Distribución fiscal no encontrada",
      });
    }

    return res.status(200).json({
      mensaje: "Distribución fiscal actualizada correctamente",
      distribucion,
    });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      return res.status(400).json({
        mensaje: "Datos inválidos para actualizar la distribución fiscal",
        errores: error.errors?.map((e) => e.message) || [error.message],
      });
    }

    return res.status(500).json({
      mensaje: "Error al actualizar la distribución fiscal",
      error: error.message,
    });
  }
};

const eliminarDistribucionFiscal = async (req, res) => {
  try {
    const { id } = req.params;
    const distribucion =
      await distribucionFiscalService.eliminarDistribucionFiscal(id);

    if (!distribucion) {
      return res.status(404).json({
        mensaje: "Distribución fiscal no encontrada",
      });
    }

    return res.status(200).json({
      mensaje: "Distribución fiscal eliminada correctamente",
      distribucion,
    });
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(409).json({
        mensaje: "No se puede eliminar la distribución fiscal porque está relacionada con otros registros",
      });
    }

    return res.status(500).json({
      mensaje: "Error al eliminar la distribución fiscal",
      error: error.message,
    });
  }
};

module.exports = {
  listarDistribucionesFiscales,
  obtenerDistribucionFiscalPorId,
  crearDistribucionFiscal,
  actualizarDistribucionFiscal,
  eliminarDistribucionFiscal,
};
