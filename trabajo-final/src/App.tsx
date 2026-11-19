import { useSyncExternalStore } from 'react'
import ComprobantesPage from './features/comprobantes/ComprobantesPage'
import ClientesPage from './features/clientes/ClientesPage'
import './App.css'

const subscribe = (callback: () => void) => {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}
export default function App() {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash)
  return hash === '#clientes' || hash === '#clientes-contenido' ? <ClientesPage /> : <ComprobantesPage />
}
