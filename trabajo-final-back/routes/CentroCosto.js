
const express = require("express");
const router = express.Router();

const centroCostoController = require("../controllers/CentroCosto");

router.get("/", centroCostoController.listarCentrosCosto);
router.get("/:id", centroCostoController.obtenerCentroCostoPorId);
router.post("/", centroCostoController.crearCentroCosto);
router.put("/:id", centroCostoController.actualizarCentroCosto);
router.delete("/:id", centroCostoController.eliminarCentroCosto);

module.exports = router;
