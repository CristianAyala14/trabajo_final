
const comprobanteService = require("../services/Comprobante");

const listar = async (req, res) => {
  try {
    const registros = await comprobanteService.listar();
    return res.status(200).json(registros);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

const obtenerPorId = async (req, res) => {
  try {
    const registro = await comprobanteService.obtenerPorId(req.params.id);

    if (!registro) {
      return res.status(404).json({
        mensaje: "Comprobante no encontrado",
      });
    }

    return res.status(200).json(registro);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

const crear = async (req, res) => {
  try {
    const registro = await comprobanteService.crear(req.body);
    return res.status(201).json(registro);
  } catch (error) {
    const status = error.name?.startsWith("Sequelize") ? 400 : 500;

    return res.status(status).json({
      mensaje: error.message,
    });
  }
};

const actualizar = async (req, res) => {
  try {
    const registro = await comprobanteService.actualizar(
      req.params.id,
      req.body
    );

    if (!registro) {
      return res.status(404).json({
        mensaje: "Comprobante no encontrado",
      });
    }

    return res.status(200).json(registro);
  } catch (error) {
    const status =
      error.statusCode ||
      (error.name?.startsWith("Sequelize") ? 400 : 500);

    return res.status(status).json({
      mensaje: error.message,
    });
  }
};

const anular = async (req, res) => {
  try {
    const registro = await comprobanteService.anular(req.params.id);

    if (!registro) {
      return res.status(404).json({
        mensaje: "Comprobante no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: "Comprobante anulado correctamente",
      comprobante: registro,
    });
  } catch (error) {
    const status =
      error.statusCode ||
      (error.name?.startsWith("Sequelize") ? 400 : 500);

    return res.status(status).json({
      mensaje: error.message,
    });
  }
};

const eliminar = async (req, res) => {
  try {
    const registro = await comprobanteService.eliminar(req.params.id);

    if (!registro) {
      return res.status(404).json({
        mensaje: "Comprobante no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: "Comprobante dado de baja correctamente",
      comprobante: registro,
    });
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  anular,
  eliminar,
};
