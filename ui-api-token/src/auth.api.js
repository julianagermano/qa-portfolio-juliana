// src/auth.api.js
const { request } = require('@playwright/test');

/**
 * Faz login na DummyJSON e retorna { accessToken, refreshToken }.
 * API pública de demonstração: https://dummyjson.com/docs/auth
 */
async function getAuthTokens(username = 'emilys', password = 'emilyspass') {
  const api = await request.newContext();
  const resp = await api.post('https://dummyjson.com/auth/login', {
    data: { username, password },
    headers: { 'Content-Type': 'application/json' }
  });

  if (!resp.ok()) {
    throw new Error(`Falha no login API: ${resp.status()} - ${await resp.text()}`);
  }
  const json = await resp.json();
  return { accessToken: json.accessToken, refreshToken: json.refreshToken };
}

module.exports = { getAuthTokens };
``
