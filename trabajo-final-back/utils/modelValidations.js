// Validaciones locales; las reglas entre registros pertenecen a los servicios.
function textoObligatorio(value) {
  if (typeof value !== "string" || !value.trim()) throw new Error("El texto no puede estar vacío");
}

function importe(value) {
  // No convertir dinero a Number: admite hasta 18 enteros y 2 decimales.
  if (!/^(?:0|[1-9]\d{0,17})(?:\.\d{1,2})?$/.test(String(value))) {
    throw new Error("El importe debe ser no negativo y tener como máximo dos decimales");
  }
}

function importePositivo(value) {
  importe(value);
  if (!/[1-9]/.test(String(value))) throw new Error("El importe debe ser mayor que cero");
}

function alicuota(value) {
  if (value == null) return;
  if (!/^(?:0(?:\.\d{1,6})?|1(?:\.0{1,6})?)$/.test(String(value))) {
    throw new Error("La alícuota debe estar entre 0 y 1 y tener hasta seis decimales");
  }
}

function fechasOrdenadas() {
  if (this.fechaFin != null && (this.fechaInicio == null || this.fechaFin < this.fechaInicio)) {
    throw new Error("La fecha final requiere una fecha inicial y no puede ser anterior");
  }
}

module.exports = { textoObligatorio, importe, importePositivo, alicuota, fechasOrdenadas };
