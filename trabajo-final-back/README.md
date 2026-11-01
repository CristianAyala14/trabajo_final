# Backend

Requiere Node.js 22 o superior y PostgreSQL con una base existente.

Desde esta carpeta:

```powershell
npm ci
Copy-Item .env.example .env
```

Editá DB_URL en .env con tus credenciales y el nombre real de la base. No subas .env al repositorio.

```powershell
npm run dev
```

La API local escucha en http://localhost:3001. El frontend se inicia por separado, en el origen configurado por FRONTEND_URL (por defecto http://localhost:5173).

- `npm start`: inicia sin recarga automática.
- `npm test`: verifica carga de rutas, disponibilidad y CORS con conexión simulada, sin escribir en PostgreSQL.
- `GET /health`: comprueba la conexión real; devuelve 200 si funciona o 503 si deja de estar disponible.

El inicio verifica la conexión antes de abrir el puerto. Si falla, revisá que PostgreSQL esté iniciado, que la base exista y que las credenciales sean correctas. PORT debe estar disponible.

Este arranque no crea ni modifica tablas y no ejecuta sync. Una respuesta correcta de /health valida la conexión, no el esquema ni las operaciones de negocio. La alineación del modelo y las reglas de comprobantes corresponden a cambios posteriores.
