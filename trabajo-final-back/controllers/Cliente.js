
const clienteService = require("../services/Cliente");

const listarClientes = async (req, res) => {
  try {
    const clientes = await clienteService.listarClientes();
    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al listar clientes",
      error: error.message,
    });
  }
};

const obtenerClientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await clienteService.obtenerClientePorId(id);

    if (!cliente) {
      return res.status(404).json({
        mensaje: "Cliente no encontrado",
      });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener el cliente",
      error: error.message,
    });
  }
};

const crearCliente = async (req, res) => {
  try {
    const nuevoCliente = await clienteService.crearCliente(req.body);

    return res.status(201).json(nuevoCliente);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        mensaje: "La identificación fiscal ya existe",
      });
    }

    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      return res.status(400).json({
        mensaje: "Los datos enviados no son válidos",
        error: error.message,
      });
    }

    return res.status(500).json({
      mensaje: "Error al crear el cliente",
      error: error.message,
    });
  }
};

const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await clienteService.actualizarCliente(id, req.body);

    if (!cliente) {
      return res.status(404).json({
        mensaje: "Cliente no encontrado o inactivo",
      });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        mensaje: "La identificación fiscal ya existe",
      });
    }

    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      return res.status(400).json({
        mensaje: "Los datos enviados no son válidos",
        error: error.message,
      });
    }

    return res.status(500).json({
      mensaje: "Error al actualizar el cliente",
      error: error.message,
    });
  }
};

const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await clienteService.eliminarCliente(id);

    if (!cliente) {
      return res.status(404).json({
        mensaje: "Cliente no encontrado o ya inactivo",
      });
    }

    return res.status(200).json({
      mensaje: "Cliente desactivado correctamente",
      cliente,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al desactivar el cliente",
      error: error.message,
    });
  }
};

module.exports = {
  listarClientes,
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
};
