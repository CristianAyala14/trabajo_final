
const distribucionComprobanteService = require("../services/DistribucionComprobante");

const listarDistribucionesComprobante = async (req, res) => {
  try {
    const distribuciones =
      await distribucionComprobanteService.listarDistribucionesComprobante();

    return res.status(200).json(distribuciones);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al listar las distribuciones de comprobante",
      error: error.message,
    });
  }
};

const obtenerDistribucionComprobantePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const distribucion =
      await distribucionComprobanteService.obtenerDistribucionComprobantePorId(id);

    if (!distribucion) {
      return res.status(404).json({
        mensaje: "Distribución de comprobante no encontrada",
      });
    }

    return res.status(200).json(distribucion);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener la distribución de comprobante",
      error: error.message,
    });
  }
};

const crearDistribucionComprobante = async (req, res) => {
  try {
    const distribucion =
      await distribucionComprobanteService.crearDistribucionComprobante(
        req.body
      );

    return res.status(201).json({
      mensaje: "Distribución de comprobante creada correctamente",
      distribucion,
    });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      return res.status(400).json({
        mensaje: "Datos inválidos para crear la distribución de comprobante",
        errores: error.errors?.map((e) => e.message) || [error.message],
      });
    }

    return res.status(500).json({
      mensaje: "Error al crear la distribución de comprobante",
      error: error.message,
    });
  }
};

const actualizarDistribucionComprobante = async (req, res) => {
  try {
    const { id } = req.params;
    const distribucion =
      await distribucionComprobanteService.actualizarDistribucionComprobante(
        id,
        req.body
      );

    if (!distribucion) {
      return res.status(404).json({
        mensaje: "Distribución de comprobante no encontrada",
      });
    }

    return res.status(200).json({
      mensaje: "Distribución de comprobante actualizada correctamente",
      distribucion,
    });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      return res.status(400).json({
        mensaje: "Datos inválidos para actualizar la distribución de comprobante",
        errores: error.errors?.map((e) => e.message) || [error.message],
      });
    }

    return res.status(500).json({
      mensaje: "Error al actualizar la distribución de comprobante",
      error: error.message,
    });
  }
};

const eliminarDistribucionComprobante = async (req, res) => {
  try {
    const { id } = req.params;
    const distribucion =
      await distribucionComprobanteService.eliminarDistribucionComprobante(id);

    if (!distribucion) {
      return res.status(404).json({
        mensaje: "Distribución de comprobante no encontrada",
      });
    }

    return res.status(200).json({
      mensaje: "Distribución de comprobante eliminada correctamente",
      distribucion,
    });
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(409).json({
        mensaje: "No se puede eliminar la distribución porque está relacionada con otros registros",
      });
    }

    return res.status(500).json({
      mensaje: "Error al eliminar la distribución de comprobante",
      error: error.message,
    });
  }
};

module.exports = {
  listarDistribucionesComprobante,
  obtenerDistribucionComprobantePorId,
  crearDistribucionComprobante,
  actualizarDistribucionComprobante,
  eliminarDistribucionComprobante,
};
