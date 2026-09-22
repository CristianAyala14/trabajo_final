const { Cliente } = require("../db");

const getAll = async () => {
    return await Cliente.findAll();
};

const getById = async (id) => {
    return await Cliente.findByPk(id);
};

const create = async (datos) => {
    return await Cliente.create(datos);
};

const update = async (id, datos) => {
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        throw new Error("Cliente no encontrado");
    }

    return await cliente.update(datos);
};

const deactivate = async (id) => {
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        throw new Error("Cliente no encontrado");
    }

    return await cliente.update({ activo: false });
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deactivate
};