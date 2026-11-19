
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { conn } = require("./db");

const server = express();

server.name = "API";

// Middlewares
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(morgan("dev"));

// Origen del frontend local
server.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));

server.get("/health", async (req, res) => {
  try {
    await conn.authenticate();
    res.status(200).json({ estado: "ok", baseDeDatos: "conectada" });
  } catch {
    res.status(503).json({ estado: "no_disponible", baseDeDatos: "desconectada" });
  }
});

// Rutas
const clienteRoutes = require("./routes/Cliente");
const contratoRoutes = require("./routes/Contrato");
const centroCostoRoutes = require("./routes/CentroCosto");
const cuentaContableRoutes = require("./routes/CuentaContable");
const categoriaFiscalRoutes = require("./routes/CategoriaFiscal");
const provinciaRoutes = require("./routes/Provincia");
const periodoServicioRoutes = require("./routes/PeriodoServicio");
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
