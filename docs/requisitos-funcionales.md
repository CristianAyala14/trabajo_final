# Requisitos funcionales

[Volver al índice de documentación](README.md)

Todos los requisitos siguientes pertenecen al alcance objetivo. Prioridad esencial indica que el requisito es necesario para operar con datos confiables. Prioridad complementaria indica que puede implementarse después del circuito principal sin modificar el modelo.

## RF01 Administrar clientes

Prioridad esencial. El sistema deberá permitir crear, consultar, modificar y desactivar clientes, registrando nombre, identificación fiscal y los datos de contacto disponibles. La provincia del domicilio no determinará la distribución fiscal de sus comprobantes.

Criterio de aceptación: un cliente puede guardarse con nombre y sin datos opcionales; se rechazan nombres vacíos e identificaciones fiscales repetidas cuando estén informadas. Un cliente desactivado conserva sus operaciones históricas y no se ofrece para nuevos contratos.

## RF02 Administrar contratos

Prioridad esencial. El sistema deberá registrar contratos pertenecientes a un cliente, con número, descripción, vigencia opcional y cuenta contable sugerida. Deberá permitir su consulta, modificación y desactivación.

Criterio de aceptación: se rechaza el mismo número para un mismo cliente, pero se admite para clientes distintos. Si se informa fecha de fin, deberá existir fecha de inicio y no ser posterior al fin. Desactivar un contrato impide seleccionarlo en nuevas cargas, sin ocultar sus comprobantes.

## RF03 Administrar períodos de servicio

Prioridad esencial. El sistema deberá crear y consultar períodos identificados por nombre, inicio y fin inclusivos. Cada comprobante se asignará expresamente a un período; la asignación no se deducirá de su fecha de emisión.

Criterio de aceptación: se rechaza un fin anterior al inicio. Un documento emitido en junio puede corresponder a un servicio de mayo. Si dos períodos comparten una fecha, el operador debe seleccionar el período correspondiente.

## RF04 Administrar cuentas contables y centros de costo

Prioridad esencial. El sistema deberá permitir crear, consultar, modificar y desactivar cuentas y centros, conservando sus códigos como texto. La cuenta del contrato será una sugerencia y la del comprobante será la cuenta efectiva.

Criterio de aceptación: no se admiten códigos duplicados dentro de cada catálogo; se conservan ceros iniciales y puntos. Cambiar la cuenta sugerida de un contrato no cambia documentos existentes. Un centro podrá recibir importes de distintas provincias.

## RF05 Administrar provincias y categorías fiscales

Prioridad esencial. El sistema deberá mantener provincias y categorías, indicando nombre, condición imponible y alícuota. Una categoría imponible deberá pertenecer a una provincia; una categoría no imponible podrá tener provincia o ser global.

Criterio de aceptación: una tasa de 5 % se almacena como 0,05 y se muestra como porcentaje. Se rechazan valores fuera de 0 a 1. Una tasa faltante puede guardarse como configuración pendiente, pero deberá impedir el informe tributario del alcance afectado. Un cambio de tasa debe advertir que modifica los informes históricos recalculados.

## RF06 Registrar facturas

Prioridad esencial. El sistema deberá registrar número completo, fecha real de emisión, contrato, período de servicio, cuenta efectiva, descripción opcional, neto e IVA. El cliente se obtendrá del contrato y el total se calculará como neto más IVA.

Criterio de aceptación: el documento se guarda inicialmente como BORRADOR; no admite importes negativos ni repetición de tipo y número. No puede vincular una factura de origen. Un IVA desconocido no se convierte automáticamente en cero. Incluso un borrador debe cumplir los campos obligatorios de la base.

## RF07 Registrar notas de crédito y débito

Prioridad esencial. El sistema deberá registrar NC y ND vinculadas a una única factura confirmada, con motivo obligatorio y el mismo contrato y cuenta efectiva que la factura de origen para este MVP. Cada nota tendrá su propia fecha de emisión, período y distribución.

Criterio de aceptación: no se admite como origen otra nota, una factura anulada o el propio documento. El neto y el IVA se guardan como magnitudes positivas; la NC resta y la ND suma al consultar. Las NC confirmadas acumuladas no deberán superar el neto ni el IVA de la factura de origen, controlados por separado. Una ND no amplía automáticamente ese límite en el MVP.

## RF08 Distribuir el importe neto

Prioridad esencial. El sistema deberá permitir asignar cada porción del neto a una combinación de categoría fiscal y centro de costo. Deberá mostrar neto del documento, neto distribuido y diferencia pendiente.

Criterio de aceptación: se rechazan filas con importe cero o negativo y destinos repetidos dentro del mismo comprobante. Para confirmar, la suma de las filas debe ser exactamente igual al neto. No se distribuye el IVA ni se deduce un cruce provincial a partir de totales independientes.

