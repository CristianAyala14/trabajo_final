const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

process.env.DB_URL = 'postgresql://test:test@127.0.0.1:1/test';
process.env.FRONTEND_URL = 'http://localhost:5173';
const { conn } = require('../db');
const app = require('../app');
after(() => conn.close());

test('disponibilidad y preflight del frontend', async () => {
  const original = conn.authenticate;
  const server = await new Promise(resolve => {
    const s = app.listen(0, '127.0.0.1', () => resolve(s));
  });
  const url = `http://127.0.0.1:${server.address().port}`;
  try {
    conn.authenticate = async () => {};
    let response = await fetch(url + '/health');
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { estado: 'ok', baseDeDatos: 'conectada' });
    conn.authenticate = async () => { throw new Error('dato confidencial'); };
    response = await fetch(url + '/health');
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { estado: 'no_disponible', baseDeDatos: 'desconectada' });
    response = await fetch(url + '/clientes', {
      method: 'OPTIONS',
      headers: { Origin: process.env.FRONTEND_URL, 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'content-type' },
    });
    assert.equal(response.status, 204);
    assert.equal(response.headers.get('access-control-allow-origin'), process.env.FRONTEND_URL);
    assert.match(response.headers.get('access-control-allow-methods'), /POST/);
  } finally {
    conn.authenticate = original;
    await new Promise(resolve => server.close(resolve));
  }
});

test('sin configuración falla con un mensaje útil', () => {
  const result = spawnSync(process.execPath, ['index.js'], {
    cwd: path.join(__dirname, '..'), encoding: 'utf8', env: { ...process.env, DB_URL: 'invalida' }, timeout: 15000,
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Configurá DB_URL/);
});

test('si PostgreSQL no responde no anuncia que la API está disponible', () => {
  const result = spawnSync(process.execPath, ['index.js'], {
    cwd: path.join(__dirname, '..'), encoding: 'utf8', env: process.env, timeout: 20000,
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /No se pudo iniciar la API/);
  assert.doesNotMatch(result.stdout, /API disponible/);
  assert.doesNotMatch(result.stderr, /postgresql:\/\//);
});
