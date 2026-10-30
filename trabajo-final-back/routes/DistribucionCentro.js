
const express = require("express");
const router = express.Router();
const distribucionCentroController = require("../controllers/DistribucionCentro");

router.get("/", distribucionCentroController.listarDistribucionesCentro);
router.get("/:id", distribucionCentroController.obtenerDistribucionCentroPorId);
router.post("/", distribucionCentroController.crearDistribucionCentro);
router.put("/:id", distribucionCentroController.actualizarDistribucionCentro);
router.delete("/:id", distribucionCentroController.eliminarDistribucionCentro);

module.exports = router;
