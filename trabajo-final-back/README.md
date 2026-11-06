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

Este arranque no crea ni modifica tablas y no ejecuta sync. Una respuesta correcta de /health valida la conexión, no el esquema ni las operaciones de negocio. Las reglas transaccionales de comprobantes corresponden a cambios posteriores.

## Correspondencia con el modelo documentado

Los nueve modelos representan los 54 campos de [la documentación de la base](../docs/base-de-datos.md). La única distribución vigente es distribucion_comprobante. Los comprobantes utilizan estado; no tienen activo ni endpoint DELETE. Provincia y categoría fiscal no tienen activo: su eliminación depende de las FK RESTRICT de PostgreSQL.

Las longitudes, precisiones, índices y asociaciones se declaran en los modelos. Las validaciones locales cubren fechas, importes, tipos, estados y campos condicionales. No sustituyen los CHECK, UNIQUE y FK del esquema SQL ni la validación transaccional entre registros (confirmación, suma de distribuciones, notas y anulación).

importe_total se lee como DECIMAL(21,2), pero no se envía en las escrituras: PostgreSQL debe tener la columna generada importe_neto + importe_iva. Su allowNull en Sequelize permite omitirla al crear, no define la nulabilidad física. Los ID se mapean como autoincrementales; la identidad se define en SQL. No usar sync para reconstruir el esquema: no reproduce la columna generada ni los CHECK.

Este cambio no migra la base ni elimina sus tablas anteriores. Antes de usar datos reales hay que comprobar que el esquema instalado coincide con la documentación.
