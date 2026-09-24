# Procesos y cálculos

[Volver al índice de documentación](README.md)

## Ejemplo del cruce unificado

Ejemplo ilustrativo en ARS, con alícuotas elegidas únicamente para explicar el cálculo. Se registra una factura con neto 1.000 e IVA 210. Su total generado es 1.210. La distribución no incluye los 210 de IVA.

| Tipo | Provincia y categoría | Centro | Neto almacenado | Alícuota | Neto firmado | Impuesto firmado |
|---|---|---|---|---|---|---|
| FACTURA | Buenos Aires servicios | CC01 | 600,00 | 5 % | 600,00 | 30,00 |
| FACTURA | Córdoba servicios | CC02 | 400,00 | 3 % | 400,00 | 12,00 |
| NC | Buenos Aires servicios | CC01 | 100,00 | 5 % | −100,00 | −5,00 |
| ND | Córdoba servicios | CC02 | 50,00 | 3 % | 50,00 | 1,50 |

Cada nota tiene su propia cabecera y afecta a la factura original. Si los tres documentos están confirmados y en el rango seleccionado, el neto global es 950 y el impuesto 38,50. Para Buenos Aires y CC01 el neto es 500 y el impuesto 25. Para Córdoba y CC02 el neto es 450 y el impuesto 13,50. Ambos ejes se reconcilian porque utilizan las mismas filas.

La fórmula es signo = −1 para NOTA_CREDITO y +1 para los demás tipos. Neto firmado = importe_neto × signo. Para una categoría imponible, impuesto firmado = redondear(importe_neto × alicuota, 2) × signo; para una no imponible es cero. Se redondea por fila y luego se suma, por lo que puede existir una diferencia de centavos respecto de aplicar la tasa después de agrupar.

La consulta de distribuciones devuelve varias filas por comprobante. Para obtener totales de cabecera no debe sumarse repetidamente el neto o IVA de comprobante después de un JOIN uno a muchos; deben agregarse las distribuciones o calcular las cabeceras por separado. Una búsqueda administrativa que filtre por provincia y centro debe conservar una sola fila por documento, por ejemplo mediante EXISTS.

## Vista de control

v_control_distribucion presenta un registro por comprobante con comprobante_id, numero, fecha_emision, estado, neto_comprobante, cantidad_distribuciones, neto_distribuido, diferencia, tasas_faltantes y distribucion_completa.

La diferencia es neto del comprobante menos suma distribuida. Una distribución completa requiere al menos una fila y diferencia cero. tasas_faltantes cuenta filas imponibles sin alícuota, no categorías distintas. La vista permite detectar problemas; no cambia estados ni bloquea confirmaciones automáticamente.

## Vista de importes

v_distribucion_importes presenta una fila por distribución, con identificadores del documento, contrato, período, cuenta, categoría, provincia y centro; datos de emisión y estado; imponible, alicuota, importe_neto, neto_firmado, impuesto y tasa_faltante. También expone nombres y código del centro para su presentación.

La vista incluye todos los estados. El consumidor debe filtrar estado = CONFIRMADO para informes definitivos. Si falta una tasa imponible, impuesto resulta NULL; no debe reemplazarse por cero. Ambas vistas utilizan security_invoker y respetan los permisos del consultante y las políticas aplicables.

## Período operativo y mes de emisión

El período de servicio y el rango de emisión responden a preguntas diferentes. Para un servicio que abarca mayo y junio, la agrupación 7 reúne las emisiones del mes inicial dentro del intervalo definido; la agrupación 13 reúne únicamente las emisiones del mes siguiente que correspondan al mismo período. Las dos porciones deben consultarse sin solaparse. Son resúmenes de gestión, no asientos de partida doble con contrapartidas.

Por ejemplo, una primera porción puede abarcar del 14 al 31 de mayo y una segunda del 1 al 14 de junio, siempre con el período de servicio seleccionado. No se multiplica el neto por una proporción de días. Un documento fuera de esas ventanas debe señalarse para definir su tratamiento, evitando que se omita silenciosamente. El informe mensual por emisión utiliza, en cambio, los límites del mes calendario y cada NC o ND se ubica por su propia emisión.
