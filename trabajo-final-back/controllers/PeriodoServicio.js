
const periodoServicioService = require("../services/PeriodoServicio");

const listarPeriodosServicio = async (req, res) => {
  try {
    const periodos = await periodoServicioService.listarPeriodosServicio();
    return res.status(200).json(periodos);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al listar los períodos de servicio",
      error: error.message,
    });
  }
};

const obtenerPeriodoServicioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const periodo = await periodoServicioService.obtenerPeriodoServicioPorId(id);

    if (!periodo) {
      return res.status(404).json({
        mensaje: "Período de servicio no encontrado",
      });
    }

    return res.status(200).json(periodo);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener el período de servicio",
      error: error.message,
    });
  }
};

const crearPeriodoServicio = async (req, res) => {
  try {
    const periodo = await periodoServicioService.crearPeriodoServicio(req.body);

    return res.status(201).json({
      mensaje: "Período de servicio creado correctamente",
      periodo,
    });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      return res.status(400).json({
        mensaje: "Datos inválidos para crear el período de servicio",
        errores: error.errors?.map((e) => e.message) || [error.message],
      });
    }

    return res.status(500).json({
      mensaje: "Error al crear el período de servicio",
      error: error.message,
    });
  }
};

const actualizarPeriodoServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const periodo = await periodoServicioService.actualizarPeriodoServicio(
      id,
      req.body
    );

    if (!periodo) {
      return res.status(404).json({
        mensaje: "Período de servicio no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: "Período de servicio actualizado correctamente",
      periodo,
    });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      return res.status(400).json({
        mensaje: "Datos inválidos para actualizar el período de servicio",
        errores: error.errors?.map((e) => e.message) || [error.message],
      });
    }

    return res.status(500).json({
      mensaje: "Error al actualizar el período de servicio",
      error: error.message,
    });
  }
};

const eliminarPeriodoServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const periodo = await periodoServicioService.eliminarPeriodoServicio(id);

    if (!periodo) {
      return res.status(404).json({
        mensaje: "Período de servicio no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: "Período de servicio eliminado correctamente",
      periodo,
    });
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(409).json({
        mensaje: "No se puede eliminar el período porque está siendo utilizado por otros registros",
      });
    }

    return res.status(500).json({
      mensaje: "Error al eliminar el período de servicio",
      error: error.message,
    });
  }
};

module.exports = {
  listarPeriodosServicio,
  obtenerPeriodoServicioPorId,
  crearPeriodoServicio,
  actualizarPeriodoServicio,
  eliminarPeriodoServicio,
};
