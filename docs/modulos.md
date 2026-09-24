# Definición funcional de los módulos

[Volver al índice de documentación](README.md)

Los módulos agrupan funciones del sistema. No implican una tabla, una pantalla o un servicio independiente por cada uno. El actor es un único operador administrativo. Los criterios verificables están en los [requisitos funcionales](requisitos-funcionales.md); las restricciones compartidas están en las [reglas de negocio](reglas-de-negocio.md).

## Clientes y contratos

**Objetivo:** identificar a los titulares y los servicios que originan la facturación.

**Funciones:** alta, consulta, modificación y desactivación de clientes y contratos; asociación de un contrato a su cliente; definición de vigencia opcional y cuenta sugerida.

**Entradas:** datos identificatorios y de contacto, número de contrato, descripción, fechas y cuenta sugerida. **Resultados:** clientes y contratos disponibles para carga y consulta histórica.

**Entidades:** Cliente y Contrato, con referencias a Provincia y CuentaContable. **Requisitos:** RF01 y RF02. La provincia del cliente es su domicilio y no determina la distribución fiscal.

## Catálogos contables y fiscales

**Objetivo:** mantener los destinos y clasificaciones que utiliza la facturación.

**Funciones:** administrar cuentas, centros, provincias y categorías fiscales; configurar condición imponible y alícuota; activar o desactivar cuentas y centros.

**Entradas:** códigos, nombres, provincia de la categoría, condición imponible y tasa. **Resultados:** opciones consistentes para clasificar y calcular ingresos.

**Entidades:** CuentaContable, CentroCosto, Provincia y CategoriaFiscal. **Requisitos:** RF04 y RF05. La tasa pertenece a la categoría y puede haber varias categorías por provincia. Su modificación afecta los informes históricos recalculados.

## Períodos de servicio

**Objetivo:** identificar el intervalo operativo al que corresponde el servicio facturado.

**Funciones:** crear y consultar períodos con nombre, fecha inicial y final; seleccionar el período de cada comprobante.

**Entradas:** nombre y fechas inclusivas. **Resultados:** períodos disponibles para clasificar documentos y generar resúmenes operativos.

**Entidad:** PeriodoServicio. **Requisito:** RF03. La selección es explícita; no se deduce del mes de emisión. El MVP no incluye cierre de períodos ni períodos de análisis persistidos.

## Comprobantes y distribución

**Objetivo:** registrar facturas, NC y ND y asignar todo su neto a cruces de categoría fiscal y centro de costo.

**Funciones:** carga y edición de borradores, registro de notas con origen y motivo, gestión de filas de distribución, control de diferencias, confirmación y anulación.

**Entradas:** tipo, número, fecha, contrato, período, cuenta efectiva, neto, IVA, descripción y distribución; factura de origen para notas. **Resultados:** documentos con total calculado, estado y distribución verificable.

**Entidades:** Comprobante y DistribucionComprobante, con sus referencias a catálogos. **Requisitos:** RF06 a RF10. Los importes se almacenan como magnitudes positivas; las NC restan al consultar. La cabecera y su distribución se gestionan de forma transaccional.

## Consultas y reportes

**Objetivo:** localizar documentos y producir información administrativa, contable y fiscal.

**Funciones:** búsqueda y filtros; detalle de documentos; consulta simultánea por provincia y centro; resumen por contrato, cuenta o período; resúmenes 7 y 13; cálculo directo de Ingresos Brutos.

**Entradas:** tipo de reporte, intervalo de emisión, período de servicio cuando corresponda y filtros adicionales. **Resultados:** listados paginados, importes neteados, impuesto y avisos de incidencias.

**Datos utilizados:** comprobantes, distribuciones, períodos, catálogos y vistas de control e importes. **Requisitos:** RF11 a RF15. Los listados administrativos pueden mostrar borradores y anulados; los informes definitivos incluyen únicamente confirmados. Las ventanas temporales y fórmulas se explican en [Procesos y cálculos](procesos-y-calculos.md).

## Exportación

**Objetivo:** entregar resultados para su uso en los procesos administrativos.

**Funciones:** exportar el listado o resumen a Excel preservando filtros, criterios y valores monetarios.

**Entrada:** una consulta o reporte válido. **Resultado:** archivo Excel consistente con los datos consultados. **Requisito:** RF16. La exportación tributaria aplica los mismos controles que el informe; no crea una entidad persistida adicional.
