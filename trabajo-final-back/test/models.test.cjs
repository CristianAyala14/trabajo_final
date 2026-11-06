const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
process.env.DB_URL = 'postgresql://test:test@127.0.0.1:1/test';
const db = require('../db');
const { conn, Comprobante, CategoriaFiscal, DistribucionComprobante, Contrato, PeriodoServicio } = db;
after(() => conn.close());

const factura = { tipo: 'FACTURA', numero: 'A 0001-00000001', fechaEmision: '2026-11-01', contratoId: '1', periodoServicioId: '1', cuentaContableId: '1', importeNeto: '100.00', importeIva: '21.00' };

test('los campos y tablas del ORM coinciden con el diccionario publicado', () => {
  const doc = fs.readFileSync(path.join(__dirname, '../../docs/base-de-datos.md'), 'utf8').replace(/\r\n/g, '\n');
  const tables = Object.values(conn.models);
  assert.equal(tables.length, 9);
  let count = 0;
  let foreignKeys = 0;
  for (const model of tables) {
    const section = doc.split(`## ${model.tableName}\n`)[1]?.split('\n## ')[0];
    assert.ok(section, model.tableName);
    const columns = [...section.matchAll(/^\| ([a-z_]+) \|/gm)].map(m => m[1]).sort();
    const attrs = Object.values(model.rawAttributes);
    assert.deepEqual(attrs.map(a => a.field).sort(), columns, model.tableName);
    count += attrs.length;
    for (const attr of attrs.filter(a => a.references)) {
      foreignKeys++;
      assert.equal(attr.onDelete, 'RESTRICT');
    }
  }
  assert.equal(count, 54);
  assert.equal(foreignKeys, 11);
});

test('rechaza notas sin origen o motivo y documentos con valores inválidos', async () => {
  await Comprobante.build(factura).validate();
  for (const changes of [
    { tipo: 'OTRO' }, { estado: 'OTRO' }, { numero: '  ' },
    { importeNeto: '-1.00' }, { importeIva: null }, { importeNeto: '1.001' },
    { tipo: 'NOTA_CREDITO' },
    { tipo: 'NOTA_DEBITO', facturaOrigenId: '1', descripcion: ' ' },
    { facturaOrigenId: '1' }, { estado: 'CONFIRMADO', importeNeto: '0.00' },
    { id: '1', tipo: 'NOTA_CREDITO', facturaOrigenId: '1', descripcion: 'Ajuste' },
  ]) await assert.rejects(Comprobante.build({ ...factura, ...changes }).validate());
  await Comprobante.build({ ...factura, tipo: 'NOTA_CREDITO', facturaOrigenId: '2', descripcion: 'Ajuste' }).validate();
  // El límite documentado se valida sin redondear mediante Number.
  await Comprobante.build({ ...factura, importeNeto: '999999999999999999.99' }).validate();
});

test('valida fechas, provincia imponible, alícuota y distribución positiva', async () => {
  await assert.rejects(Contrato.build({ clienteId: '1', numero: 'C1', fechaFin: '2026-11-01' }).validate());
  await assert.rejects(PeriodoServicio.build({ nombre: 'Noviembre', fechaInicio: '2026-11-30', fechaFin: '2026-11-01' }).validate());
  await assert.rejects(CategoriaFiscal.build({ nombre: 'Imponible' }).validate());
  await CategoriaFiscal.build({ nombre: 'Global', imponible: false, alicuota: null }).validate();
  await CategoriaFiscal.build({ nombre: 'Provincial', provinciaId: '1', alicuota: '0.050000' }).validate();
  for (const alicuota of ['-0.01', '1.01', '0.1234567']) {
    await assert.rejects(CategoriaFiscal.build({ nombre: 'Provincial', provinciaId: '1', alicuota }).validate());
  }
  await assert.rejects(DistribucionComprobante.build({ comprobanteId: '1', categoriaFiscalId: '1', centroCostoId: '1', importeNeto: '0.00' }).validate());
});

test('el total generado se lee pero no se envía al insertar o actualizar', async () => {
  const query = conn.getQueryInterface();
  const originalInsert = query.insert;
  const originalUpdate = query.update;
  const originalBulkInsert = query.bulkInsert;
  try {
    query.insert = async (instance, table, values, options) => {
      assert.equal(Object.hasOwn(values, 'importe_total'), false);
      assert.equal(options.fields.includes('importeTotal'), false);
      instance.setDataValue('id', '1');
      instance.setDataValue('importeTotal', '121.00');
      instance.isNewRecord = false;
      return [instance, 1];
    };
    const doc = await Comprobante.create(factura);
    assert.equal(doc.importeTotal, '121.00');
    assert.throws(() => doc.set('importeTotal', '1.00'), /calculado/);
    query.update = async (instance, table, values) => {
      assert.equal(Object.hasOwn(values, 'importe_total'), false);
      return [instance, 1];
    };
    await doc.update({ descripcion: 'Detalle' });
    query.bulkInsert = async (table, rows) => {
      assert.ok(rows.every(row => !Object.hasOwn(row, 'importe_total')));
      return [];
    };
    await Comprobante.bulkCreate([factura], { validate: true });
  } finally {
    query.insert = originalInsert;
    query.update = originalUpdate;
    query.bulkInsert = originalBulkInsert;
  }
});

test('los listados de entidades sin activo no filtran por una columna inexistente', async () => {
  for (const [name, method] of [['Provincia', 'listarProvincias'], ['CategoriaFiscal', 'listarCategoriasFiscales'], ['Comprobante', 'listar']]) {
    const model = db[name];
    const original = model.findAll;
    try {
      model.findAll = async options => { assert.equal(options.where?.activo, undefined); return []; };
      await require('../services/' + name)[method]();
    } finally { model.findAll = original; }
  }
});
