const clienteService = require("../services/Cliente");

const getAll = async (req, res) => {
    try {
        const clientes = await clienteService.getAll();

        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;

        const cliente = await clienteService.getById(id);

        if (!cliente) {
            return res.status(404).json({
                error: "Cliente no encontrado"
            });
        }

        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const create = async (req, res) => {
    try {
        const datos = req.body;

        const cliente = await clienteService.create(datos);

        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const cliente = await clienteService.update(id, datos);

        res.status(200).json(cliente);
    } catch (error) {
        res.status(404).json({
            error: error.message
        });
    }
};

const deactivate = async (req, res) => {
    try {
        const { id } = req.params;

        const cliente = await clienteService.deactivate(id);

        res.status(200).json(cliente);
    } catch (error) {
        res.status(404).json({
            error: error.message
        });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deactivate
};