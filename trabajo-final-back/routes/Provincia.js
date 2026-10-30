
const express = require("express");
const router = express.Router();
const provinciaController = require("../controllers/Provincia");

router.get("/", provinciaController.listarProvincias);
router.get("/:id", provinciaController.obtenerProvinciaPorId);
router.post("/", provinciaController.crearProvincia);
router.put("/:id", provinciaController.actualizarProvincia);
router.delete("/:id", provinciaController.eliminarProvincia);

module.exports = router;
