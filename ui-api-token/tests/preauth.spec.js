const { test, expect } = require("@playwright/test");
const { getAuthTokens } = require("../src/auth.api");


- const TARGET_HEADER_CHECK = 'https://httpbin.org/headers';
- const TARGET_COOKIE_CHECK = 'https://httpbin.org/cookies';
+ const TARGET_HEADER_CHECK = 'https://postman-echo.com/headers';
+ const TARGET_COOKIE_CHECK = 'https://postman-echo.com/cookies';
const LOCALSTORAGE_KEY = "accessToken";
const COOKIE_NAME = "auth_token";

test.setTimeout(60_000);

test("A) Token via Authorization header global", async ({ browser }) => {
  const { accessToken } = await getAuthTokens();
  const context = await browser.newContext({
    extraHTTPHeaders: { Authorization: `Bearer ${accessToken}` }
  });
  const page = await context.newPage();
  await page.goto(TARGET_HEADER_CHECK, { waitUntil: "domcontentloaded" });
  const body = await page.locator("pre").innerText();
  expect(body).toMatch(/Authorization/i);
  expect(body).toMatch(/Bearer\s+[A-Za-z0-9\.\-_]+/);
  await context.close();
});

test("B) Token pré-carregado no localStorage (SPA)", async ({ browser }) => {
  const { accessToken } = await getAuthTokens();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [LOCALSTORAGE_KEY, accessToken]);
  await page.goto(TARGET_LOCALSTORAGE, { waitUntil: "domcontentloaded" });
  const stored = await page.evaluate((k) => localStorage.getItem(k), LOCALSTORAGE_KEY);
  expect(stored).toBe(accessToken);
  await context.close();
});

test("C) Token como cookie (sessão)", async ({ browser }) => {
  const { accessToken } = await getAuthTokens();
  const context = await browser.newContext();
  const url = new URL(TARGET_COOKIE_CHECK);
  await context.addCookies([{
    name: COOKIE_NAME,
    value: accessToken,
    domain: url.hostname,
    path: "/",
    httpOnly: false,
    secure: true
  }]);
  const page = await context.newPage();
  await page.goto(TARGET_COOKIE_CHECK, { waitUntil: "domcontentloaded" });
  const text = await page.locator("pre").innerText();
  expect(text).toMatch(new RegExp(`"${COOKIE_NAME}"\\s*:\\s*".+?"`));
  await context.close();
});
