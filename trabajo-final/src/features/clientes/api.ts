export type Cliente = {
  id: string; nombre: string; razonSocial: string | null; identificacionFiscal: string | null
  telefono: string | null; domicilio: string | null; email: string | null
  provinciaId: string | null; activo: boolean
}
export type Provincia = { id: string; nombre: string }
export type DatosCliente = Omit<Cliente, 'id' | 'activo'>
const base = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

export async function solicitar<T>(ruta: string, options?: RequestInit): Promise<T> {
  let response: Response
  try {
    response = await fetch(base + ruta, { ...options, headers: { 'Content-Type': 'application/json', ...options?.headers } })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new Error('No se pudo conectar con el servidor. Intentá nuevamente.', { cause: error })
  }
  const data = await response.json().catch(() => null)
  if (!response.ok) throw new Error(data?.mensaje || 'No se pudo completar la operación.')
  if (data === null) throw new Error('El servidor devolvió una respuesta inesperada.')
  return data as T
}
