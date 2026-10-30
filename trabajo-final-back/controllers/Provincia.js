
const provinciaService = require("../services/Provincia");

const listarProvincias = async (req, res) => {
  try {
    const provincias = await provinciaService.listarProvincias();
    return res.status(200).json(provincias);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al listar las provincias",
      error: error.message,
    });
  }
};

const obtenerProvinciaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const provincia = await provinciaService.obtenerProvinciaPorId(id);

    if (!provincia || !provincia.activo) {
      return res.status(404).json({
        mensaje: "Provincia no encontrada",
      });
    }

    return res.status(200).json(provincia);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener la provincia",
      error: error.message,
    });
  }
};

const crearProvincia = async (req, res) => {
  try {
    const provincia = await provinciaService.crearProvincia(req.body);

    return res.status(201).json({
      mensaje: "Provincia creada correctamente",
      provincia,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        mensaje: "Ya existe una provincia con ese nombre",
      });
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        mensaje: "Datos inválidos para crear la provincia",
        errores: error.errors.map((e) => e.message),
      });
    }

    return res.status(500).json({
      mensaje: "Error al crear la provincia",
      error: error.message,
    });
  }
};

const actualizarProvincia = async (req, res) => {
  try {
    const { id } = req.params;
    const provincia = await provinciaService.actualizarProvincia(
      id,
      req.body
    );

    if (!provincia) {
      return res.status(404).json({
        mensaje: "Provincia no encontrada",
      });
    }

    return res.status(200).json({
      mensaje: "Provincia actualizada correctamente",
      provincia,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        mensaje: "Ya existe una provincia con ese nombre",
      });
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        mensaje: "Datos inválidos para actualizar la provincia",
        errores: error.errors.map((e) => e.message),
      });
    }

    return res.status(500).json({
      mensaje: "Error al actualizar la provincia",
      error: error.message,
    });
  }
};

const eliminarProvincia = async (req, res) => {
  try {
    const { id } = req.params;
    const provincia = await provinciaService.eliminarProvincia(id);

    if (!provincia) {
      return res.status(404).json({
        mensaje: "Provincia no encontrada",
      });
    }

    return res.status(200).json({
      mensaje: "Provincia desactivada correctamente",
      provincia,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al desactivar la provincia",
      error: error.message,
    });
  }
};

module.exports = {
  listarProvincias,
  obtenerProvinciaPorId,
  crearProvincia,
  actualizarProvincia,
  eliminarProvincia,
};
