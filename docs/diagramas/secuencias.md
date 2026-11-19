# Diagramas de secuencia de procesos críticos

[Volver al índice](../README.md)

Los diagramas describen el comportamiento propuesto del backend. Mantienen la arquitectura de controladores, servicios y modelos Sequelize, sin agregar repositorios obligatorios.

## Confirmación y límites de notas

CU01 y CU02; RF07 a RF09; RN04, RN05, RN08 y RN09.

```mermaid
sequenceDiagram
    actor O as Operador
    participant C as Controlador
    participant S as ServicioComprobantes
    participant DB as PostgreSQL mediante Sequelize
    O->>C: Confirmar borrador
    C->>S: confirmar(id)
    S->>DB: BEGIN y bloquear comprobante
    Note over S,DB: Edicion de distribuciones usa el mismo bloqueo de cabecera
    S->>DB: Leer estado y distribuciones
    S->>S: Validar neto positivo y suma exacta
    opt NC o ND
        S->>DB: Bloquear factura origen y leer notas confirmadas
        S->>S: Validar origen, contrato, cuenta y motivo
        opt NC
            S->>S: Controlar limite acumulado de neto e IVA
        end
    end
    alt Datos validos
        S->>DB: Cambiar a CONFIRMADO y COMMIT
        S-->>C: Documento confirmado
        C-->>O: Confirmacion exitosa
    else Validacion o persistencia falla
        S->>DB: ROLLBACK
        S-->>C: Error identificable
        C-->>O: Informar motivo sin cambio parcial
    end
```

## Informe tributario y exportación

CU04 y CU06; RF12 a RF16; RN06, RN08, RN10 y RN11.

```mermaid
sequenceDiagram
    actor O as Operador
    participant S as ServicioReportes
    participant DB as PostgreSQL mediante Sequelize
    participant E as ServicioExportacion
    O->>S: Consultar fechas y filtros provincia y centro
    S->>DB: BEGIN lectura con instantanea consistente
    S->>DB: Controlar todos los confirmados del intervalo
    alt Distribucion incompleta o tasa imponible faltante
        DB-->>S: Documentos con incidencias
        S->>DB: Finalizar lectura
        S-->>O: Informe bloqueado con detalle
    else Sin incidencias
        S->>DB: Filtrar cruces, aplicar signo y redondeo por fila
        DB-->>S: Filas y totales
        S->>DB: Finalizar lectura
        S-->>O: Reporte o ausencia de coincidencias
        opt Exportar
            O->>S: Solicitar exportacion con los mismos filtros
            Note over S,DB: Repetir control y consulta en una misma instantanea
            S->>DB: Obtener reporte actualizado y validado
            alt Sigue siendo valido
                DB-->>S: Resultado consistente
                S->>E: Generar Excel con resultado y filtros
                E-->>O: Archivo
            else Nueva incidencia
                S-->>O: Bloquear exportacion y mostrar motivo
            end
        end
    end
```

## Anulación y notas relacionadas

CU05; RF10; RN06, RN09 y RN13.

```mermaid
sequenceDiagram
    actor O as Operador
    participant S as ServicioComprobantes
    participant DB as PostgreSQL mediante Sequelize
    O->>S: Anular comprobante
    S->>DB: BEGIN y bloquear documento y origen aplicable
    Note over S,DB: Compartir bloqueo de origen con confirmacion de notas
    S->>DB: Consultar estado y notas confirmadas vinculadas
    alt Factura con notas confirmadas o estado no permitido
        S->>DB: ROLLBACK
        S-->>O: Rechazar e indicar motivo
    else Anulacion permitida
        S->>DB: Actualizar estado a ANULADO y COMMIT
        S-->>O: Documento conservado y excluido de informes
    end
```

## Condiciones de implementación

Guardar cabecera y distribuciones también es una operación atómica. Todos los caminos que editan distribuciones deben respetar el bloqueo de su comprobante; bloquear únicamente al confirmar no evita escrituras concurrentes por otro camino. El bloqueo de la factura origen serializa confirmaciones de notas y anulaciones que compiten por ella. Establecer un orden de bloqueo consistente y una política de reintento de transacciones ante interbloqueos.

Una implementación posible del informe es una transacción de lectura con aislamiento REPEATABLE READ: control y agregación observan la misma instantánea, incluidas las alícuotas. Una exportación vuelve a validar; puede diferir de una pantalla anterior si los datos cambiaron y debe indicar sus criterios. Ante un error de base o conexión se comunica fallo, no ausencia de resultados.

Los bloqueos y el aislamiento son propuestas que deben implementarse y probarse. Se deberán ejecutar pruebas de concurrencia y atomicidad sobre estos recorridos.
