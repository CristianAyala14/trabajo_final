# Historias de usuario y casos de uso

[Volver al índice de documentación](README.md)

## Historias de usuario

Las historias expresan el propósito del operador. Los requisitos RF y sus criterios de aceptación son la referencia detallada, evitando repetirlos aquí.

| Código | Historia de usuario | Requisitos relacionados |
|---|---|---|
| HU01 | Como operador administrativo, quiero administrar clientes y contratos para relacionar correctamente los documentos. | RF01 y RF02 |
| HU02 | Como operador administrativo, quiero definir períodos y catálogos para clasificar los ingresos de forma consistente. | RF03 a RF05 |
| HU03 | Como operador administrativo, quiero registrar facturas y notas vinculadas para conservar el documento original y sus ajustes. | RF06 y RF07 |
| HU04 | Como operador administrativo, quiero distribuir el neto por categoría fiscal y centro para consultar ambos criterios simultáneamente. | RF08 y RF12 |
| HU05 | Como operador administrativo, quiero controlar y confirmar documentos completos para que los informes incluyan información válida. | RF09 y RF10 |
| HU06 | Como operador administrativo, quiero buscar comprobantes y filtrar por fechas, provincia y centro para analizar la facturación. | RF11 y RF12 |
| HU07 | Como operador administrativo, quiero obtener el neto y el impuesto de facturas y notas para conocer su efecto conjunto. | RF13 y RF14 |
| HU08 | Como operador administrativo, quiero generar los resúmenes 7, 13 e Ingresos Brutos con sus propios criterios temporales. | RF15 |
| HU09 | Como operador administrativo, quiero exportar los resultados a Excel para continuar los procesos administrativos. | RF16 |

## Casos de uso

El actor principal de todos los casos es el **operador administrativo**. No se exigen roles, períodos abiertos ni auditoría, porque esos módulos están fuera del MVP.

## CU01 Registrar y confirmar un comprobante

**Referencias:** RF06, RF08 y RF09.

**Precondiciones:** existen el contrato habilitado, período de servicio, cuenta y destinos de distribución necesarios.

1. El operador selecciona Nueva factura.
2. Ingresa número completo y fecha real de emisión.
3. Selecciona contrato y período de servicio; revisa la cuenta sugerida y confirma la cuenta efectiva.
4. Ingresa neto, IVA y descripción opcional. El sistema calcula el total.
5. Agrega filas con categoría fiscal, centro de costo e importe neto.
6. El sistema muestra el importe distribuido y la diferencia.
7. El operador guarda el borrador o solicita confirmación.
8. Al confirmar, el backend valida el documento y la suma distribuida en una transacción.

**Alternativas:** si falta distribución, el documento puede permanecer en borrador. Si hay un número duplicado, datos obligatorios faltantes o una diferencia al confirmar, la operación se rechaza con un mensaje concreto. Una alícuota faltante se señala y bloquea el informe tributario, sin impedir la confirmación de una distribución válida.

**Resultado:** el documento conserva su cabecera y distribuciones; solo integra los informes definitivos cuando está confirmado. El MVP almacena importes por fila; la carga por porcentajes no es un requisito de esta versión.

## CU02 Registrar una nota de crédito o débito

**Referencia:** RF07.

**Precondiciones:** existe una factura confirmada válida como origen.

1. El operador abre la factura y selecciona Nueva NC o Nueva ND.
2. Ingresa número, fecha, período, motivo, neto e IVA de la nota.
3. Se conserva el contrato y la cuenta efectiva de la factura para este MVP.
4. El operador define la distribución propia de la nota.
5. El sistema valida el origen, los datos y la distribución; para NC controla también el crédito confirmado acumulado.
6. El operador guarda el borrador o confirma mediante el circuito CU01.

**Alternativas:** se rechazan orígenes inválidos, motivos vacíos y créditos que excedan los límites definidos. Los controles deben resistir solicitudes simultáneas.

**Resultado:** la factura original permanece y la nota se almacena como otro comprobante vinculado. Los informes aplican signo negativo a NC y positivo a ND.

## CU03 Generar los resúmenes 7 y 13

**Referencia:** RF15.

**Precondición:** existe el período de servicio que se quiere consultar.

1. El operador selecciona el período y el resumen requerido.
2. El sistema determina y muestra los límites de emisión del mes inicial para el resumen 7, o del mes siguiente para el 13.
3. Consulta los comprobantes confirmados asociados al período dentro de esos límites.
4. Aplica el signo de facturas, NC y ND y agrupa por los criterios seleccionados.
5. Muestra el resultado y los filtros utilizados.

**Alternativas:** sin coincidencias se informa ausencia de datos. Si el período o una emisión requiere una ventana no contemplada, se señala para definir el tratamiento; no se omite silenciosamente.

**Resultado:** un resumen de gestión, sin prorratear importes por días ni generar un asiento de partida doble. Los ejemplos temporales se detallan en [Procesos y cálculos](procesos-y-calculos.md).

## CU04 Consultar Ingresos Brutos por provincia y centro

**Referencias:** RF12, RF13 y RF14.

**Precondición:** se selecciona un intervalo válido de emisión; para el resumen mensual se utiliza un mes calendario completo.

1. El operador selecciona fechas y, opcionalmente, provincia y centro de costo.
2. El sistema controla los comprobantes confirmados del intervalo mediante la vista de distribución.
3. Si no hay incidencias, selecciona las filas que cumplen simultáneamente los filtros.
4. Calcula el neto firmado y el impuesto por fila con la alícuota de su categoría.
5. Agrupa y muestra neto e impuesto, junto con el criterio temporal utilizado.

**Alternativas:** una distribución incompleta o tasa imponible faltante bloquea el resultado tributario y se identifican los documentos afectados. La ausencia de coincidencias se distingue de ese bloqueo. No se calcula una tasa única para una agrupación que contiene categorías con tasas diferentes.

**Resultado:** el resumen de Ingresos Brutos, denominado Asiento 16, como cálculo directo de apoyo. No se asignan contrapartidas mediante conceptos contables ni se obtiene una liquidación integral a pagar.

## CU05 Anular un comprobante

**Referencia:** RF10.

1. El operador consulta el documento y solicita su anulación.
2. El sistema comprueba su estado y si existen notas confirmadas que impidan anular la factura de origen.
3. Si la operación es válida, cambia el estado a ANULADO y conserva los datos.
4. Los informes definitivos excluyen el documento.

**Alternativa:** si existen notas confirmadas vinculadas a una factura, primero debe resolverse ese vínculo. No se permite borrar físicamente un confirmado ni reactivar un anulado en el circuito básico.

**Resultado:** el documento sigue disponible para consulta con estado anulado.

## CU06 Exportar resultados

**Referencia:** RF16.

1. El operador obtiene un listado o resumen con sus filtros.
2. Selecciona Exportar a Excel.
3. El sistema vuelve a aplicar los criterios y controles del reporte, y genera el archivo con filtros, columnas y totales.
4. El operador descarga el archivo.

**Alternativa:** si los datos cambiaron y el informe tributario presenta incidencias, la exportación se bloquea con el detalle del problema. Un error de conexión se informa como tal.

**Resultado:** un archivo que corresponde a los criterios de la consulta y conserva los importes como valores numéricos.
