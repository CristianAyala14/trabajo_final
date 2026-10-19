
const express = require("express");
const router = express.Router();
const distribucionFiscalController = require("../controllers/DistribucionFiscal");

router.get("/", distribucionFiscalController.listarDistribucionesFiscales);
router.get("/:id", distribucionFiscalController.obtenerDistribucionFiscalPorId);
router.post("/", distribucionFiscalController.crearDistribucionFiscal);
router.put("/:id", distribucionFiscalController.actualizarDistribucionFiscal);
router.delete("/:id", distribucionFiscalController.eliminarDistribucionFiscal);

module.exports = router;
