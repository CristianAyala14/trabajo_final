
const express = require("express");
const router = express.Router();

const comprobanteController = require("../controllers/comprobante.controller");

router.get("/", comprobanteController.listar);
router.get("/:id", comprobanteController.obtenerPorId);
router.post("/", comprobanteController.crear);
router.put("/:id", comprobanteController.actualizar);
router.patch("/:id/anular", comprobanteController.anular);
router.delete("/:id", comprobanteController.eliminar);

module.exports = router;
