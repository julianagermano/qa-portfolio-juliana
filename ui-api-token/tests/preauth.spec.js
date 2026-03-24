// ui-api-token/tests/preauth.spec.js
// Testes offline: sem internet, validam header Authorization, localStorage e cookie.
const { test, expect } = require('@playwright/test');

const LOCALSTORAGE_KEY = 'accessToken';
const COOKIE_NAME      = 'auth_token';

test.setTimeout(60_000);

// A) Header Authorization (offline) — intercepta a navegação e valida o header
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
    // Responde localmente (sem rede)
    await route.fulfill({ status: 200, body: '<html><body>ok</body></html>' });
  });

  test('Token pré-carregado no localStorage (Offline)', async ({ browser }) => {
  const context = await browser.newContext();

  // Injeta o token ANTES de qualquer página carregar
  await context.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, process.env.API_TOKEN);

  const page = await context.newPage();

  // Navega online para garantir origin válido e carregar app
  await page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded' });

  // Agora sim corta a rede
  await context.setOffline(true);

  // valida offline
  await page.reload({ waitUntil: 'domcontentloaded' });

  // asserts...
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

  console.log('URL atual antes do localStorage:', page.url());
  await page.screenshot({ path: 'debug-before-localstorage.png', fullPage: true });

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
