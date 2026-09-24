# Presentación y alcance

[Volver al índice de documentación](README.md)

## Introducción y problemática

La empresa realiza obras y servicios para distintos clientes mediante contratos y genera facturas periódicamente. Actualmente administra gran parte de esta información en planillas de Excel. Los documentos deben relacionarse con contratos, períodos de servicio, provincias, centros de costo y cuentas contables para elaborar distintos reportes.

Este trabajo requiere clasificaciones, cálculos y controles manuales. El uso de varias planillas dificulta las consultas históricas, genera duplicación y obliga a repetir tareas para producir resultados diferentes.

Además, un período de servicio puede no coincidir con un mes calendario. Por ejemplo, un servicio del **14 de mayo al 14 de junio** puede incluir una factura emitida el **5 de junio**. Esa factura pertenece al servicio seleccionado y también al análisis de Ingresos Brutos de junio por su fecha de emisión.

Por ello, cada comprobante conserva una fecha de emisión y un período de servicio asignado expresamente. Los distintos análisis aplican filtros sobre esos datos, sin duplicar el documento ni guardar un único período de análisis que limite su utilización.

Otra dificultad es reconciliar los importes provinciales con los centros de costo. Conocer los totales de ambas dimensiones por separado no permite determinar su cruce exacto. El sistema registrará cada porción del neto junto con su categoría fiscal y centro de costo en una misma fila.

## Propuesta y objetivos

Se propone una aplicación web que centralice la información de facturación y permita utilizarla para diferentes procesos administrativos, contables y fiscales.

**Objetivo principal:** registrar la información una sola vez y utilizarla para diferentes análisis y reportes.

Los objetivos específicos son:

- Administrar clientes, contratos y los catálogos utilizados para clasificar ingresos.
- Registrar facturas, notas de crédito y notas de débito conservando sus relaciones.
- Distribuir el neto de cada documento por categoría fiscal y centro de costo.
- Distinguir el período de servicio del mes calendario de emisión.
- Controlar diferencias de distribución y datos pendientes antes de generar resultados.
- Consultar importes neteados e impuesto calculado por alícuota.
- Generar resúmenes operativos y exportarlos a Excel.

Los beneficios esperados son reducir tareas repetitivas, evitar duplicación y mejorar la consistencia de consultas históricas. El vínculo entre una nota y su factura permite seguir el ajuste comercial; no equivale a un historial de auditoría de todas las modificaciones.

El proyecto permite aplicar conocimientos de análisis de requisitos, modelado relacional, frontend, backend, APIs REST, validaciones, transacciones y generación de reportes.

## Alcance del MVP

El MVP contempla una empresa emisora, una moneda de trabajo ARS y un único operador administrativo. No incluye gestión de usuarios, roles, permisos de negocio ni auditoría. El operador administra los datos maestros, registra documentos, controla su distribución y consulta los resultados.

El modelo activo contiene nueve tablas y once relaciones mediante claves foráneas. Facturas, notas de crédito y notas de débito se almacenan en comprobante. La tabla distribucion_comprobante identifica el cruce exacto entre categoría fiscal y centro de costo.

## Funciones incluidas

- Administración de clientes, contratos, períodos de servicio, cuentas contables, provincias, categorías fiscales y centros de costo.
- Registro de facturas, notas de crédito y notas de débito con neto, IVA y total calculado.
- Distribución del neto por categoría fiscal y centro de costo en una misma operación.
- Gestión de borradores, confirmación y anulación de comprobantes.
- Consultas y resúmenes por emisión, período de servicio, contrato, cuenta, provincia y centro de costo.
- Cálculo simple de impuesto mediante alícuota y exportación de los resultados a Excel.

## Funciones excluidas

Quedan fuera del MVP la emisión electrónica oficial de comprobantes, cobranzas y pagos, conciliación bancaria, contabilidad de partida doble, liquidación tributaria integral, retenciones, percepciones, SIRCREB, saldos a favor y distribución municipal. Tampoco se contemplan múltiples empresas o monedas, historial de alícuotas, cierre de períodos, importación automática de la planilla, varias cuentas contables por comprobante ni notas aplicadas a múltiples facturas.

Las categorías pueden identificar actividades o regímenes, pero sus nombres no implementan por sí solos coeficientes ni reglas tributarias especiales. El impuesto del MVP es un cálculo de apoyo a la gestión, con las tasas configuradas por el operador.

## Ampliaciones futuras

Las ampliaciones se evaluarán después de completar el circuito del MVP:

- Autenticación, múltiples usuarios, roles y auditoría de modificaciones.
- Cierre y reapertura controlada de períodos.
- Historial de alícuotas o conservación de la tasa aplicada a cada operación.
- Períodos de análisis guardados y configuraciones reutilizables de reportes.
- Conceptos contables, contrapartidas y asientos de partida doble.
- Nuevos impuestos, coeficientes, distribución municipal y liquidación tributaria completa.
- Importación validada desde Excel e integración con sistemas externos.
- Varias cuentas por comprobante, notas con múltiples facturas de origen y reglas de aplicación más amplias.
- Múltiples empresas o monedas, paneles y estadísticas.

Estas posibilidades no son funcionalidades comprometidas para la primera versión y algunas requieren ampliar el modelo de datos.
