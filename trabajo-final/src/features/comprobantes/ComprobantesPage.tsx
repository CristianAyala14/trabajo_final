import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { comprobantesDemo, estados, fechaCorta, moneda, signo, tipos } from './demo'
import type { Comprobante } from './demo'

function Icon({ name, size = 20 }: { name: 'document' | 'search' | 'arrow' | 'close' | 'filter' | 'layers' | 'calendar' | 'check' | 'building'; size?: number }) {
  const paths: Record<typeof name, ReactNode> = {
    document: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    filter: <><path d="M4 7h16M4 17h16" /><circle cx="9" cy="7" r="2" fill="currentColor" /><circle cx="15" cy="17" r="2" fill="currentColor" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 11h18" /></>,
    check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></>,
    building: <><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 7h1m4 0h1m-6 4h1m4 0h1m-5 10v-5h4v5" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export default function ComprobantesPage() {
  const [busqueda, setBusqueda] = useState('')
  const [tipo, setTipo] = useState('')
  const [estado, setEstado] = useState('')
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')
  const [fechasVisibles, setFechasVisibles] = useState(false)
  const [seleccionado, setSeleccionado] = useState<Comprobante | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const rangoInvalido = Boolean(desde && hasta && desde > hasta)
  const filtrados = comprobantesDemo.filter((c) =>
    !rangoInvalido && (!tipo || c.tipo === tipo) && (!estado || c.estado === estado) &&
    (!desde || c.fecha >= desde) && (!hasta || c.fecha <= hasta) &&
    normalize(`${c.numero} ${c.cliente} ${c.contrato} ${c.concepto}`).includes(normalize(busqueda.trim())),
  )
  const confirmados = filtrados.filter((c) => c.estado === 'CONFIRMADO')
  const neto = confirmados.reduce((s, c) => s + c.neto * signo(c), 0)
  const iva = confirmados.reduce((s, c) => s + c.iva * signo(c), 0)
  const hayFiltros = Boolean(busqueda || tipo || estado || desde || hasta)
  const totalDistribuido = seleccionado?.distribuciones.reduce((s, d) => s + d.neto, 0) ?? 0

  function limpiar() {
    setBusqueda(''); setTipo(''); setEstado(''); setDesde(''); setHasta('')
  }
  function abrirDetalle(comprobante: Comprobante) {
    setSeleccionado(comprobante)
    dialog.current?.showModal()
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#contenido">Ir al contenido</a>
      <aside className="sidebar" aria-label="Navegación principal">
        <div className="brand"><span className="brand-symbol">f<span>.</span></span><div>folio<span>GESTIÓN DE FACTURACIÓN</span></div></div>
        <div className="workspace"><span className="workspace-icon"><Icon name="building" /></span><div>Mi empresa<small>Espacio de trabajo</small></div></div>
        <p className="nav-label">ADMINISTRACIÓN</p>
        <nav><a className="nav-active" href="#contenido" aria-current="page"><Icon name="document" />Comprobantes<span className="nav-count">{comprobantesDemo.length}</span></a></nav>
        <div className="upcoming"><p className="nav-label">PRÓXIMAMENTE</p><span><Icon name="building" />Clientes y contratos</span><span><Icon name="calendar" />Períodos de servicio</span><span><Icon name="layers" />Reportes</span></div>
        <div className="sidebar-note"><span className="note-mark">↗</span><p>Todo en un mismo lugar.</p><small>Facturación y distribuciones, con una mirada más clara.</small></div>
        <div className="sidebar-bottom"><span className="status-dot" />Versión de diseño<span>01</span></div>
      </aside>

      <div className="main-area">
        <header className="topbar"><div className="breadcrumb">Administración<span>/</span><strong>Comprobantes</strong></div><span className="demo-badge"><span className="status-dot" />Datos de ejemplo</span></header>
        <main id="contenido" tabIndex={-1}>
          <div className="page-heading"><div><p className="eyebrow">CONTROL DE FACTURACIÓN</p><h1>Comprobantes<span>.</span></h1><p className="page-description">Consultá tus facturas, notas de crédito y notas de débito.</p></div><div className="heading-stamp"><Icon name="calendar" /><span>Vista de ejemplo<strong>Septiembre 2026</strong></span></div></div>

          <section className="metrics" aria-label="Resumen de comprobantes confirmados filtrados">
            <article className="metric metric-primary"><div className="metric-label">Neto confirmado<Icon name="document" size={19} /></div><p>{moneda(neto)}</p><small>Facturas + ND − NC del listado</small></article>
            <article className="metric"><div className="metric-label">IVA confirmado<Icon name="layers" size={19} /></div><p>{moneda(iva)}</p><small>IVA de los comprobantes confirmados</small></article>
            <article className="metric"><div className="metric-label">Comprobantes confirmados<Icon name="check" size={19} /></div><p>{confirmados.length.toString().padStart(2, '0')}<span> / {filtrados.length.toString().padStart(2, '0')}</span></p><small>Borradores y anulados no suman importes</small></article>
          </section>

          <section className="documents-panel" aria-labelledby="listado-titulo">
            <div className="panel-heading"><div><h2 id="listado-titulo">Registro de comprobantes</h2><p>Buscá una operación y consultá su distribución.</p></div><span className="currency-label">IMPORTES EN ARS</span></div>
            <div className="filters">
              <label className="search-field"><Icon name="search" /><span className="sr-only">Buscar por número, cliente, contrato o concepto</span><input type="search" placeholder="Buscar por número, cliente o contrato…" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} /></label>
              <label className="select-field"><span className="sr-only">Tipo de comprobante</span><select value={tipo} onChange={(e) => setTipo(e.target.value)}><option value="">Todos los tipos</option>{Object.entries(tipos).map(([value, label]) => <option key={value} value={value}>{label.nombre}</option>)}</select></label>
              <label className="select-field"><span className="sr-only">Estado del comprobante</span><select value={estado} onChange={(e) => setEstado(e.target.value)}><option value="">Todos los estados</option>{Object.entries(estados).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
              <button className={`filter-button ${fechasVisibles ? 'is-active' : ''}`} aria-expanded={fechasVisibles} aria-controls="filtro-fechas" onClick={() => setFechasVisibles(!fechasVisibles)}><Icon name="filter" size={17} />Fechas{(desde || hasta) && <span className="filter-dot" />}</button>
            </div>
            <div id="filtro-fechas" className="date-filters" hidden={!fechasVisibles}>
              <label>Emisión desde<input type="date" value={desde} aria-invalid={rangoInvalido} aria-describedby={rangoInvalido ? 'error-fechas' : undefined} onInput={(e) => setDesde(e.currentTarget.value)} /></label>
              <label>Emisión hasta<input type="date" value={hasta} aria-invalid={rangoInvalido} aria-describedby={rangoInvalido ? 'error-fechas' : undefined} onInput={(e) => setHasta(e.currentTarget.value)} /></label>
              {rangoInvalido && <p id="error-fechas" role="alert">La fecha final debe ser igual o posterior a la inicial.</p>}
            </div>
            {hayFiltros && <div className="active-filters"><span>Filtros aplicados{desde || hasta ? ` · Emisión: ${desde ? fechaCorta(desde) : 'sin inicio'} a ${hasta ? fechaCorta(hasta) : 'sin fin'}` : ''}</span><button onClick={limpiar}>Limpiar filtros <Icon name="close" size={14} /></button></div>}
            <div className="table-scroll" tabIndex={0} role="region" aria-label="Listado de comprobantes, desplazable horizontalmente">
              <table><caption className="sr-only">Comprobantes de ejemplo. Los importes de las notas de crédito se muestran negativos.</caption><thead><tr><th scope="col">Comprobante</th><th scope="col">Cliente / contrato</th><th scope="col">Emisión</th><th scope="col" className="amount">Neto</th><th scope="col">Estado</th><th scope="col"><span className="sr-only">Acciones</span></th></tr></thead>
                <tbody>{filtrados.map((c) => <tr key={c.id}><td><div className="document-cell"><span className={`type-icon ${c.tipo.toLowerCase()}`}>{tipos[c.tipo].sigla}</span><div><strong>{c.numero}</strong><small>{tipos[c.tipo].nombre}</small></div></div></td><td><span className="client-name">{c.cliente}</span><small>{c.contrato}</small></td><td className="date-cell">{fechaCorta(c.fecha)}</td><td className={`amount ${c.tipo === 'NOTA_CREDITO' ? 'credit-amount' : ''}`}>{moneda(c.neto * signo(c))}</td><td><span className={`badge ${c.estado.toLowerCase()}`}><span />{estados[c.estado]}</span></td><td><button className="detail-button" aria-label={`Ver detalle de ${tipos[c.tipo].nombre.toLowerCase()} ${c.numero}`} onClick={() => abrirDetalle(c)}><Icon name="arrow" size={18} /></button></td></tr>)}</tbody>
              </table>
            </div>
            {filtrados.length === 0 && <div className="empty-state"><Icon name="search" size={30} /><h3>{rangoInvalido ? 'Revisá el rango de fechas' : 'No encontramos comprobantes'}</h3><p>{rangoInvalido ? 'Corregí las fechas para consultar el listado.' : 'Probá con otro número, cliente o combinación de filtros.'}</p><button className="secondary-button" onClick={limpiar}>Restablecer filtros</button></div>}
            <footer className="table-footer"><span role="status" aria-live="polite">{filtrados.length} de {comprobantesDemo.length} comprobantes</span><span><span className="legend-credit">NC</span>Las notas de crédito restan del neto.</span></footer>
          </section>
          <p className="demo-note"><span className="status-dot" />Estás viendo datos ficticios para explorar el diseño. No se guardan cambios.</p>
          <footer className="page-footer"><span>folio<span className="brand-period">.</span></span><small>Una única fuente. Una mirada más clara.</small></footer>
        </main>
      </div>

      <dialog ref={dialog} className="detail-dialog" aria-labelledby="detalle-titulo" onClose={() => setSeleccionado(null)}>
        <div className="dialog-top"><span className="eyebrow">DETALLE DEL COMPROBANTE</span><button className="detail-button" aria-label="Cerrar detalle" onClick={() => dialog.current?.close()}><Icon name="close" /></button></div>
        {seleccionado && <>
          <div className="dialog-heading"><div><p>{tipos[seleccionado.tipo].nombre}</p><h2 id="detalle-titulo">{seleccionado.numero}</h2></div><span className={`badge ${seleccionado.estado.toLowerCase()}`}><span />{estados[seleccionado.estado]}</span></div>
          <dl className="document-info"><div><dt>Cliente</dt><dd>{seleccionado.cliente}</dd></div><div><dt>Contrato</dt><dd>{seleccionado.contrato}</dd></div><div><dt>Fecha de emisión</dt><dd>{fechaCorta(seleccionado.fecha)}</dd></div><div><dt>Período de servicio</dt><dd>{seleccionado.periodo}</dd></div><div><dt>Cuenta contable</dt><dd>{seleccionado.cuenta}</dd></div><div><dt>Concepto</dt><dd>{seleccionado.concepto}</dd></div>{seleccionado.origen && <div><dt>Factura de origen</dt><dd>{seleccionado.origen}</dd></div>}</dl>
          <div className="detail-totals"><div><small>Neto</small><strong>{moneda(seleccionado.neto * signo(seleccionado))}</strong></div><div><small>IVA</small><strong>{moneda(seleccionado.iva * signo(seleccionado))}</strong></div><div><small>Total</small><strong>{moneda((seleccionado.neto + seleccionado.iva) * signo(seleccionado))}</strong></div></div>
          <div className="distribution-heading"><h3>Distribución del neto</h3><span>{seleccionado.distribuciones.length} {seleccionado.distribuciones.length === 1 ? 'asignación' : 'asignaciones'}</span></div>
          <p className="distribution-description">Cada importe corresponde a una categoría fiscal y un centro de costo.</p>
          {seleccionado.distribuciones.length ? <div className="table-scroll" tabIndex={0} role="region" aria-label="Distribución del comprobante"><table className="distribution-table"><thead><tr><th scope="col">Categoría / provincia</th><th scope="col">Centro de costo</th><th scope="col" className="amount">Neto</th></tr></thead><tbody>{seleccionado.distribuciones.map((d) => <tr key={`${d.categoria}-${d.centro}`}><td>{d.categoria}</td><td>{d.centro}</td><td className="amount">{moneda(d.neto * signo(seleccionado))}</td></tr>)}</tbody></table></div> : <p className="pending-note">Este borrador todavía no tiene una distribución cargada.</p>}
          <div className={`distribution-check ${totalDistribuido !== seleccionado.neto ? 'pending' : ''}`}><span>{totalDistribuido === seleccionado.neto ? 'Distribución completa' : 'Pendiente de distribuir'}</span><strong>{moneda((seleccionado.neto - totalDistribuido) * signo(seleccionado))} de diferencia</strong></div>
          <p className="dialog-note">Datos de ejemplo · Consulta sin edición{seleccionado.tipo === 'NOTA_CREDITO' ? ' · La nota de crédito reduce los importes.' : ''}</p>
        </>}
      </dialog>
    </div>
  )
}
