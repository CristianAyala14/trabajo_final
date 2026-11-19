# Frontend de gestión de facturación

La interfaz organiza la consulta de comprobantes y la gestión de clientes. El diseño se adapta a escritorio y celular.

## Vistas disponibles

- **Comprobantes:** listado de ejemplo con búsqueda, filtros y detalle de importes y distribución. Esta vista todavía utiliza datos ficticios.
- **Clientes:** listado de clientes activos, búsqueda por nombre o identificación fiscal, alta, edición y desactivación con confirmación. Esta vista utiliza los datos del backend.

La navegación se realiza desde el menú lateral. La vista de Clientes también está disponible en `http://localhost:5173/#clientes`.

## Inicio

Desde la carpeta del frontend:

```powershell
npm ci
npm run dev
```

La gestión de Clientes requiere que el backend y PostgreSQL estén disponibles. En desarrollo, las solicitudes se envían al backend en `http://127.0.0.1:3001` mediante la configuración de Vite.

Para otros entornos, la dirección pública de la API puede configurarse con `VITE_API_URL` antes de compilar. Esta variable no debe contener credenciales de base de datos. Sin ella, las solicitudes utilizan `/api`; el servidor que publique el frontend deberá dirigir esa ruta al backend.

## Verificación

`npm run build` genera la aplicación y comprueba TypeScript. `npm run lint` revisa el código.
