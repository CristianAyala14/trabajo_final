
const distribucionCentroService = require("../services/DistribucionCentro");

const listarDistribucionesCentro = async (req, res) => {
  try {
    const distribuciones =
      await distribucionCentroService.listarDistribucionesCentro();

    return res.status(200).json(distribuciones);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al listar las distribuciones de centro de costo",
      error: error.message,
    });
  }
};

const obtenerDistribucionCentroPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const distribucion =
      await distribucionCentroService.obtenerDistribucionCentroPorId(id);

    if (!distribucion) {
      return res.status(404).json({
        mensaje: "Distribución de centro de costo no encontrada",
      });
    }

    return res.status(200).json(distribucion);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener la distribución de centro de costo",
      error: error.message,
    });
  }
};

const crearDistribucionCentro = async (req, res) => {
  try {
    const distribucion =
      await distribucionCentroService.crearDistribucionCentro(req.body);

    return res.status(201).json({
      mensaje: "Distribución de centro de costo creada correctamente",
      distribucion,
    });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      return res.status(400).json({
        mensaje: "Datos inválidos para crear la distribución",
        errores: error.errors?.map((e) => e.message) || [error.message],
      });
    }

    return res.status(500).json({
      mensaje: "Error al crear la distribución de centro de costo",
      error: error.message,
    });
  }
};

const actualizarDistribucionCentro = async (req, res) => {
  try {
    const { id } = req.params;
    const distribucion =
      await distribucionCentroService.actualizarDistribucionCentro(
        id,
        req.body
      );

    if (!distribucion) {
      return res.status(404).json({
        mensaje: "Distribución de centro de costo no encontrada",
      });
    }

    return res.status(200).json({
      mensaje: "Distribución de centro de costo actualizada correctamente",
      distribucion,
    });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      return res.status(400).json({
        mensaje: "Datos inválidos para actualizar la distribución",
        errores: error.errors?.map((e) => e.message) || [error.message],
      });
    }

    return res.status(500).json({
      mensaje: "Error al actualizar la distribución de centro de costo",
      error: error.message,
    });
  }
};

const eliminarDistribucionCentro = async (req, res) => {
  try {
    const { id } = req.params;
    const distribucion =
      await distribucionCentroService.eliminarDistribucionCentro(id);

    if (!distribucion) {
      return res.status(404).json({
        mensaje: "Distribución de centro de costo no encontrada",
      });
    }

    return res.status(200).json({
      mensaje: "Distribución de centro de costo eliminada correctamente",
      distribucion,
    });
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(409).json({
        mensaje: "No se puede eliminar la distribución porque está relacionada con otros registros",
      });
    }

    return res.status(500).json({
      mensaje: "Error al eliminar la distribución de centro de costo",
      error: error.message,
    });
  }
};

module.exports = {
  listarDistribucionesCentro,
  obtenerDistribucionCentroPorId,
  crearDistribucionCentro,
  actualizarDistribucionCentro,
  eliminarDistribucionCentro,
};
