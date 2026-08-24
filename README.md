# trabajo_final

Sistema Web de Gestión de Facturación y Generación de Información Contable
1. Introducción
La empresa realiza obras y servicios para distintos clientes mediante contratos que poseen una fecha de inicio y finalización. Durante estos contratos se generan facturas de manera periódica.
Actualmente, gran parte de la información de facturación se administra mediante diferentes planillas de Excel. Las facturas deben relacionarse con contratos, períodos de servicio, provincias, centros de costo y cuentas contables, y posteriormente utilizarse para generar distintos reportes y asientos.
El principal problema es que estos procesos requieren clasificaciones, cálculos y controles manuales, mientras que una misma factura puede ser utilizada bajo diferentes criterios según el análisis que se quiera realizar.
________________________________________
2. Problemática
La empresa trabaja con períodos de servicio que no necesariamente coinciden con los meses calendario.
Por ejemplo, un período de servicio puede ser:
14/05 → 14/06
Una factura emitida el 05/06 puede pertenecer al período de servicio de mayo, aunque su fecha de emisión corresponda al mes calendario de junio.
Sin embargo, otros procesos, como el cálculo de Ingresos Brutos, utilizan meses calendario completos:
01/06 → 30/06
Por lo tanto, una misma factura puede pertenecer al período de servicio de mayo y, al mismo tiempo, formar parte del análisis fiscal correspondiente a junio.
Esto demuestra que la factura no debe asociarse a un único período de análisis. El sistema debe conservar sus datos originales y permitir aplicar diferentes criterios según el proceso que se quiera realizar.
Además, el uso de múltiples planillas dificulta las consultas históricas, aumenta la posibilidad de errores, dificulta el control de modificaciones y obliga a repetir información para generar diferentes reportes.
________________________________________
3. Propuesta
Se propone desarrollar una aplicación que centralice la información relacionada con la facturación y permita utilizarla para diferentes procesos administrativos, contables y fiscales.
La idea principal es:
Registrar la información una sola vez y utilizarla para diferentes análisis y reportes.
El sistema permitirá administrar contratos, facturas, notas de crédito, períodos, provincias, centros de costo y cuentas contables.
A partir de las facturas almacenadas, el sistema podrá generar diferentes resultados aplicando reglas de negocio específicas.
________________________________________
4. Períodos de análisis
El sistema contará con el concepto de Período de Análisis.
Un período de análisis permitirá determinar qué facturas deben ser consideradas para un determinado proceso mediante:
•	Fecha de inicio.
•	Fecha de finalización.
•	Tipo de período.
•	Criterio utilizado.
Por ejemplo:
Período de servicio
14/05 → 14/06

Mes calendario
01/06 → 30/06

Quincena
01/06 → 14/06
Una vez seleccionado el período, el sistema obtendrá las facturas correspondientes y permitirá ejecutar diferentes procesos sobre ellas.
Por ejemplo:
Período de análisis
       ↓
Facturas correspondientes
       ↓
┌──────────────┬──────────────┬──────────────┐
│ Ingresos     │ Asiento 7    │ Asiento 13   │
│ Brutos       │              │              │
└──────────────┴──────────────┴──────────────┘
Esto permitirá incorporar nuevos tipos de análisis en el futuro sin modificar la información original de las facturas.
________________________________________
5. Asientos contables
Los asientos serán reportes o resúmenes generados a partir de las facturas, aplicando diferentes reglas de negocio.
Asiento 7
Obtendrá las facturas del período de servicio cuya fecha de emisión corresponde al mes en el que comenzó dicho período.
Ejemplo:
Período de servicio:
14/05 → 14/06

Facturas:
14/05 → 31/05

→ Asiento 7
Asiento 13 - Devengados
Obtendrá la parte restante del período de servicio cuya fecha de emisión corresponde al mes siguiente.
Período de servicio:
14/05 → 14/06

Facturas:
01/06 → 14/06

→ Asiento 13
Ambos representan distintas partes del mismo período de servicio.
Asiento 16 - Ingresos Brutos
Utilizará un período calendario completo, independientemente del período de servicio.
Por ejemplo:
01/05 → 31/05
El sistema tomará las facturas correspondientes a ese período, las agrupará por provincia y centro de costo y permitirá calcular el impuesto aplicando las alícuotas configuradas para cada provincia.
Ejemplo:
Provincia A
Facturación: $1.000.000
Alícuota: 3,5%
IIBB: $35.000

Provincia B
Facturación: $500.000
Alícuota: 4%
IIBB: $20.000
El resultado podrá utilizarse para generar el reporte correspondiente y asociarse a las cuentas contables configuradas.
________________________________________
6. Facturación
El sistema permitirá registrar y administrar facturas asociadas a contratos.
Cada factura almacenará, entre otros datos:
•	Número.
•	Fecha de emisión.
•	Contrato.
•	Período de servicio.
•	Importes.
•	IVA.
•	Provincia.
•	Centro de costo.
•	Estado.
Una factura podrá distribuirse entre diferentes provincias y centros de costo.
También se podrán registrar notas de crédito asociadas a una factura, manteniendo la factura original y registrando por separado la disminución correspondiente.
De esta manera se mantiene la trazabilidad de las operaciones.
________________________________________
7. Contratos, provincias y centros de costo
El sistema permitirá administrar los contratos de la empresa y relacionarlos con sus correspondientes facturas.
También contará con catálogos de:
•	Provincias.
•	Centros de costo.
•	Clientes.
•	Cuentas contables.
Los centros de costo y las provincias podrán utilizarse como criterios para distribuir y agrupar la información de las facturas.
________________________________________
8. Cuentas contables
El sistema permitirá administrar cuentas contables y relacionarlas con los diferentes conceptos utilizados en los procesos administrativos y fiscales.
Por ejemplo:
Concepto
Ingresos Brutos
        ↓
