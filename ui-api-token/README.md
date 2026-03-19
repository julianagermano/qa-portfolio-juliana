# Projeto 6 — UI + API (Token Dinâmico com Playwright)

Automação de **UI** iniciando **já autenticada**, obtendo o **token via API** (DummyJSON).  
Técnicas demonstradas:
- `Authorization` header global
- `localStorage` (SPA)
- `cookie` (apps com sessão)

> 100% genérico e seguro. API pública; nenhum dado interno.

## Estrutura

ui-api-token/
package.json
playwright.config.js
src/
auth.api.js
tests/
preauth.spec.js
.gitignore

## Pré-requisitos
- Node.js 18+
- Playwright
```bash
npm i -D @playwright/test
npx playwright install

## Como rodar

npx playwright test
npx playwright test --headed   # com navegador
npx playwright show-report     # abrir relatório

## Adapte estes itens à sua UI

TARGET_URL: URL da sua aplicação
LOCALSTORAGE_KEY: chave que sua UI lê (ex.: accessToken)
COOKIE_NAME: nome do cookie (se usar cookie)

### 2) `ui-api-token/package.json`

```json
{
  "name": "ui-api-token",
  "version": "1.0.0",
  "description": "Projeto 6 - UI + API Token (Playwright)",
  "scripts": {
    "test": "npx playwright test",
    "test:ui": "npx playwright test --headed",
    "report": "npx playwright show-report"
  },
  "devDependencies": {
    "@playwright/test": "^1.44.0"
  }
}

3) ui-api-token/.gitignore

node_modules/
playwright-report/
test-results/
*.log

4) ui-api-token/playwright.config.js (CommonJS, estável)

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60_000,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 30_000
  }
});

API: pegar o token (DummyJSON)
5) ui-api-token/src/auth.api.js

// src/auth.api.js
const { request } = require('@playwright/test');

/**
 * Faz login na DummyJSON e retorna { accessToken, refreshToken }
 * https://dummyjson.com/docs/auth
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
  // Ex.: { accessToken, refreshToken, ... }
  return { accessToken: json.accessToken, refreshToken: json.refreshToken };
}

module.exports = { getAuthTokens };

UI já logada: 3 técnicas (escolha a que combina com sua app)

Defina um alvo genérico para teste (você pode usar sua própria UI depois). Aqui usamos placeholders.


TARGET_URL — sua UI (ex.: https://sua-spa-exemplo.netlify.app/)
LOCALSTORAGE_KEY — chave que sua UI lê (ex.: accessToken)
COOKIE_NAME — nome do cookie (ex.: auth_token)

6) ui-api-token/tests/preauth.spec.js

// tests/preauth.spec.js
const { test, expect } = require('@playwright/test');
const { getAuthTokens } = require('../src/auth.api');

// Substitua pelos valores da sua app:
const TARGET_URL = 'https://example.com/';            // ← URL da UI
const LOCALSTORAGE_KEY = 'accessToken';               // ← chave que sua SPA lê
const COOKIE_NAME = 'auth_token';                     // ← nome do cookie, se usar

test.setTimeout(60_000);

test('A) Token via Authorization header global', async ({ browser }) => {
  const { accessToken } = await getAuthTokens();

  const context = await browser.newContext({
    extraHTTPHeaders: {
      // Todas as requisições HTTP da UI carregarão este header
      Authorization: `Bearer ${accessToken}`
    }
  });

  const page = await context.newPage();
  await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });

  // TODO: adapte para um seletor que indique "usuário autenticado" na sua UI
  // await expect(page.locator('[data-test="user-badge"]')).toBeVisible();

  await context.close();
});


test('B) Token pré-carregado no localStorage (SPA)', async ({ browser }) => {
  const { accessToken } = await getAuthTokens();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Injeta o token antes de a aplicação iniciar
  await page.addInitScript(([key, value]) => {
    // roda no contexto do navegador
    localStorage.setItem(key, value);
  }, [LOCALSTORAGE_KEY, accessToken]);

  await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });

  // TODO: adapte a asserção
  // await expect(page.locator('.menu-usuario')).toContainText('Bem-vindo');

  await context.close();
});


test('C) Token como cookie (apps com sessão ao invés de header/localStorage)', async ({ browser }) => {
  const { accessToken } = await getAuthTokens();

  const context = await browser.newContext();
  const page = await context.newPage();

  // Seta cookie para o domínio alvo (ajuste o domain)
  const url = new URL(TARGET_URL);
  await context.addCookies([{
    name: COOKIE_NAME,
    value: accessToken,
    domain: url.hostname,   // ex.: example.com
    path: '/',
    httpOnly: false,        // ajuste conforme sua app
    secure: true
  }]);

  await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });

  // TODO: adapte a asserção
  // await expect(page.locator('[data-test="dashboard"]')).toBeVisible();

  await context.close();
});

Como escolher a técnica certa?

header: sua API/edge lê o Authorization nas chamadas.
localStorage: SPA (React/Vue/Angular) que lê o token do localStorage ao boot.
cookie: apps que guardam sessão em cookie (JWT/SessionId).

Rodar local

cd "C:\Users\jsgermano\Documents\GitHub\qa-portfolio-juliana\ui-api-token"
npm install
npx playwright install

# headless
npx playwright test

# navegador visível
npx playwright test --headed

# relatório HTML
npx playwright show-report

Dicas de adaptação à sua UI real

Descubra como sua UI autentica (header / localStorage / cookie).
Abra sua app, pressione F12 → Application (ou Storage):

Local Storage: veja a chave que guarda o token.
Cookies: veja o cookie e o domain.


Ajuste LOCALSTORAGE_KEY, COOKIE_NAME e TARGET_URL no teste.
Se a UI precisa renovar token, você pode repetir o fluxo ou interceptar 401 e re‑logar via API.

# Job: UI + API Token (Playwright)
- task: NodeTool@0
  inputs:
    versionSpec: '20.x'
  displayName: 'Node.js 20 (Projeto 6)'

- script: |
    cd $(Build.SourcesDirectory)/ui-api-token
    npm ci || npm install
    npx playwright install --with-deps
    npx playwright test
  displayName: 'Playwright - UI já autenticada (token via API)'

- task: PublishBuildArtifacts@1
  inputs:
    PathtoPublish: '$(Build.SourcesDirectory)/ui-api-token/playwright-report'
    ArtifactName: 'playwright-report-ui-token'
    publishLocation: 'Container'
  displayName: 'Publicar relatório UI+API'

Opcional: crie badge, publique o relatório como artifact e linke no README do Projeto 6.
