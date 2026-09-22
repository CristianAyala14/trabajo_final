// Datos ficticios para revisar la interfaz. Sin conexión ni persistencia.
// Importes en centavos para no operar con dinero en coma flotante.
export type TipoComprobante = 'FACTURA' | 'NOTA_CREDITO' | 'NOTA_DEBITO'
export type EstadoComprobante = 'CONFIRMADO' | 'BORRADOR' | 'ANULADO'
export type Distribucion = { categoria: string; centro: string; neto: number }
export type Comprobante = {
  id: number; numero: string; tipo: TipoComprobante; fecha: string
  cliente: string; contrato: string; concepto: string; periodo: string; cuenta: string
  neto: number; iva: number; estado: EstadoComprobante; origen?: string
  distribuciones: Distribucion[]
}
export const tipos: Record<TipoComprobante, { nombre: string; sigla: string }> = {
  FACTURA: { nombre: 'Factura', sigla: 'FC' },
  NOTA_CREDITO: { nombre: 'Nota de crédito', sigla: 'NC' },
  NOTA_DEBITO: { nombre: 'Nota de débito', sigla: 'ND' },
}
export const estados: Record<EstadoComprobante, string> = {
  CONFIRMADO: 'Confirmado', BORRADOR: 'Borrador', ANULADO: 'Anulado',
}
const mantenimiento = {
  cliente: 'Andina Energía', contrato: 'CM-2026-014',
  concepto: 'Mantenimiento integral de instalaciones', periodo: '14/08/2026 – 14/09/2026', cuenta: '4.1.1.01 · Mantenimiento',
}
const obras = {
  cliente: 'Litoral Industrial', contrato: 'CM-2026-021',
  concepto: 'Obras complementarias y montaje', periodo: '01/09/2026 – 30/09/2026', cuenta: '4.1.1.06 · Obras',
}
const centro = (provincia: string, codigo: string, neto: number): Distribucion => ({
  categoria: `${provincia} · Servicios`, centro: codigo, neto,
})
export const comprobantesDemo: Comprobante[] = [
  { ...obras, id: 8, numero: 'A 0009-00001808', tipo: 'FACTURA', fecha: '2026-09-18', neto: 428000000, iva: 89880000, estado: 'BORRADOR', distribuciones: [centro('Santa Fe', '750221 · Obras litoral', 428000000)] },
  { ...mantenimiento, id: 7, numero: 'A 0009-00000191', tipo: 'NOTA_CREDITO', fecha: '2026-09-16', neto: 18500000, iva: 3885000, estado: 'CONFIRMADO', origen: 'A 0009-00001802', distribuciones: [centro('Buenos Aires', '600000 · Zona sur', 18500000)] },
  { ...mantenimiento, id: 6, numero: 'A 0009-00001806', tipo: 'FACTURA', fecha: '2026-09-14', neto: 365000000, iva: 76650000, estado: 'CONFIRMADO', distribuciones: [centro('Buenos Aires', '600000 · Zona sur', 215000000), centro('Córdoba', '700121 · Zona centro', 150000000)] },
  { ...obras, id: 5, numero: 'A 0009-00000042', tipo: 'NOTA_DEBITO', fecha: '2026-09-12', neto: 9200000, iva: 1932000, estado: 'CONFIRMADO', origen: 'A 0009-00001801', distribuciones: [centro('Santa Fe', '750221 · Obras litoral', 9200000)] },
  { ...obras, id: 4, numero: 'A 0009-00001804', tipo: 'FACTURA', fecha: '2026-09-10', neto: 216000000, iva: 45360000, estado: 'ANULADO', distribuciones: [centro('Santa Fe', '750221 · Obras litoral', 216000000)] },
  { ...mantenimiento, id: 3, numero: 'A 0009-00001803', tipo: 'FACTURA', fecha: '2026-09-08', neto: 174500000, iva: 36645000, estado: 'BORRADOR', distribuciones: [] },
  { ...mantenimiento, id: 2, numero: 'A 0009-00001802', tipo: 'FACTURA', fecha: '2026-09-05', neto: 592000000, iva: 124320000, estado: 'CONFIRMADO', distribuciones: [centro('Buenos Aires', '600000 · Zona sur', 392000000), centro('Mendoza', '800100 · Cuyo', 200000000)] },
  { ...obras, id: 1, numero: 'A 0009-00001801', tipo: 'FACTURA', fecha: '2026-09-02', neto: 247000000, iva: 51870000, estado: 'CONFIRMADO', distribuciones: [centro('Santa Fe', '750221 · Obras litoral', 247000000)] },
]
export const moneda = (centavos: number) => new Intl.NumberFormat('es-AR', {
  style: 'currency', currency: 'ARS', minimumFractionDigits: 2,
}).format(centavos === 0 ? 0 : centavos / 100)
export const fechaCorta = (fecha: string) => fecha.split('-').reverse().join('/')
export const signo = (comprobante: Comprobante) => comprobante.tipo === 'NOTA_CREDITO' ? -1 : 1