## RF09 Confirmar comprobantes

Prioridad esencial. El sistema deberá confirmar un borrador únicamente cuando sus datos y distribución sean válidos. La validación y el cambio de estado deberán ejecutarse en una misma transacción.

Criterio de aceptación: se rechaza una confirmación sin distribución, con diferencia, neto cero u origen inválido. Para notas se verifica también el límite de crédito. Una tasa faltante no impide registrar o confirmar un documento correctamente distribuido, pero permanece señalada y bloquea su cálculo tributario.

## RF10 Corregir y anular comprobantes

Prioridad esencial. El sistema deberá permitir editar borradores y anular documentos conservando su información. Como regla operativa propuesta, un confirmado no se editará directamente: las correcciones se resolverán mediante anulación o una nota, según corresponda.

Criterio de aceptación: los anulados se conservan para consulta y quedan fuera de los totales. No se permite anular una factura que tenga notas confirmadas vigentes; primero debe resolverse ese vínculo. No se habilita reactivar documentos anulados en el circuito básico. Estas transiciones requieren implementación en el backend.

## RF11 Consultar y filtrar comprobantes

Prioridad esencial. El sistema deberá listar comprobantes y permitir búsqueda por número, cliente o contrato y filtros por tipo, estado, fechas de emisión, período y cuenta. Deberá mostrar su detalle, importes y distribución.

Criterio de aceptación: los filtros se combinan, las fechas límite se incluyen y existe un estado visible cuando no hay resultados. El rango corresponde a fechas de emisión; un rango numérico de facturas no forma parte del modelo actual porque numero es texto.

## RF12 Consultar el cruce provincial y por centro de costo

Prioridad esencial. El sistema deberá filtrar simultáneamente provincia y centro de costo dentro de un intervalo de emisión, y presentar importes de las filas que satisfagan ambas condiciones.

Criterio de aceptación: al seleccionar Buenos Aires y un centro, no se suman otras provincias de ese centro ni otros centros de Buenos Aires. El total provincial debe coincidir con la suma de sus cruces y el total por centro con la suma de sus categorías. Las categorías globales sin provincia se presentan como Sin provincia, sin asignarles una jurisdicción ficticia.

## RF13 Calcular importes neteados e impuesto

Prioridad esencial. El sistema deberá sumar facturas y ND y restar NC confirmadas. El impuesto se calculará por fila de distribución aplicando su alícuota al neto, con redondeo a dos decimales antes de sumar. Las categorías no imponibles aportarán impuesto cero.

Criterio de aceptación: un neto de 1.000 con tasa de 0,05 produce impuesto 50; una NC por 200 en el mismo destino produce neto firmado −200 e impuesto −10. El resumen es neto 800 e impuesto 40. Si se muestra neto menos impuesto, será 760 y se identificará como resultado analítico, independiente del total del comprobante con IVA.

## RF14 Controlar la integridad de los informes

Prioridad esencial. Antes de emitir un informe tributario o exportarlo, el sistema deberá identificar comprobantes confirmados con distribución incompleta o tasas imponibles faltantes en el intervalo de emisión solicitado.

Criterio de aceptación: si existe una incidencia en ese intervalo, se informa qué documento debe corregirse y se bloquea el informe tributario, sin mostrar un total parcial como definitivo. El bloqueo se verifica antes de aplicar los filtros provinciales y por centro, según la consulta de control vigente. Un listado administrativo puede seguir mostrando los datos pendientes.

## RF15 Obtener resúmenes temporales y contables

Prioridad esencial. El sistema deberá distinguir el período del servicio de la fecha de emisión. Permitirá obtener resúmenes por contrato, cuenta, período y mes calendario de emisión, usando documentos confirmados.

Criterio de aceptación: un documento de servicio de mayo emitido en junio aparece en el análisis de ese servicio y en el mes de emisión de junio, sin duplicarse dentro de un mismo resumen. Las agrupaciones operativas 7 y 13 deberán mostrar los límites de fechas utilizados; no prorratearán importes por días. Para períodos que excedan los dos meses previstos se requerirá definir el criterio antes de habilitar ese resumen.

## RF16 Exportar resultados

Prioridad complementaria. El sistema deberá exportar a Excel el listado o resumen consultado, indicando filtros, fechas, columnas monetarias y totales. El informe tributario incluirá neto firmado, alícuota e impuesto según el nivel de detalle seleccionado.

Criterio de aceptación: la exportación coincide con la pantalla para los mismos filtros y conserva números como valores numéricos. Si un resumen agrupa categorías con distintas tasas, no se presenta una única alícuota como si fuera común. El control RF14 también se aplica a la exportación tributaria.
