# Frontend de gestión de facturación

## Primera entrega: consulta de comprobantes

Rama: `feature/vista-comprobantes`. Diseño adaptable a escritorio y móvil, con
la marca provisional **Folio**. No requiere variables de entorno.

- Listado de facturas, notas de crédito y débito con datos ficticios de septiembre de 2026.
- Búsqueda por número, cliente, contrato o concepto, y filtros combinables por tipo, estado y emisión.
- Neto e IVA del listado confirmado: facturas + ND − NC. Borradores/anulados no se suman.
- Detalle en diálogo con cuenta, período, factura de origen y distribución categoría fiscal–centro.
- Estados vacíos, rango de fechas inválido y distribución pendiente.

Ejecutar `npm install` si faltan dependencias y `npm run dev` para iniciar.
Comprobaciones: `npm run build` y `npm run lint`.
