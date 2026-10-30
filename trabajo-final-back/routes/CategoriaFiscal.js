
const express = require("express");
const router = express.Router();

const categoriaFiscalController = require("../controllers/CategoriaFiscal");

router.get("/", categoriaFiscalController.listarCategoriasFiscales);
router.get("/:id", categoriaFiscalController.obtenerCategoriaFiscalPorId);
router.post("/", categoriaFiscalController.crearCategoriaFiscal);
router.put("/:id", categoriaFiscalController.actualizarCategoriaFiscal);
router.delete("/:id", categoriaFiscalController.eliminarCategoriaFiscal);

module.exports = router;
