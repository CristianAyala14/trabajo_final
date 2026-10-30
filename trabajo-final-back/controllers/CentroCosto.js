
const centroCostoService = require("../services/CentroCosto");

const listarCentrosCosto = async (req, res) => {
  try {
    const centros = await centroCostoService.listarCentrosCosto();
    return res.status(200).json(centros);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al listar centros de costo",
      error: error.message,
    });
  }
};

const obtenerCentroCostoPorId = async (req, res) => {
  try {
    const centro = await centroCostoService.obtenerCentroCostoPorId(
      req.params.id
    );

    if (!centro) {
      return res.status(404).json({
        mensaje: "Centro de costo no encontrado",
      });
    }

    return res.status(200).json(centro);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener el centro de costo",
      error: error.message,
    });
  }
};

const crearCentroCosto = async (req, res) => {
  try {
    const centro = await centroCostoService.crearCentroCosto(req.body);

    return res.status(201).json(centro);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        mensaje: "Ya existe un centro de costo con ese código",
      });
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        mensaje: "Los datos del centro de costo no son válidos",
        error: error.message,
      });
    }

    return res.status(500).json({
      mensaje: "Error al crear el centro de costo",
      error: error.message,
    });
  }
};

const actualizarCentroCosto = async (req, res) => {
  try {
    const centro = await centroCostoService.actualizarCentroCosto(
      req.params.id,
      req.body
    );

    if (!centro) {
      return res.status(404).json({
        mensaje: "Centro de costo no encontrado o inactivo",
      });
    }

    return res.status(200).json(centro);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        mensaje: "Ya existe un centro de costo con ese código",
      });
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        mensaje: "Los datos del centro de costo no son válidos",
        error: error.message,
      });
    }

    return res.status(500).json({
      mensaje: "Error al actualizar el centro de costo",
      error: error.message,
    });
  }
};

const eliminarCentroCosto = async (req, res) => {
  try {
    const centro = await centroCostoService.eliminarCentroCosto(req.params.id);

    if (!centro) {
      return res.status(404).json({
        mensaje: "Centro de costo no encontrado o ya inactivo",
      });
    }

    return res.status(200).json({
      mensaje: "Centro de costo desactivado correctamente",
      centro,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al desactivar el centro de costo",
      error: error.message,
    });
  }
};

module.exports = {
  listarCentrosCosto,
  obtenerCentroCostoPorId,
  crearCentroCosto,
  actualizarCentroCosto,
  eliminarCentroCosto,
};
