require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_URL } = process.env;

const sequelize = new Sequelize(
    //`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/active`,
  `${DB_URL}`,
  {
    logging: false,
    native: false, 

  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

<<<<<<< HEAD
const {
  Cliente,
  Contrato,
  PeriodoServicio,
  CuentaContable,
  Provincia,
  CategoriaFiscal,
  CentroCosto,
  Comprobante,
  DistribucionFiscal,
  DistribucionCentro,
  DistribucionComprobante,
} = sequelize.models;

// Aca vendrian las relaciones

// Provincia -> Cliente
Provincia.hasMany(Cliente, {
  foreignKey: "provinciaId",
});

Cliente.belongsTo(Provincia, {
  foreignKey: "provinciaId",
});

// Provincia -> CategoriaFiscal
Provincia.hasMany(CategoriaFiscal, {
  foreignKey: "provinciaId",
});

CategoriaFiscal.belongsTo(Provincia, {
  foreignKey: "provinciaId",
});

// Cliente -> Contrato
Cliente.hasMany(Contrato, {
  foreignKey: "clienteId",
});

Contrato.belongsTo(Cliente, {
  foreignKey: "clienteId",
});

// CuentaContable -> Contrato
CuentaContable.hasMany(Contrato, {
  foreignKey: "cuentaContableId",
});

Contrato.belongsTo(CuentaContable, {
  foreignKey: "cuentaContableId",
});

// Contrato -> Comprobante
Contrato.hasMany(Comprobante, {
  foreignKey: "contratoId",
});

Comprobante.belongsTo(Contrato, {
  foreignKey: "contratoId",
});

// PeriodoServicio -> Comprobante
PeriodoServicio.hasMany(Comprobante, {
  foreignKey: "periodoServicioId",
});

Comprobante.belongsTo(PeriodoServicio, {
  foreignKey: "periodoServicioId",
});

// CuentaContable -> Comprobante
CuentaContable.hasMany(Comprobante, {
  foreignKey: "cuentaContableId",
});

Comprobante.belongsTo(CuentaContable, {
  foreignKey: "cuentaContableId",
});

// Comprobante -> DistribucionFiscal
Comprobante.hasMany(DistribucionFiscal, {
  foreignKey: "comprobanteId",
});

DistribucionFiscal.belongsTo(Comprobante, {
  foreignKey: "comprobanteId",
});

// CategoriaFiscal -> DistribucionFiscal
CategoriaFiscal.hasMany(DistribucionFiscal, {
  foreignKey: "categoriaFiscalId",
});

DistribucionFiscal.belongsTo(CategoriaFiscal, {
  foreignKey: "categoriaFiscalId",
});

// Comprobante -> DistribucionCentro
Comprobante.hasMany(DistribucionCentro, {
  foreignKey: "comprobanteId",
});

DistribucionCentro.belongsTo(Comprobante, {
  foreignKey: "comprobanteId",
});

// CentroCosto -> DistribucionCentro
CentroCosto.hasMany(DistribucionCentro, {
  foreignKey: "centroCostoId",
});

DistribucionCentro.belongsTo(CentroCosto, {
  foreignKey: "centroCostoId",
});

// Comprobante -> DistribucionComprobante
Comprobante.hasMany(DistribucionComprobante, {
  foreignKey: "comprobanteId",
});

DistribucionComprobante.belongsTo(Comprobante, {
  foreignKey: "comprobanteId",
});

// CategoriaFiscal -> DistribucionComprobante
CategoriaFiscal.hasMany(DistribucionComprobante, {
  foreignKey: "categoriaFiscalId",
});

DistribucionComprobante.belongsTo(CategoriaFiscal, {
  foreignKey: "categoriaFiscalId",
});

// CentroCosto -> DistribucionComprobante
CentroCosto.hasMany(DistribucionComprobante, {
  foreignKey: "centroCostoId",
});

DistribucionComprobante.belongsTo(CentroCosto, {
  foreignKey: "centroCostoId",
});

// Comprobante -> Comprobante
// factura_origen_id apunta a otro comprobante
Comprobante.hasMany(Comprobante, {
  foreignKey: "facturaOrigenId",
  as: "notasRelacionadas",
});

Comprobante.belongsTo(Comprobante, {
  foreignKey: "facturaOrigenId",
  as: "facturaOrigen",
});
=======
const {} = sequelize.models;

// Aca vendrian las relaciones

>>>>>>> 052609eea48a35f9d2b6f1ea8c2f990287327643


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};