const server = require("./app");
const { conn } = require("./db");

async function iniciar() {
  const port = Number(process.env.PORT || 3001);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT debe ser un entero entre 1 y 65535");
  }
  await conn.authenticate();
  const listener = await new Promise((resolve, reject) => {
    const httpServer = server.listen(port, "127.0.0.1", () => resolve(httpServer));
    httpServer.once("error", reject);
  });
  console.log(`API disponible en http://localhost:${port}`);
  let cerrando = false;
  const cerrar = () => {
    if (cerrando) return;
    cerrando = true;
    const timeout = setTimeout(() => process.exit(1), 10000);
    timeout.unref();
    listener.close(async () => {
      try { await conn.close(); } finally { clearTimeout(timeout); }
    });
  };
  process.once("SIGINT", cerrar);
  process.once("SIGTERM", cerrar);
  return listener;
}

if (require.main === module) {
  iniciar().catch(async () => {
    console.error("No se pudo iniciar la API. Revisá PostgreSQL, DB_URL y que PORT esté disponible.");
    await conn.close();
    process.exitCode = 1;
  });
}

module.exports = { iniciar };
