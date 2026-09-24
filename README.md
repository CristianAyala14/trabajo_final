# Sistema Web de Gestión de Facturación y Generación de Información Contable

Aplicación web para centralizar comprobantes asociados a clientes y contratos, distribuir sus ingresos por categoría fiscal y centro de costo y generar información administrativa y contable.

**Objetivo:** registrar la información una sola vez y utilizarla para diferentes análisis y reportes.

## Alcance del MVP

El sistema contempla una empresa, moneda ARS y un único operador administrativo. Incluye clientes, contratos, períodos de servicio, catálogos, facturas, notas de crédito y débito, distribución del neto, consultas, cálculo por alícuota y exportación a Excel.

El período de servicio se distingue de la fecha de emisión. La distribución fiscal y por centro se registra en una misma fila para permitir consultas de ambos criterios simultáneamente.

La documentación describe el comportamiento esperado. El [estado del desarrollo](docs/estado-y-trazabilidad.md) distingue el diseño de las funciones pendientes. Usuarios, roles, auditoría y cierre de períodos quedan fuera del MVP.

## Tecnologías

- Frontend: React, TypeScript y Vite.
- Backend: Node.js, Express y Sequelize.
- Base de datos: PostgreSQL en Supabase.

## Documentación

La documentación completa se encuentra en **[docs](docs/README.md)**:

- [Diseño y documentación de la base de datos](docs/base-de-datos.md).
- [Definición funcional de los módulos](docs/modulos.md).
- [Requisitos funcionales](docs/requisitos-funcionales.md) y [no funcionales](docs/requisitos-no-funcionales.md).
- [Reglas de negocio](docs/reglas-de-negocio.md).
- [Diagrama entidad-relación](docs/diagramas/entidad-relacion.md) y [diagrama de clases](docs/diagramas/clases.md).
- [Historias de usuario y casos de uso](docs/casos-de-uso.md).
- [Procesos y cálculos](docs/procesos-y-calculos.md).
- [Arquitectura](docs/arquitectura.md), [alcance](docs/alcance.md) y [glosario](docs/glosario.md).
