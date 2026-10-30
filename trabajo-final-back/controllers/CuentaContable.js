
const cuentaContableService = require("../services/CuentaContable");

const listarCuentasContables = async (req, res) => {
  try {
    const cuentas = await cuentaContableService.listarCuentasContables();
    return res.status(200).json(cuentas);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al listar cuentas contables",
      error: error.message,
    });
  }
};

const obtenerCuentaContablePorId = async (req, res) => {
  try {
    const cuenta = await cuentaContableService.obtenerCuentaContablePorId(
      req.params.id
    );

    if (!cuenta) {
      return res.status(404).json({
        mensaje: "Cuenta contable no encontrada",
      });
    }

    return res.status(200).json(cuenta);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener la cuenta contable",
      error: error.message,
    });
  }
};

const crearCuentaContable = async (req, res) => {
  try {
    const cuenta = await cuentaContableService.crearCuentaContable(req.body);

    return res.status(201).json(cuenta);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        mensaje: "Ya existe una cuenta contable con ese código",
      });
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        mensaje: "Los datos de la cuenta contable no son válidos",
        error: error.message,
      });
    }

    return res.status(500).json({
      mensaje: "Error al crear la cuenta contable",
      error: error.message,
    });
  }
};

const actualizarCuentaContable = async (req, res) => {
  try {
    const cuenta = await cuentaContableService.actualizarCuentaContable(
      req.params.id,
      req.body
    );

    if (!cuenta) {
      return res.status(404).json({
        mensaje: "Cuenta contable no encontrada o inactiva",
      });
    }

    return res.status(200).json(cuenta);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        mensaje: "Ya existe una cuenta contable con ese código",
      });
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        mensaje: "Los datos de la cuenta contable no son válidos",
        error: error.message,
      });
    }

    return res.status(500).json({
      mensaje: "Error al actualizar la cuenta contable",
      error: error.message,
    });
  }
};

const eliminarCuentaContable = async (req, res) => {
  try {
    const cuenta = await cuentaContableService.eliminarCuentaContable(
      req.params.id
    );

    if (!cuenta) {
      return res.status(404).json({
        mensaje: "Cuenta contable no encontrada o ya inactiva",
      });
    }

    return res.status(200).json({
      mensaje: "Cuenta contable desactivada correctamente",
      cuenta,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al desactivar la cuenta contable",
      error: error.message,
    });
  }
};

module.exports = {
  listarCuentasContables,
  obtenerCuentaContablePorId,
  crearCuentaContable,
  actualizarCuentaContable,
  eliminarCuentaContable,
};
