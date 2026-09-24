# Requisitos no funcionales

[Volver al índice de documentación](README.md)

Los siguientes criterios son objetivos de aceptación del MVP. Los valores de rendimiento y recuperación se proponen para planificar pruebas y no representan resultados ya medidos ni prestaciones contratadas.

## RNF01 Integridad y atomicidad

La base deberá mantener claves primarias, foráneas, unicidad y restricciones de dominio. La creación de un comprobante con sus distribuciones, su confirmación y la validación de notas deberán completarse o revertirse íntegramente. Verificación: provocar un error durante cada operación y comprobar que no quedan cambios parciales.

## RNF02 Precisión monetaria

Los cálculos persistidos deberán utilizar decimales exactos y dos decimales para dinero; el frontend deberá evitar errores de coma flotante mediante centavos enteros o una biblioteca decimal. Verificación: casos con NC, importes fraccionarios y redondeo por fila producen los mismos resultados en interfaz y SQL, sin diferencias de centavos.

## RNF03 Consistencia ante concurrencia

Aunque exista un operador, dos pestañas o solicitudes simultáneas no deberán permitir superar límites de crédito ni confirmar una distribución que cambió durante el control. Verificación: ejecutar solicitudes concurrentes y comprobar que la transacción, bloqueo o mecanismo equivalente conserva las reglas.

## RNF04 Rendimiento

Objetivo propuesto: con 10.000 comprobantes y 50.000 distribuciones, una sesión activa y un entorno de prueba documentado, el percentil 95 de búsquedas paginadas e informes habituales deberá ser inferior a 2 segundos. Verificación: al menos 30 ejecuciones por operación, registrando volumen, servidor, red y tiempo hasta presentar el resultado. La interfaz deberá paginar y evitar descargar toda la base.

## RNF05 Usabilidad y prevención de errores

Los formularios deberán identificar campos obligatorios, expresar errores junto al dato y conservar la carga si una validación falla. Deberán distinguir visual y textualmente tipo, estado, diferencia pendiente y tasa faltante. Verificación: completar una factura y una NC mediante un recorrido de aceptación sin interpretar nombres internos de tablas.

## RNF06 Accesibilidad y adaptación

Las funciones principales deberán poder utilizarse con teclado, etiquetas accesibles, foco visible y mensajes que no dependan solamente del color. La vista deberá funcionar en anchos de 390 y 1366 píxeles; una tabla podrá tener desplazamiento horizontal controlado. Verificación: recorrer búsqueda, filtros, formulario y detalle con teclado y revisar contraste y ausencia de controles inaccesibles.

## RNF07 Compatibilidad

La aplicación deberá funcionar en Chrome y Edge en las versiones registradas al realizar las pruebas de aceptación. Se documentarán navegador y sistema operativo utilizados. Verificación: completar el circuito principal y comprobar fechas, decimales, diálogos y descarga de archivos en ambos navegadores.

## RNF08 Protección técnica de los datos

El MVP no tendrá módulos de usuarios, roles ni auditoría, pero las credenciales privilegiadas deberán permanecer en el servidor. La clave publicable no equivale a una credencial administrativa. Las tablas conservarán RLS y no se abrirán políticas públicas de escritura para conectar el frontend. Una instalación sin autenticación se limitará a un entorno local o acceso restringido; publicar un backend privilegiado de acceso libre queda fuera de esta configuración.

Verificación: revisar que los archivos del navegador no contienen secretos y que una solicitud pública no autorizada no puede leer ni modificar datos. Si se publica el servicio, deberá utilizar transporte cifrado y definirse el control de acceso de infraestructura antes de su exposición. Esto no agrega tablas de permisos al modelo.

## RNF09 Validación de entradas

El backend deberá validar tipos, longitudes, valores permitidos, referencias y reglas de negocio independientemente de la interfaz. Las consultas deberán usar parámetros. Verificación: enviar directamente solicitudes inválidas y comprobar su rechazo sin corrupción ni exposición de información interna.

## RNF10 Recuperación

Objetivo propuesto: contar con una copia recuperable diaria y poder restaurar en hasta 4 horas, con una pérdida máxima de 24 horas de datos. Verificación: restaurar una copia en un entorno separado y contrastar cantidades, totales y relaciones. La disponibilidad de copias en Supabase deberá comprobarse según la configuración elegida; no se presupone que estén habilitadas.

## RNF11 Mantenibilidad y evolución

El código deberá separar presentación, reglas de negocio y acceso a datos. Los cambios del modelo deberán mantener actualizado el diccionario de datos. Verificación: la estructura implementada coincide con la documentación y las reglas críticas disponen de pruebas reproducibles.

## RNF12 Manejo de fallos y trazabilidad de resultados

La aplicación deberá distinguir ausencia de datos, informe bloqueado y error de conexión. Los informes y exportaciones deberán indicar sus filtros, fechas y criterio de cálculo. Verificación: interrumpir el acceso a datos y comprobar que no se muestra cero como si fuera un resultado válido. Esta trazabilidad de consultas no constituye un módulo de auditoría de usuarios.
