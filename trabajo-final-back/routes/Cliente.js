const { Router } = require("express");

const router = Router();

const clienteController = require("../controllers/Cliente");

router.get("/clientes", clienteController.getAll);
router.get("/clientes/:id", clienteController.getById);
router.post("/clientes", clienteController.create);
router.put("/clientes/:id", clienteController.update);
router.patch("/clientes/:id/desactivar", clienteController.deactivate);

module.exports = router;