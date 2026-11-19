const clientes = require("../services/Cliente");

function responderError(res, error) {
  if (error instanceof clientes.EntradaInvalida) return res.status(400).json({ mensaje: error.message });
  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ mensaje: "La identificación fiscal ya existe" });
  }
  if (error.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({ mensaje: "La provincia indicada no existe" });
  }
  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({ mensaje: "Datos de cliente inválidos", campos: error.errors.map(item => item.path) });
  }
  return res.status(500).json({ mensaje: "No se pudo completar la operación de clientes" });
}

function accion(operacion, estado = 200) {
  return async (req, res) => {
    try {
      const resultado = await operacion(req);
      if (resultado == null) return res.status(404).json({ mensaje: "Cliente no disponible para esta operación" });
      return res.status(estado).json(resultado);
    } catch (error) {
      return responderError(res, error);
    }
  };
}

module.exports = {
  listarClientes: accion(() => clientes.listarClientes()),
  obtenerClientePorId: accion(req => clientes.obtenerClientePorId(req.params.id)),
  crearCliente: accion(req => clientes.crearCliente(req.body), 201),
  actualizarCliente: accion(req => clientes.actualizarCliente(req.params.id, req.body)),
  eliminarCliente: accion(async req => {
    const cliente = await clientes.eliminarCliente(req.params.id);
    return cliente && { mensaje: "Cliente desactivado correctamente", cliente };
  }),
};
