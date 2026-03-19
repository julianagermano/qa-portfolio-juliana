#  Projeto 6 — UI + API (Token Dinâmico com Playwright)

Automação de **UI** iniciando **já autenticada**, obtendo o **token via API** (DummyJSON).  
Técnicas demonstradas:
- `Authorization` header global
- `localStorage` (SPA)
- `cookie` (apps com sessão)

>  100% genérico e seguro (API pública; nenhum dado interno).

## Estrutura
ui-api-token/
package.json
playwright.config.js
src/
auth.api.js
tests/
preauth.spec.js
.gitignore

##  Pré‑requisitos
- Node.js 18+
- Playwright
```bash
npm i -D @playwright/test
npx playwright install

Como rodar
npx playwright test          # headless
npx playwright test --headed # com navegador
npx playwright show-report   # relatório HTML

O que adaptar se tiver uma UI real
Trocar TARGET_URL, LOCALSTORAGE_KEY, COOKIE_NAME em tests/preauth.spec.js
Ajustar as asserções (ex.: badge de usuário, dashboard, etc.)

---

## 2) `ui-api-token/package.json`

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
