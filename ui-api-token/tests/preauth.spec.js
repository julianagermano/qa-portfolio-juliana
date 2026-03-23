const { test, expect } = require('@playwright/test');

const TARGET_HEADER_CHECK  = 'https://postman-echo.com/headers';
const TARGET_COOKIE_CHECK  = 'https://postman-echo.com/cookies';
const TARGET_LOCALSTORAGE  = 'https://example.com/';

const LOCALSTORAGE_KEY = 'accessToken';
const COOKIE_NAME      = 'auth_token';

test.setTimeout(60_000);

test('A) Token via Authorization header global', async ({ browser }) => {
  const context = await browser.newContext({
    extraHTTPHeaders: { Authorization: 'Bearer demo-token' }
  });
  const page = await context.newPage();
  await page.goto(TARGET_HEADER_CHECK, { waitUntil: 'domcontentloaded' });
  const text = await page.locator('pre').innerText();
  expect(text).toMatch(/Authorization/i);
  expect(text).toMatch(/Bearer\s+demo-token/i);
  await context.close();
});

test('B) Token pré-carregado no localStorage (SPA)', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [LOCALSTORAGE_KEY, 'demo-token']);
  await page.goto(TARGET_LOCALSTORAGE, { waitUntil: 'domcontentloaded' });
  const stored = await page.evaluate(k => localStorage.getItem(k), LOCALSTORAGE_KEY);
  expect(stored).toBe('demo-token');
  await context.close();
});

test('C) Token como cookie (sessão)', async ({ browser }) => {
  const context = await browser.newContext();
  const url = new URL(TARGET_COOKIE_CHECK);
  await context.addCookies([{
    name: COOKIE_NAME,
    value: 'demo-token',
    domain: url.hostname,
    path: '/',
    httpOnly: false,
    secure: true
  }]);
  const page = await context.newPage();
  await page.goto(TARGET_COOKIE_CHECK, { waitUntil: 'domcontentloaded' });
  const text = await page.locator('pre').innerText();
  expect(text).toMatch(/"auth_token"\s*:\s*"demo-token"/);
  await context.close();
});
