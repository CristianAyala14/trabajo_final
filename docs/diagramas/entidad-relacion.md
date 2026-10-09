# Diagrama entidad-relación completo

[Volver al índice](../README.md)

El DER contiene las nueve tablas, los 54 campos y las once relaciones del modelo. Los tipos como `numeric_20_2` representan `numeric(20,2)`; esta notación permite leer precisión y escala en Mermaid.

```mermaid
erDiagram
    direction TB
    cliente {
        varchar_200 razon_social "opcional"
        varchar_40 telefono "opcional"
        text domicilio "opcional"
        varchar_254 email "opcional"
        bigint provincia_id FK "opcional"
        bigint id PK "obligatorio"
        varchar_200 nombre "obligatorio"
        varchar_30 identificacion_fiscal UK "opcional"
        boolean activo "obligatorio"
    }
    contrato {
        date fecha_inicio "opcional"
        date fecha_fin "opcional"
        bigint cuenta_contable_id FK "opcional"
        bigint id PK "obligatorio"
        bigint cliente_id FK "obligatorio"
        varchar_80 numero "obligatorio"
        text descripcion "opcional"
        boolean activo "obligatorio"
    }
    periodo_servicio {
        bigint id PK "obligatorio"
        varchar_80 nombre "obligatorio"
        date fecha_inicio "obligatorio"
        date fecha_fin "obligatorio"
    }
    cuenta_contable {
        bigint id PK "obligatorio"
        varchar_40 codigo UK "obligatorio"
        varchar_150 nombre "obligatorio"
        boolean activo "obligatorio"
    }
    comprobante {
        numeric_21_2 importe_total "generado neto mas IVA"
        bigint id PK "obligatorio"
        varchar_20 tipo "obligatorio"
        varchar_80 numero "obligatorio"
        date fecha_emision "obligatorio"
        bigint contrato_id FK "obligatorio"
        bigint periodo_servicio_id FK "obligatorio"
        bigint cuenta_contable_id FK "obligatorio"
        bigint factura_origen_id FK "opcional"
        text descripcion "opcional"
        numeric_20_2 importe_neto "obligatorio"
        numeric_20_2 importe_iva "obligatorio"
        varchar_20 estado "obligatorio"
    }
    provincia {
        bigint id PK "obligatorio"
        varchar_100 nombre UK "obligatorio"
    }
    categoria_fiscal {
        bigint id PK "obligatorio"
        bigint provincia_id FK "opcional"
        varchar_120 nombre UK "obligatorio"
        boolean imponible "obligatorio"
        numeric_9_6 alicuota "opcional"
    }
    centro_costo {
        bigint id PK "obligatorio"
        varchar_30 codigo UK "obligatorio"
        varchar_150 nombre "obligatorio"
        boolean activo "obligatorio"
    }
    distribucion_comprobante {
        bigint id PK "obligatorio"
        bigint comprobante_id FK "obligatorio"
        bigint categoria_fiscal_id FK "obligatorio"
        bigint centro_costo_id FK "obligatorio"
        numeric_20_2 importe_neto "obligatorio"
    }
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

## Restricciones que complementan el dibujo

- `PK` indica clave primaria; `FK`, clave foránea; `UK`, unicidad de una columna.
- Las unicidades compuestas son `contrato(cliente_id, numero)`, `comprobante(tipo, numero)` y `distribucion_comprobante(comprobante_id, categoria_fiscal_id, centro_costo_id)`. No se marca cada componente como único individualmente.
- FACTURA exige origen nulo; NC y ND exigen una FACTURA confirmada como origen y motivo obligatorio.
- Categoría imponible exige provincia. La tasa puede faltar al cargar, pero debe existir para calcular el informe tributario.
- Un borrador admite cero distribuciones; al confirmar se exige al menos una y suma igual al neto.
- La columna `importe_total` es generada por la base. Todas las FK mantienen `ON DELETE RESTRICT`.
- Los indicadores de opcionalidad no sustituyen las condiciones anteriores ni los controles transaccionales.

El [diccionario](../base-de-datos.md) detalla tipos, valores predeterminados y restricciones. La [verificación de diagramas](validacion.md) identifica los controles realizados. El [archivo Mermaid](entidad-relacion.mmd) es editable.

[Abrir DER como imagen ampliable](entidad-relacion.svg).
