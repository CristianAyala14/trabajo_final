# Backend del sistema de facturación

El backend conecta la aplicación web con PostgreSQL. El módulo de clientes permite registrar los datos de cada titular, mantenerlos actualizados y consultar su historial aun cuando deje de operar.

## Instalación e inicio

El proyecto requiere Node.js 22 o superior y una base PostgreSQL existente. La instalación inicial se realiza desde la carpeta del backend:

```powershell
npm ci
Copy-Item .env.example .env
```

El archivo local `.env` contiene la configuración de la aplicación. La variable `DB_URL` indica el nombre de la base y las credenciales de conexión. Este archivo queda fuera del repositorio.

```powershell
npm run dev
```

En desarrollo, la API se inicia en `http://localhost:3001` y se reinicia cuando cambia el código. El comando `npm start` la inicia sin recarga automática. El puerto se configura con `PORT`. El frontend se ejecuta por separado; su dirección se configura con `FRONTEND_URL` y por defecto es `http://localhost:5173`.

## Gestión de clientes

Para registrar un cliente solo se necesita el nombre. La razón social, la identificación fiscal, el teléfono, el domicilio, el correo y la provincia son opcionales. Si se informa una provincia, debe estar registrada. La identificación fiscal no puede repetirse, aunque el cliente que la tenga asignada esté inactivo.

| Operación | Ruta | Resultado |
|---|---|---|
| Alta | `POST /clientes` | Registra un cliente. Por ejemplo, basta con enviar `{"nombre": "Empresa Sur"}`. |
| Listado | `GET /clientes` | Muestra los clientes activos. |
| Consulta | `GET /clientes/:id` | Devuelve los datos del cliente, incluso si está inactivo. |
| Edición | `PUT /clientes/:id` | Actualiza solo los campos enviados. Un campo opcional se puede vaciar con `null`. |
| Baja | `DELETE /clientes/:id` | Desactiva al cliente y conserva sus datos y contratos. |

Solo los clientes activos pueden editarse o darse de baja. La API distingue entre datos inválidos (`400`), un cliente no disponible para la operación (`404`) y una identificación fiscal duplicada (`409`).

## Base de datos y pruebas

Al iniciar, la API comprueba la conexión con PostgreSQL. Las tablas deben existir previamente: el inicio no crea ni modifica el esquema. La ruta `GET /health` permite consultar si la conexión sigue disponible. Las tablas, sus relaciones y las reglas de los importes se describen en el [diseño de la base de datos](../docs/base-de-datos.md).

Las pruebas se ejecutan con `npm test`. La prueba de integración de clientes recorre las operaciones de alta, consulta, edición y baja con PostgreSQL. Para incluirla, la variable de entorno `CLIENTES_TEST_DB_URL` debe apuntar a una base de pruebas con permiso para crear esquemas. La prueba utiliza un esquema temporal y lo elimina al finalizar. Si la variable no está definida, se ejecutan las demás pruebas.
