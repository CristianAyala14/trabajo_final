
const express = require("express");
const router = express.Router();
const distribucionComprobanteController = require("../controllers/DistribucionComprobante");

router.get("/", distribucionComprobanteController.listarDistribucionesComprobante);
router.get("/:id", distribucionComprobanteController.obtenerDistribucionComprobantePorId);
router.post("/", distribucionComprobanteController.crearDistribucionComprobante);
router.put("/:id", distribucionComprobanteController.actualizarDistribucionComprobante);
router.delete("/:id", distribucionComprobanteController.eliminarDistribucionComprobante);

module.exports = router;
