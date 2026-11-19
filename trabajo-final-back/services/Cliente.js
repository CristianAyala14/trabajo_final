const { Cliente } = require("../db");

class EntradaInvalida extends Error {}

function idPositivo(valor, campo = "id") {
  const texto = String(valor);
  if ((typeof valor !== "string" && !Number.isSafeInteger(valor)) ||
      !/^[1-9]\d{0,18}$/.test(texto) || BigInt(texto) > 9223372036854775807n) {
    throw new EntradaInvalida(`${campo} debe ser un identificador entero positivo válido`);
  }
  return texto;
}

const longitudes = { nombre: 200, razonSocial: 200, identificacionFiscal: 30,
  telefono: 40, domicilio: null, email: 254 };

function prepararDatos(datos, alta) {
  if (!datos || typeof datos !== "object" || Array.isArray(datos) || !Object.keys(datos).length) {
    throw new EntradaInvalida("Enviá un objeto con los datos del cliente");
  }
  if (alta && !Object.hasOwn(datos, "nombre")) throw new EntradaInvalida("El nombre es obligatorio");
  const valores = {};
  for (const [campo, valor] of Object.entries(datos)) {
    if (campo === "provinciaId") {
      valores.provinciaId = valor === null ? null : idPositivo(valor, campo);
      continue;
    }
    if (!Object.hasOwn(longitudes, campo)) throw new EntradaInvalida(`Campo no editable: ${campo}`);
    if (valor !== null && typeof valor !== "string") throw new EntradaInvalida(`${campo} debe ser texto`);
    const texto = valor?.trim() || null;
    if (campo === "nombre" && !texto) throw new EntradaInvalida("El nombre es obligatorio");
    if (texto && longitudes[campo] && Array.from(texto).length > longitudes[campo]) {
      throw new EntradaInvalida(`${campo} admite hasta ${longitudes[campo]} caracteres`);
    }
    valores[campo] = texto;
  }
  return valores;
}

const listarClientes = () => Cliente.findAll({ where: { activo: true }, order: [["id", "ASC"]] });
const obtenerClientePorId = id => Cliente.findByPk(idPositivo(id));
const crearCliente = datos => Cliente.create(prepararDatos(datos, true));

async function modificarActivo(id, valores) {
  const [, filas] = await Cliente.update(valores, {
    where: { id: idPositivo(id), activo: true }, returning: true,
  });
  return filas[0] || null;
}

const actualizarCliente = (id, datos) => modificarActivo(id, prepararDatos(datos, false));
const eliminarCliente = id => modificarActivo(id, { activo: false });

module.exports = { EntradaInvalida, listarClientes, obtenerClientePorId, crearCliente, actualizarCliente, eliminarCliente };
