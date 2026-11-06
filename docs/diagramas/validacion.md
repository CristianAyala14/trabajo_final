# Verificación de diagramas

[Volver al índice](../README.md)

Revisión técnica documental realizada el **9 de octubre de 2026**. El resultado comprueba correspondencia y generación de los diagramas; no constituye aprobación docente ni validación de una base desplegada.

| Control | Resultado y evidencia |
|---|---|
| Entidades del DER | Nueve tablas presentes y concordantes con el diccionario. |
| Atributos del DER | 54 campos incluidos, con tipo, claves y obligatoriedad básica. |
| Relaciones | Once FK representadas en el DER y once asociaciones de dominio en clases. |
| Clases y persistencia | Nueve clases persistentes; 42 atributos explícitos, once FK mediante asociaciones y total mediante método derivado: cobertura de los 54 campos. |
| Dominios | FACTURA, NOTA_CREDITO y NOTA_DEBITO; BORRADOR, CONFIRMADO y ANULADO. Las enumeraciones UML corresponden a restricciones del modelo, no a tablas nuevas. |
| Cardinalidades condicionales | Origen obligatorio en notas; provincia obligatoria si imponible; distribuciones completas al confirmar. Documentadas junto al DER. |
| Composición | Distribución pertenece a un comprobante; no implica borrado SQL en cascada. |
| Responsabilidades | Confirmación, anulación, concurrencia e informes coordinados en servicios. |
| Sintaxis y generación | Siete fuentes Mermaid generadas exitosamente con Mermaid CLI 12.0.0. |
| Presentación | Revisadas imágenes del DER, clases, servicios, arquitectura y las tres secuencias. Se incluyen SVG ampliables para lectura. |
| Consistencia de fuentes | Bloques Mermaid de los documentos comparados con sus archivos editables. |

## Diagramas disponibles

| Diagrama | Documento | Fuente editable | Imagen ampliable |
|---|---|---|---|
| Entidad-relación | [DER](entidad-relacion.md) | [Mermaid](entidad-relacion.mmd) | [SVG](entidad-relacion.svg) |
| Clases del dominio | [Clases](clases.md) | [Mermaid](clases.mmd) | [SVG](clases.svg) |
| Servicios de aplicación | [Clases y servicios](clases.md) | [Mermaid](servicios.mmd) | [SVG](servicios.svg) |
| Arquitectura | [Arquitectura](../arquitectura.md) | [Mermaid](arquitectura.mmd) | [SVG](arquitectura.svg) |
| Confirmación y notas | [Secuencias](secuencias.md) | [Mermaid](secuencia-confirmacion.mmd) | [SVG](secuencia-confirmacion.svg) |
| Informe y exportación | [Secuencias](secuencias.md) | [Mermaid](secuencia-informe.mmd) | [SVG](secuencia-informe.svg) |
| Anulación | [Secuencias](secuencias.md) | [Mermaid](secuencia-anulacion.mmd) | [SVG](secuencia-anulacion.svg) |

## Límites y siguiente verificación

No se ejecutaron operaciones sobre la base PostgreSQL ni pruebas del backend durante esta revisión documental. La igualdad entre modelo y esquema desplegado, los límites de NC, el aislamiento, los bloqueos y las transiciones deben verificarse mediante pruebas sobre la aplicación integrada. Su ejecución queda pendiente.

Si cambia una tabla, relación o responsabilidad, actualizar la fuente Mermaid, su bloque documental, su SVG y esta verificación. En particular, modificar alícuotas afecta cálculos históricos porque el MVP no conserva vigencias.
