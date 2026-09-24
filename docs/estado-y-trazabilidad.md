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

La validación técnica de aceptación debe cubrir RNF01, RNF02 y RNF03 especialmente en RF07 a RF10; RNF04 en las consultas RF11 a RF15; RNF05 a RNF09 en todas las pantallas y servicios; y RNF10 a RNF12 en instalación, mantenimiento e informes.
