Projeto 5 — Automação de UI com Playwright
https://img.shields.io/badge/Tipo-Automação%20UI-purple?style=flat-square
https://img.shields.io/badge/Playwright-Framework-brightgreen?style=flat-square
https://img.shields.io/badge/Relatórios-HTML%20&%20TraceViewer-blue?style=flat-square
Este projeto demonstra automação UI end‑to‑end usando Playwright, com:

Testes rápidos e estáveis
Execução paralela
Suporte nativo a Chrome, Firefox e WebKit
Screenshots automáticos
Registros de trace (inspeção visual pós-execução)
Cenários BDD (opcional)
Arquitetura Page Object Model (POM)
Relatórios HTML gerados automaticamente


Tudo genérico e seguro: UI fictícia criada para fins de portfólio.


Estrutura
ui-auth-playwright/
├─ tests/
│  ├─ login.spec.js
│  └─ home.spec.js
├─ package.json
├─ playwright.config.js
├─ README.md
└─ .gitignore



Pré‑requisitos

Node.js 18+
Playwright instalado

Shellnpm init -ynpm install -D @playwright/testnpx playwright install``


npm init -y
npm install -D @playwright/test
npx playwright install

 Exemplo de Teste (login.spec.js)

const { test, expect } = require('@playwright/test');

test('Login válido - usuário vai para a home', async ({ page }) => {
  await page.goto('https://sua-app-ficticia.com/login');

  await page.fill('#username', 'usuario_teste');
  await page.fill('#password', 'senha_teste');

  await page.click('#login-btn');

  await expect(page).toHaveURL('https://sua-app-ficticia.com/home');
  await expect(page.locator('h1')).toHaveText('Bem-vindo(a)');
});

Como executar

npx playwright test

Executar com UI:

npx playwright test --headed

Gerar relatório:

npx playwright show-report

Relatórios
O Playwright gera automaticamente:

HTML Report
Trace Viewer (para inspecionar passo a passo o teste)
Screenshots
Vídeos (opcional)

Após rodar:

playwright-report/index.html

Boas práticas usadas

Page Object Model
Selectors estáveis
Comandos reutilizáveis
Cenários pequenos e confiáveis
Testes paralelos
Relatório automático
Execução configurável (headless/headed)


## 🖼️ Evidência – Playwright Report
./screenshots/relatorio-ui.png
<img width="1365" height="767" alt="image" src="https://github.com/user-attachments/assets/574c12e5-4029-4b7f-b92e-7adab257b3d0" />

Próximos passos

Integração com Pipeline (Projeto 3)
Testes híbridos (API + UI)
Massa dinâmica com CSV
Variáveis de ambiente (multi-ambiente)

Feito com 💛 por Juliana
