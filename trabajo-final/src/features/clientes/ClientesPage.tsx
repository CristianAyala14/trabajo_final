import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { solicitar } from './api'
import type { Cliente, DatosCliente, Provincia } from './api'
import './clientes.css'

const mensaje = (error: unknown) => error instanceof Error ? error.message : 'No se pudo completar la operación.'
const normalizar = (valor: string) => valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
const campos = [
  ['nombre', 'Nombre', 200], ['razonSocial', 'Razón social', 200],
  ['identificacionFiscal', 'Identificación fiscal', 30], ['email', 'Correo electrónico', 254],
  ['telefono', 'Teléfono', 40], ['domicilio', 'Domicilio', undefined],
] as const

function Formulario({ cliente, cerrar, guardar, ocupado }: {
  cliente: Cliente | null; cerrar: () => void; guardar: (datos: DatosCliente) => Promise<void>; ocupado: boolean
}) {
  const [provincias, setProvincias] = useState<Provincia[]>([])
  const [errorProvincias, setErrorProvincias] = useState('')
  const [cargandoProvincias, setCargandoProvincias] = useState(true)
  const [intento, setIntento] = useState(0)
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    solicitar<Provincia[]>('/provincias', { signal: controller.signal }).then(setProvincias)
      .catch(e => { if (!controller.signal.aborted) setErrorProvincias(mensaje(e)) })
      .finally(() => { if (!controller.signal.aborted) setCargandoProvincias(false) })
    return () => controller.abort()
  }, [intento])
  async function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const datos = Object.fromEntries([...campos.map(([key]) => key), 'provinciaId'].map(key => [key, String(form.get(key) || '').trim() || null])) as DatosCliente
    if (!datos.nombre) { setError('El nombre es obligatorio.'); return }
    // Si el catálogo no está disponible se conserva la provincia existente.
    if (cargandoProvincias || errorProvincias) datos.provinciaId = cliente?.provinciaId ?? null
    setError('')
    try { await guardar(datos) } catch (e) { setError(mensaje(e)) }
  }
  return <form onSubmit={enviar}>
    <div className="clientes-modal-heading"><h2 id="cliente-titulo">{cliente ? 'Editar cliente' : 'Nuevo cliente'}</h2><button type="button" onClick={cerrar} disabled={ocupado} aria-label="Cerrar formulario">×</button></div>
    <p className="clientes-ayuda">Solo el nombre es obligatorio.</p>
    {error && <p className="clientes-error" role="alert">{error}</p>}
    <fieldset disabled={ocupado} className="clientes-campos">
      {campos.map(([key, label, max]) => <label key={key}>{label}{key === 'nombre' ? ' *' : ''}
        <input name={key} type={key === 'email' ? 'email' : key === 'telefono' ? 'tel' : 'text'} required={key === 'nombre'} maxLength={max} defaultValue={cliente?.[key] ?? ''} autoFocus={key === 'nombre'} />
      </label>)}
      <label>Provincia<select name="provinciaId" defaultValue={cliente?.provinciaId ?? ''} disabled={cargandoProvincias || Boolean(errorProvincias)}>
        <option value="">Sin especificar</option>
        {cliente?.provinciaId && !provincias.some(p => String(p.id) === String(cliente.provinciaId)) && <option value={cliente.provinciaId}>Provincia actual</option>}
        {provincias.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
      </select></label>
    </fieldset>
    {cargandoProvincias && <p className="clientes-ayuda" role="status">Cargando provincias…</p>}
    {errorProvincias && <div className="clientes-error" role="alert">No se pudo cargar el listado de provincias. Se conservará la provincia actual.
      <button type="button" disabled={ocupado} onClick={() => { setErrorProvincias(''); setCargandoProvincias(true); setIntento(n => n + 1) }}>Reintentar</button>
    </div>}
    <div className="clientes-modal-actions"><button type="button" onClick={cerrar} disabled={ocupado}>Cancelar</button><button className="clientes-primary" disabled={ocupado} type="submit">{ocupado ? 'Guardando…' : 'Guardar cliente'}</button></div>
  </form>
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)
  const [busqueda, setBusqueda] = useState('')
  const [aviso, setAviso] = useState('')
  const [editor, setEditor] = useState<{ cliente: Cliente | null } | null>(null)
  const [baja, setBaja] = useState<Cliente | null>(null)
  const [errorBaja, setErrorBaja] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const guardando = useRef(false)
  const modal = useRef<HTMLDialogElement>(null)
  const confirmar = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const controller = new AbortController()
    solicitar<Cliente[]>('/clientes', { signal: controller.signal }).then(setClientes)
      .catch(e => { if (!controller.signal.aborted) setError(mensaje(e)) })
      .finally(() => { if (!controller.signal.aborted) setCargando(false) })
    return () => controller.abort()
  }, [intento])

  async function guardar(datos: DatosCliente) {
    if (guardando.current) return
    guardando.current = true
    setOcupado(true)
    try {
      const cliente = editor?.cliente
      const actualizado = await solicitar<Cliente>(cliente ? '/clientes/' + cliente.id : '/clientes', { method: cliente ? 'PUT' : 'POST', body: JSON.stringify(datos) })
      setClientes(prev => cliente ? prev.map(c => c.id === cliente.id ? actualizado : c) : [...prev, actualizado])
      setAviso(cliente ? 'Cliente actualizado.' : 'Cliente registrado.')
      modal.current?.close()
    } finally { guardando.current = false; setOcupado(false) }
  }

  async function desactivar() {
    if (!baja || guardando.current) return
    guardando.current = true
    setOcupado(true)
    setErrorBaja('')
    try {
      await solicitar('/clientes/' + baja.id, { method: 'DELETE' })
      setClientes(prev => prev.filter(c => c.id !== baja.id))
      setAviso('Cliente desactivado. Sus datos y contratos se conservan.')
      confirmar.current?.close()
    } catch (e) { setErrorBaja(mensaje(e)) }
    finally { guardando.current = false; setOcupado(false) }
  }

  const filtrados = clientes.filter(c => normalizar([c.nombre, c.razonSocial, c.identificacionFiscal].join(' ')).includes(normalizar(busqueda.trim())))
  function abrir(cliente: Cliente | null) { setEditor({ cliente }); setAviso(''); modal.current?.showModal() }
  return <div className="app-shell clientes-page">
    <a className="skip-link" href="#clientes-contenido">Ir al contenido</a>
    <aside className="sidebar" aria-label="Navegación principal">
      <div className="brand">folio.</div>
      <nav><a href="#comprobantes">Comprobantes</a><a href="#clientes" className="nav-active" aria-current="page">Clientes</a></nav>
    </aside>
    <div className="main-area">
      <header className="topbar"><div className="breadcrumb">Administración <span>/</span><strong>Clientes</strong></div></header>
      <main id="clientes-contenido" tabIndex={-1}>
        <div className="clientes-heading"><div><h1>Clientes</h1><p>Datos de contacto y gestión de clientes.</p></div><button className="clientes-primary" onClick={() => abrir(null)} disabled={cargando || Boolean(error)}>Nuevo cliente</button></div>
        {aviso && <p className="clientes-aviso" role="status">{aviso}</p>}
        <section className="clientes-panel" aria-label="Listado de clientes">
          <div className="clientes-toolbar"><label><span className="sr-only">Buscar por nombre o identificación fiscal</span><input type="search" placeholder="Buscar nombre o identificación fiscal" value={busqueda} onChange={e => setBusqueda(e.target.value)} /></label>{!cargando && !error && <span>{filtrados.length} {filtrados.length === 1 ? 'cliente activo' : 'clientes activos'}</span>}</div>
          {cargando ? <p className="clientes-empty" role="status">Cargando clientes…</p> : error ? <div className="clientes-empty" role="alert"><p>{error}</p><button onClick={() => { setError(''); setCargando(true); setIntento(n => n + 1) }}>Reintentar</button></div> : filtrados.length ? <div className="table-scroll" tabIndex={0} role="region" aria-label="Tabla de clientes">
            <table><thead><tr><th>Cliente</th><th>Identificación fiscal</th><th>Contacto</th><th><span className="sr-only">Acciones</span></th></tr></thead><tbody>
              {filtrados.map(c => <tr key={c.id}><td><strong>{c.nombre}</strong>{c.razonSocial && c.razonSocial !== c.nombre && <small>{c.razonSocial}</small>}</td><td>{c.identificacionFiscal || '—'}</td><td>{c.email || '—'}{c.telefono && <small>{c.telefono}</small>}</td><td><div className="clientes-row-actions"><button aria-label={'Editar ' + c.nombre} onClick={() => abrir(c)}>Editar</button><button className="clientes-danger-link" aria-label={'Desactivar ' + c.nombre} onClick={() => { setBaja(c); setErrorBaja(''); confirmar.current?.showModal() }}>Desactivar</button></div></td></tr>)}
            </tbody></table>
          </div> : <div className="clientes-empty"><p>{busqueda ? 'No hay clientes que coincidan con la búsqueda.' : 'Todavía no hay clientes activos.'}</p>{busqueda ? <button onClick={() => setBusqueda('')}>Limpiar búsqueda</button> : <button onClick={() => abrir(null)}>Registrar el primer cliente</button>}</div>}
        </section>
      </main>
    </div>
    <dialog ref={modal} className="clientes-modal" aria-labelledby="cliente-titulo" onClose={() => setEditor(null)} onCancel={e => { if (guardando.current) e.preventDefault() }}>
      {editor && <Formulario cliente={editor.cliente} guardar={guardar} cerrar={() => modal.current?.close()} ocupado={ocupado} />}
    </dialog>
    <dialog ref={confirmar} className="clientes-modal clientes-confirmar" aria-labelledby="baja-titulo" onClose={() => setBaja(null)} onCancel={e => { if (guardando.current) e.preventDefault() }}>
      {baja && <><h2 id="baja-titulo">Desactivar cliente</h2><p><strong>{baja.nombre}</strong> dejará de aparecer en el listado de activos. Sus datos y contratos se conservarán.</p>{errorBaja && <p className="clientes-error" role="alert">{errorBaja}</p>}<div className="clientes-modal-actions"><button disabled={ocupado} onClick={() => confirmar.current?.close()}>Cancelar</button><button className="clientes-danger" disabled={ocupado} onClick={desactivar}>{ocupado ? 'Desactivando…' : 'Desactivar cliente'}</button></div></>}
    </dialog>
  </div>
}
