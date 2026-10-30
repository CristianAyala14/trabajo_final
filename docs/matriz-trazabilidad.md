# Matriz bidireccional RF CU RN BD

[Volver al índice](README.md)

Fecha de revisión documental: 9 de octubre de 2026. Las tablas expresan dependencias de diseño, no funcionalidades ni pruebas ya aprobadas. RF es requisito funcional, CU caso de uso, RN regla de negocio y BD tabla persistida.

## RF hacia casos de uso, reglas y datos

| RF | CU | RN | BD principal |
|---|---|---|---|
| RF01 | CU07 | RN01, RN13 | cliente, provincia |
| RF02 | CU07 | RN01, RN13 | contrato, cliente, cuenta_contable |
| RF03 | CU09 | RN12 | periodo_servicio |
| RF04 | CU08 | RN13 | cuenta_contable, centro_costo |
| RF05 | CU08 | RN10, RN11, RN14 | provincia, categoria_fiscal |
| RF06 | CU01 | RN01, RN02, RN03, RN04, RN05, RN12 | comprobante, contrato, periodo_servicio, cuenta_contable |
| RF07 | CU02 | RN02, RN03, RN04, RN05, RN06, RN09 | comprobante, distribucion_comprobante |
| RF08 | CU01, CU02 | RN07, RN08 | distribucion_comprobante, comprobante, categoria_fiscal, centro_costo |
| RF09 | CU01, CU02 | RN04, RN05, RN08, RN09 | comprobante, distribucion_comprobante |
| RF10 | CU05 | RN06, RN09, RN13 | comprobante, distribucion_comprobante |
| RF11 | CU10 | RN02, RN12 | comprobante, cliente, contrato, periodo_servicio, cuenta_contable |
| RF12 | CU04, CU10 | RN06, RN07 | comprobante, distribucion_comprobante, categoria_fiscal, provincia, centro_costo |
| RF13 | CU04 | RN04, RN06, RN10, RN11, RN14 | comprobante, distribucion_comprobante, categoria_fiscal |
| RF14 | CU04, CU06 | RN08, RN11 | comprobante, distribucion_comprobante, categoria_fiscal |
| RF15 | CU03, CU04 | RN06, RN12 | comprobante, periodo_servicio, cuenta_contable, distribucion_comprobante |
| RF16 | CU06 | RN06, RN08, RN11 | comprobante, distribucion_comprobante, categoria_fiscal |

## Casos de uso hacia RF

| Elemento | RF relacionados |
|---|---|
| CU01 | RF06, RF08, RF09 |
| CU02 | RF07, RF08, RF09 |
| CU03 | RF15 |
| CU04 | RF12, RF13, RF14, RF15 |
| CU05 | RF10 |
| CU06 | RF14, RF16 |
| CU07 | RF01, RF02 |
| CU08 | RF04, RF05 |
| CU09 | RF03 |
| CU10 | RF11, RF12 |

## Reglas de negocio hacia RF

| Elemento | RF relacionados |
|---|---|
| RN01 | RF01, RF02, RF06 |
| RN02 | RF06, RF07, RF11 |
| RN03 | RF06, RF07 |
| RN04 | RF06, RF07, RF09, RF13 |
| RN05 | RF06, RF07, RF09 |
| RN06 | RF07, RF10, RF12, RF13, RF15, RF16 |
| RN07 | RF08, RF12 |
| RN08 | RF08, RF09, RF14, RF16 |
| RN09 | RF07, RF09, RF10 |
| RN10 | RF05, RF13 |
| RN11 | RF05, RF13, RF14, RF16 |
| RN12 | RF03, RF06, RF11, RF15 |
| RN13 | RF01, RF02, RF04, RF10 |
| RN14 | RF05, RF13 |

## Tablas hacia RF

| Elemento | RF relacionados |
|---|---|
| categoria_fiscal | RF05, RF08, RF12, RF13, RF14, RF16 |
| centro_costo | RF04, RF08, RF12 |
| cliente | RF01, RF02, RF11 |
| comprobante | RF06, RF07, RF08, RF09, RF10, RF11, RF12, RF13, RF14, RF15, RF16 |
| contrato | RF02, RF06, RF11 |
| cuenta_contable | RF02, RF04, RF06, RF11, RF15 |
| distribucion_comprobante | RF07, RF08, RF09, RF10, RF12, RF13, RF14, RF15, RF16 |
| periodo_servicio | RF03, RF06, RF11, RF15 |
| provincia | RF01, RF05, RF12 |

## Vistas y componentes sin tablas propias

`v_control_distribucion` apoya RF08, RF09 y RF14; `v_distribucion_importes`, RF12 y RF13. RF15 combina consultas según el reporte y RF16 consume un resultado validado. No se crean tablas de reporte, exportación ni período de análisis.

La normalización de números, transiciones de estado, control de origen y límites de crédito requieren backend transaccional; la matriz no implica que las FK garanticen esas reglas. Las condiciones de unicidad de clientes y contratos y el orden de fechas se mantienen en RF01, RF02 y sus restricciones físicas aunque no tengan una RN numerada exclusiva.

## Mantenimiento de consistencia

En cada PR que cambie comportamiento, revisar: RF y criterio de aceptación; CU principal y alternativas; RN afectadas; columnas y restricciones; diagramas; casos de prueba. Una modificación se revisa también desde su tabla o RN hacia los RF de las matrices inversas. Los identificadores existentes no se renumeran.

El [estado del desarrollo](estado-y-trazabilidad.md) se actualiza con evidencias de implementación y ejecución, no por la mera creación de documentos.
