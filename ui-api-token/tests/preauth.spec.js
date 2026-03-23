// ui-api-token/tests/preauth.spec.js
const { test, expect } = require('@playwright/test');

const LOCALSTORAGE_KEY = 'accessToken';
const COOKIE_NAME      = 'auth_token';

test.setTimeout(60_000);

// A) Header Authorization (offline): intercepta 1a navegação e verifica o header
test('A) Token via Authorization header global (offline)', async ({ browser }) => {
  const context = await browser.newContext({
    extraHTTPHeaders: { Authorization: 'Bearer demo-token' }
  });
  const page = await context.newPage();

  let capturedAuth = null;
  await page.route('**/*', async route => {
    const req = route.request();
    const headers = req.headers();
    capturedAuth = headers['authorization'] || headers['Authorization'];
    // responde localmente, sem sair para a internet
    await route.fulfill({ status: 200, body: '<html><body>ok</body></html>' });
  });

  await page.goto('https://offline.local'); // será interceptado
  expect(capturedAuth).toBeTruthy();
  expect(capturedAuth).toMatch(/Bearer\s+demo-token/i);
  await context.close();
});

// B) LocalStorage (offline)
test('B) Token pré-carregado no localStorage (offline)', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [LOCALSTORAGE_KEY, 'demo-token']);
  await page.setContent('<html><body><h1>offline</h1></body></html>');

  const stored = await page.evaluate(k => localStorage.getItem(k), LOCALSTORAGE_KEY);
  expect(stored).toBe('demo-token');
  await context.close();
});

// C) Cookie de sessão (offline)
test('C) Token como cookie (offline)', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const url = new URL('https://dummy.local/');
  await context.addCookies([{
    name: COOKIE_NAME,
    value: 'demo-token',
    domain: url.hostname,
    path: '/',
    httpOnly: false,
    secure: true
  }]);

  await page.setContent('<html><body><pre id="out"></pre></body></html>');
  const cookies = await context.cookies();
  const found = cookies.find(c => c.name === COOKIE_NAME && c.value === 'demo-token');
  expect(found).toBeTruthy();
  await context.close();
});
