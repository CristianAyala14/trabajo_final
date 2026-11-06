require("dotenv").config({ path: require("path").join(__dirname, ".env"), quiet: true });

const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_URL } = process.env;

if (!DB_URL || !/^postgres(?:ql)?:\/\//.test(DB_URL)) {
  throw new Error("Configurá DB_URL con una URL de PostgreSQL en trabajo-final-back/.env");
}

const sequelize = new Sequelize(DB_URL, {
  logging: false,
  native: false,
  dialectOptions: { connectionTimeoutMillis: 5000 },
  pool: { acquire: 10000 },
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta models
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Inyectamos la conexión a Sequelize en todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos
let entries = Object.entries(sequelize.models);

let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

// Destructuring de los modelos
const {
  Cliente,
  Contrato,
  PeriodoServicio,
  CuentaContable,
  Provincia,
  CategoriaFiscal,
  CentroCosto,
  Comprobante,
  DistribucionComprobante,
} = sequelize.models;


// =====================================================
// RELACIONES
// =====================================================


// Provincia -> Cliente

Provincia.hasMany(Cliente, {
  foreignKey: "provinciaId",
  onDelete: "RESTRICT",
});

Cliente.belongsTo(Provincia, {
  foreignKey: "provinciaId",
  onDelete: "RESTRICT",
});


// Provincia -> CategoriaFiscal

Provincia.hasMany(CategoriaFiscal, {
  foreignKey: "provinciaId",
  onDelete: "RESTRICT",
});

CategoriaFiscal.belongsTo(Provincia, {
  foreignKey: "provinciaId",
  onDelete: "RESTRICT",
});


// Cliente -> Contrato

Cliente.hasMany(Contrato, {
  foreignKey: "clienteId",
  onDelete: "RESTRICT",
});

Contrato.belongsTo(Cliente, {
  foreignKey: "clienteId",
  onDelete: "RESTRICT",
});


// CuentaContable -> Contrato

CuentaContable.hasMany(Contrato, {
  foreignKey: "cuentaContableId",
  onDelete: "RESTRICT",
});

Contrato.belongsTo(CuentaContable, {
  foreignKey: "cuentaContableId",
  onDelete: "RESTRICT",
});


// Contrato -> Comprobante

Contrato.hasMany(Comprobante, {
  foreignKey: "contratoId",
  onDelete: "RESTRICT",
});

Comprobante.belongsTo(Contrato, {
  foreignKey: "contratoId",
  onDelete: "RESTRICT",
});


// PeriodoServicio -> Comprobante

PeriodoServicio.hasMany(Comprobante, {
  foreignKey: "periodoServicioId",
  onDelete: "RESTRICT",
});

Comprobante.belongsTo(PeriodoServicio, {
  foreignKey: "periodoServicioId",
  onDelete: "RESTRICT",
});


// CuentaContable -> Comprobante

CuentaContable.hasMany(Comprobante, {
  foreignKey: "cuentaContableId",
  onDelete: "RESTRICT",
});

Comprobante.belongsTo(CuentaContable, {
  foreignKey: "cuentaContableId",
  onDelete: "RESTRICT",
});


// Comprobante -> DistribucionComprobante

Comprobante.hasMany(DistribucionComprobante, {
  foreignKey: "comprobanteId",
  onDelete: "RESTRICT",
});

DistribucionComprobante.belongsTo(Comprobante, {
  foreignKey: "comprobanteId",
  onDelete: "RESTRICT",
});


// CategoriaFiscal -> DistribucionComprobante

CategoriaFiscal.hasMany(DistribucionComprobante, {
  foreignKey: "categoriaFiscalId",
  onDelete: "RESTRICT",
});

DistribucionComprobante.belongsTo(CategoriaFiscal, {
  foreignKey: "categoriaFiscalId",
  onDelete: "RESTRICT",
});


// CentroCosto -> DistribucionComprobante

CentroCosto.hasMany(DistribucionComprobante, {
  foreignKey: "centroCostoId",
  onDelete: "RESTRICT",
});

DistribucionComprobante.belongsTo(CentroCosto, {
  foreignKey: "centroCostoId",
  onDelete: "RESTRICT",
});


// =====================================================
// COMPROBANTE -> COMPROBANTE
// Relación recursiva
// =====================================================

// Un comprobante puede tener muchas notas relacionadas

Comprobante.hasMany(Comprobante, {
  foreignKey: "facturaOrigenId",
  onDelete: "RESTRICT",
  as: "notasRelacionadas",
});

// Un comprobante puede pertenecer a una factura origen

Comprobante.belongsTo(Comprobante, {
  foreignKey: "facturaOrigenId",
  onDelete: "RESTRICT",
  as: "facturaOrigen",
});


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};