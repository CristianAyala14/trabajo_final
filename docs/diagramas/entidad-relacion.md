# Diagrama entidad-relación

[Volver al índice de documentación](../README.md)

El diagrama describe las nueve entidades persistidas y sus once relaciones. Los campos y restricciones se detallan en [Base de datos](../base-de-datos.md).

```mermaid
erDiagram
    provincia o|--o{ cliente : domicilio
    cliente ||--o{ contrato : posee
    cuenta_contable o|--o{ contrato : sugiere
    contrato ||--o{ comprobante : origina
    periodo_servicio ||--o{ comprobante : clasifica
    cuenta_contable ||--o{ comprobante : imputa
    comprobante o|--o{ comprobante : factura_origen
    provincia o|--o{ categoria_fiscal : agrupa
    comprobante ||--o{ distribucion_comprobante : distribuye
    categoria_fiscal ||--o{ distribucion_comprobante : clasifica
    centro_costo ||--o{ distribucion_comprobante : recibe
```

La opcionalidad representa las columnas del esquema. Una NC o ND exige factura de origen, una categoría imponible exige provincia y un comprobante confirmado exige al menos una distribución completa. Estas condiciones complementan las cardinalidades generales.