Cuenta contable correspondiente
Las cuentas podrán utilizarse al generar reportes y resultados contables.
La asignación será configurable para evitar que un cambio en una cuenta contable requiera modificar el código de la aplicación.
________________________________________
9. Funcionalidades principales
Gestión
•	Inicio de sesión.
•	Usuarios y roles.
•	Clientes.
•	Contratos.
•	Provincias.
•	Centros de costo.
•	Cuentas contables.
Facturación
•	Alta y consulta de facturas.
•	Modificación según permisos.
•	Notas de crédito.
•	Asociación con contratos.
•	Asociación con períodos.
•	Distribución por provincia y centro de costo.
Períodos
•	Creación y configuración de períodos.
•	Períodos de servicio.
•	Períodos de análisis.
•	Apertura y cierre.
•	Control de modificaciones.
Procesamiento
•	Generación de asiento 7.
•	Generación de asiento 13.
•	Cálculo de Ingresos Brutos.
•	Aplicación de alícuotas configurables.
•	Agrupación por provincia y centro de costo.
•	Asociación con cuentas contables.
•	(en el futuro podrían sumarse nuevos cálculos de impuestos)
Reportes
•	Facturación por período.
•	Facturación por contrato.
•	Facturación por provincia.
•	Facturación por centro de costo.
•	Facturación histórica.
•	Reportes fiscales y contables.
Exportación
Los resultados podrán exportarse a Excel para continuar con los procesos administrativos y contables actuales.
________________________________________
11. Entidades principales
El modelo inicial estará compuesto por entidades como:
Usuario
Rol
Cliente
Contrato
Factura
NotaCredito
PeriodoServicio
PeriodoAnalisis
Provincia
CentroCosto
CuentaContable
ConceptoContable
DistribucionFactura
Asiento
Auditoria
Las relaciones principales serán:
Cliente
   ↓
Contrato
   ↓
Factura
   ↓
Distribución
   ├── Provincia
   └── Centro de costo

Factura
   ↓
Período de servicio

Factura
   ↓
Períodos de análisis
   ↓
Procesos / Reportes
El modelo definitivo será definido y normalizado durante la etapa de diseño de la base de datos.
________________________________________
12. Arquitectura y tecnologías
El proyecto estará orientado al desarrollo web y utilizará una arquitectura cliente-servidor.
React
   ↓
API REST
   ↓
Node.js + Express
   ↓
Base de datos SQL
React
Se utilizará para desarrollar la interfaz de usuario, formularios, tablas, filtros y reportes.
Node.js + Express
Se utilizará para desarrollar el backend, la API REST, las validaciones, la autenticación y las reglas de negocio.
SQL
Se utilizará una base de datos relacional, como PostgreSQL, debido a la cantidad de relaciones existentes entre clientes, contratos, facturas, períodos, provincias, centros de costo y cuentas contables.
La arquitectura web permitirá centralizar la información y que distintos usuarios trabajen sobre una misma base de datos.
________________________________________
13. Alcance inicial
La primera versión del sistema incluirá:
1.	Autenticación y usuarios.
2.	Roles y permisos.
3.	Clientes y contratos.
4.	Provincias y centros de costo.
5.	Cuentas contables.
6.	Períodos de servicio.
7.	Períodos de análisis.
8.	Facturas.
9.	Notas de crédito.
10.	Distribución por provincia y centro de costo.
11.	Cierre de períodos.
12.	Auditoría básica.
13.	Asiento 7.
14.	Asiento 13.
15.	Cálculo de Ingresos Brutos.
16.	Reportes.
17.	Exportación a Excel.
________________________________________
14. Funcionalidades futuras
El diseño permitirá incorporar posteriormente:
•	Nuevos impuestos.
•	Nuevos asientos.
•	Nuevos tipos de períodos.
•	Importación masiva desde Excel.
•	Integración con sistemas contables externos.
•	Nuevos reportes y procesos fiscales.
•	Paneles y estadísticas.
________________________________________
15. Beneficios esperados
El sistema permitirá:
•	Centralizar la información.
•	Reducir la dependencia de múltiples planillas.
•	Disminuir errores manuales.
•	Evitar duplicación de información.
•	Mejorar las consultas históricas.
•	Controlar modificaciones.
•	Trabajar con períodos cerrados.
•	Aplicar diferentes criterios de análisis sobre una misma factura.
•	Automatizar cálculos y reportes.
•	Mejorar la trazabilidad.
•	Facilitar la generación de información contable.
•	Permitir futuras ampliaciones.
________________________________________
16. Justificación del proyecto
El proyecto aborda una problemática real mediante una aplicación web que integra frontend, backend y base de datos.
Su desarrollo permitirá aplicar conocimientos de:
•	Análisis de requerimientos.
•	Modelado de datos.
•	Bases de datos SQL.
•	Desarrollo frontend.
•	Desarrollo backend.
•	APIs REST.
•	Autenticación y autorización.
•	Reglas de negocio.
•	Generación de reportes.
•	Exportación de información.
La principal característica del sistema será que la información se registra una única vez y puede ser analizada mediante diferentes criterios según el proceso que se quiera realizar.
De esta forma, el proyecto no se limita a reemplazar planillas de Excel, sino que propone centralizar la información y establecer una estructura que permita automatizar y ampliar progresivamente los procesos administrativos y contables de la empresa.
