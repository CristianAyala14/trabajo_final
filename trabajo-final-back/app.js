
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const coockeParser = require("cookie-parser");

require("dotenv").config();
require("./db.js");

const server = express();

server.name = "API";

// Middlewares
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(morgan("dev"));

// Configuración CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

// Rutas
const clienteRoutes = require("./routes/Cliente");
const contratoRoutes = require("./routes/Contrato");
const centroCostoRoutes = require("./routes/CentroCosto");
const cuentaContableRoutes = require("./routes/CuentaContable");
const categoriaFiscalRoutes = require("./routes/CategoriaFiscal");
const provinciaRoutes = require("./routes/Provincia");
const periodoServicioRoutes = require("./routes/PeriodoServicio");
const distribucionCentroRoutes = require("./routes/DistribucionCentro");
const distribucionFiscalRoutes = require("./routes/DistribucionFiscal");
const distribucionComprobanteRoutes = require("./routes/DistribucionComprobante");
const comprobanteRoutes = require("./routes/Comprobante");

// Registro de rutas
server.use("/clientes", clienteRoutes);
server.use("/contratos", contratoRoutes);
server.use("/centros-costo", centroCostoRoutes);
server.use("/cuentas-contables", cuentaContableRoutes);
server.use("/categorias-fiscales", categoriaFiscalRoutes);
server.use("/provincias", provinciaRoutes);
server.use("/periodos-servicio", periodoServicioRoutes);
server.use("/distribuciones-centro", distribucionCentroRoutes);
server.use("/distribuciones-fiscales", distribucionFiscalRoutes);
server.use("/distribuciones-comprobante", distribucionComprobanteRoutes);
server.use("/comprobantes", comprobanteRoutes);

// Manejo global de errores
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;

  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
