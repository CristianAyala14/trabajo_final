
const contratoService = require("../services/contrato.service");

const listarContratos = async (req, res) => {
  try {
    const contratos = await contratoService.listarContratos();
    return res.status(200).json(contratos);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al listar contratos",
      error: error.message,
    });
  }
};

const obtenerContratoPorId = async (req, res) => {
  try {
    const contrato = await contratoService.obtenerContratoPorId(req.params.id);

    if (!contrato) {
      return res.status(404).json({
        mensaje: "Contrato no encontrado",
      });
    }

    return res.status(200).json(contrato);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener el contrato",
      error: error.message,
    });
  }
};

const crearContrato = async (req, res) => {
  try {
    const nuevoContrato = await contratoService.crearContrato(req.body);

    return res.status(201).json(nuevoContrato);
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ mensaje: error.message });
    }

    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        mensaje: "El cliente o la cuenta contable asociada no es válida",
      });
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        mensaje: "Los datos del contrato no son válidos",
        error: error.message,
      });
    }

    return res.status(500).json({
      mensaje: "Error al crear el contrato",
      error: error.message,
    });
  }
};

const actualizarContrato = async (req, res) => {
  try {
    const contrato = await contratoService.actualizarContrato(
      req.params.id,
      req.body
    );

    if (!contrato) {
      return res.status(404).json({
        mensaje: "Contrato no encontrado o inactivo",
      });
    }

    return res.status(200).json(contrato);
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ mensaje: error.message });
    }

    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      return res.status(400).json({
        mensaje: "Los datos del contrato no son válidos",
        error: error.message,
      });
    }

    return res.status(500).json({
      mensaje: "Error al actualizar el contrato",
      error: error.message,
    });
  }
};

const eliminarContrato = async (req, res) => {
  try {
    const contrato = await contratoService.eliminarContrato(req.params.id);

    if (!contrato) {
      return res.status(404).json({
        mensaje: "Contrato no encontrado o ya inactivo",
      });
    }

    return res.status(200).json({
      mensaje: "Contrato desactivado correctamente",
      contrato,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al desactivar el contrato",
      error: error.message,
    });
  }
};

module.exports = {
  listarContratos,
  obtenerContratoPorId,
  crearContrato,
  actualizarContrato,
  eliminarContrato,
};
