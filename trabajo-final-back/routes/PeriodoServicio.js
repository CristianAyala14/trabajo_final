
const express = require("express");
const router = express.Router();
const periodoServicioController = require("../controllers/PeriodoServicio");

router.get("/", periodoServicioController.listarPeriodosServicio);
router.get("/:id", periodoServicioController.obtenerPeriodoServicioPorId);
router.post("/", periodoServicioController.crearPeriodoServicio);
router.put("/:id", periodoServicioController.actualizarPeriodoServicio);
router.delete("/:id", periodoServicioController.eliminarPeriodoServicio);

module.exports = router;
