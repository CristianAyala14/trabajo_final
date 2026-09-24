# Reglas de negocio

[Volver al índice de documentación](README.md)

| Código | Regla | Control previsto |
|---|---|---|
| RN01 | Una empresa emisora y moneda ARS; no hay conversión monetaria. | Alcance de aplicación |
| RN02 | Una factura pertenece a un contrato, período y cuenta efectiva. | NOT NULL y FK |
| RN03 | El número completo es único por tipo; se normaliza antes de guardar. | UNIQUE y backend |
| RN04 | Los importes se guardan positivos o cero; el neto confirmado es mayor que cero. | CHECK |
| RN05 | FACTURA no tiene origen; NC y ND tienen origen y motivo. | CHECK; validez del origen en backend |
| RN06 | NC resta; factura y ND suman. Solo confirmados integran informes. | Vistas y filtros de consulta |
| RN07 | Cada distribución es positiva y única por documento, categoría y centro. | CHECK y UNIQUE |
| RN08 | La suma distribuida coincide con el neto al confirmar. | Backend transaccional; vista de control |
| RN09 | Las NC confirmadas no superan neto ni IVA de la factura de origen. | Backend transaccional |
| RN10 | Imponible exige provincia; tasa entre 0 y 1 si está informada. | CHECK |
| RN11 | Falta de alícuota imponible bloquea el informe tributario; no imponible calcula cero. | Vistas y servicio de informes |
| RN12 | Las fechas de emisión no determinan el período de servicio. | Selección explícita y FK |
| RN13 | Los datos referenciados no se eliminan; los catálogos con activo pueden desactivarse. | FK RESTRICT y backend |
| RN14 | Cambiar la tasa actual modifica cálculos históricos; no existe historial. | Limitación del modelo y aviso de interfaz |

Las restricciones entre varias filas o tablas no están garantizadas por un CHECK local. Deben implementarse en el backend con transacciones o, alternativamente, mediante funciones y disparadores SQL. Las vistas existentes sirven para calcular o detectar incidencias; por sí solas no impiden una escritura inválida.
