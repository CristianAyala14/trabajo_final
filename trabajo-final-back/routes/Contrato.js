
const express = require("express");
const router = express.Router();

const contratoController = require("../controllers/Contrato");

router.get("/", contratoController.listarContratos);
router.get("/:id", contratoController.obtenerContratoPorId);
router.post("/", contratoController.crearContrato);
router.put("/:id", contratoController.actualizarContrato);
router.delete("/:id", contratoController.eliminarContrato);

module.exports = router;
