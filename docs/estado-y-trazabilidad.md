# Estado y trazabilidad

[Volver al índice de documentación](README.md)

| Requisitos | Tablas o componentes principales |
|---|---|
| RF01 y RF02 | cliente, contrato, provincia, cuenta_contable |
| RF03 | periodo_servicio, comprobante |
| RF04 y RF05 | cuenta_contable, centro_costo, provincia, categoria_fiscal |
| RF06 y RF07 | comprobante y su autorrelación; servicio de validación |
| RF08 y RF09 | distribucion_comprobante, comprobante, transacciones |
| RF10 | comprobante, control de estados y notas vinculadas |
| RF11 | comprobante, catálogos, búsqueda y paginación |
| RF12 a RF14 | distribucion_comprobante y las dos vistas de consulta |
| RF15 | comprobante, periodo_servicio, cuenta_contable y agregaciones |
| RF16 | Servicio de informes y generación de Excel |

El diseño de la base de datos incluye nueve tablas, claves, controles locales, índices y dos vistas. Aún deben implementarse y probarse las reglas transaccionales entre registros, el circuito completo de estados y los informes de la aplicación. La interfaz inicial de comprobantes trabajó con datos de demostración y permitió búsqueda, filtros y detalle; no acredita conexión real, altas persistentes, exportación ni cumplimiento de todos estos requisitos.

## Avance de implementación

Estado actualizado al **19 de noviembre de 2026**. Se distingue el código disponible de las comprobaciones realizadas y de las tareas pendientes.

| Componente | Avance y verificación | Pendiente |
|---|---|---|
| Base del backend | Inicio de la API, comprobación de conexión y modelos alineados con las nueve tablas documentadas. | Verificar que el esquema de la base de trabajo coincida con el diseño. |
| Clientes: backend (RF01) | Alta, listado, consulta, edición y desactivación implementados. El circuito HTTP se probó con una instancia temporal de PostgreSQL 18, incluyendo validaciones y conservación de contratos. | Comprobar su funcionamiento junto con la pantalla y la base de trabajo. |
| Clientes: frontend (RF01) | Pantalla conectada a la API, con búsqueda, formulario y confirmación de baja. Se verificaron los flujos en navegador con respuestas simuladas y la adaptación a escritorio y celular. | Verificar el circuito completo contra el backend y la base de trabajo. |
| Contratos y catálogos | Existen operaciones básicas en el backend. | Completar validaciones, pruebas y pantallas. |
| Comprobantes | Interfaz de consulta con datos de demostración y operaciones básicas en el backend. | Conectar la pantalla a datos persistidos y completar carga, distribución, confirmación, notas y anulación. |
| Informes y exportación | Requisitos, cálculos y secuencias documentados. | Implementar y probar consultas, cálculos y archivos exportados. |

Las pruebas con una base temporal y las pruebas visuales con respuestas simuladas no acreditan por sí solas la integración completa del sistema. Los escenarios contables y de concurrencia siguen pendientes de implementación y verificación.

La validación técnica de aceptación debe cubrir RNF01, RNF02 y RNF03 especialmente en RF07 a RF10; RNF04 en las consultas RF11 a RF15; RNF05 a RNF09 en todas las pantallas y servicios; y RNF10 a RNF12 en instalación, mantenimiento e informes.

## Actualización documental de la segunda entrega

Se completaron diagramas, matriz bidireccional y secuencias de confirmación, informe con exportación y anulación. Esta revisión es documental; no acredita ejecución de pruebas ni despliegue. La descripción de la interfaz inicial corresponde a la entrega previamente revisada.

- [Validación de diagramas](diagramas/validacion.md).
- [Matriz bidireccional RF CU RN BD](matriz-trazabilidad.md).
- [Secuencias críticas](diagramas/secuencias.md).
