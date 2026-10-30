
const express = require("express");
const router = express.Router();

const cuentaContableController = require("../controllers/CuentaContable");

router.get("/", cuentaContableController.listarCuentasContables);
router.get("/:id", cuentaContableController.obtenerCuentaContablePorId);
router.post("/", cuentaContableController.crearCuentaContable);
router.put("/:id", cuentaContableController.actualizarCuentaContable);
router.delete("/:id", cuentaContableController.eliminarCuentaContable);

module.exports = router;
