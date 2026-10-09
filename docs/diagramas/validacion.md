# Verificación del DER y del diagrama de clases

[Volver al índice](../README.md)

Verificación técnica documental del 9 de octubre de 2026. No constituye aprobación docente ni comprobación de una base desplegada.

| Control | Resultado |
|---|---|
| Entidades del DER | Nueve tablas concordantes con el diccionario. |
| Campos | 54 campos con tipos, claves y obligatoriedad básica. |
| Relaciones | Once FK en el DER y once asociaciones de dominio en clases. |
| Correspondencia UML | 42 atributos explícitos, once FK expresadas como asociaciones y total derivado: cobertura de los 54 campos. |
| Tipos y estados | Factura, NC y ND; borrador, confirmado y anulado. |
| Reglas condicionales | Origen obligatorio en notas, provincia en categorías imponibles y distribución completa al confirmar. |
| Composición | Una distribución pertenece a su comprobante; no implica borrado SQL en cascada. |
| Generación | DER y clases generados con Mermaid CLI 12.0.0; imágenes revisadas. |

## Diagramas

- [DER completo](entidad-relacion.md), [fuente editable](entidad-relacion.mmd) e [imagen ampliable](entidad-relacion.svg).
- [Clases y responsabilidades](clases.md), [fuente del dominio](clases.mmd) e [imagen ampliable](clases.svg).

Los diagramas se contrastaron con el [diccionario de datos](../base-de-datos.md). No se ejecutaron operaciones sobre PostgreSQL ni pruebas del backend. Los controles transaccionales, límites de crédito, concurrencia y esquema desplegado deben comprobarse durante la implementación. Actualizar fuente, documento e imagen cuando cambie el diseño.
