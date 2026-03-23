#  Projeto 6 — UI + API (Token Dinâmico com Playwright)

https://img.shields.io/badge/Tipo-UI%20%2B%20API-blueviolet?style=flat-square
https://img.shields.io/badge/Framework-Playwright-brightgreen?style=flat-square
https://img.shields.io/badge/Relat%C3%B3rio-HTML-success?style=flat-square
https://img.shields.io/badge/Portf%C3%B3lio-Gen%C3%A9rico%20e%20Seguro-00bcd4?style=flat-square

Automação de **UI** iniciando **já autenticada**, obtendo **token via API** (DummyJSON – pública) e demonstrando **três técnicas profissionais** de “pré‑autenticação”:

1. **Authorization Header global** (todas as requisições com `Bearer <token>`)  
2. **LocalStorage** (SPA lê o token na inicialização)  
3. **Cookie** (apps que mantêm sessão em cookie)

>  Projeto 100% genérico: **sem dados de empresa**, **sem endpoints internos** e **sem informação sensível**.

---

##  Estrutura
ui-api-token/
├─ package.json
├─ playwright.config.js
├─ .gitignore
├─ src/
│  └─ auth.api.js            # faz login via API e retorna { accessToken, refreshToken }
├─ tests/
│  └─ preauth.spec.js        # 3 cenários de pré-autenticação (header/localStorage/cookie)
└─ screenshots/
└─ relatorio-ui-token.png # evidência do relatório HTML


---

## 🧰 Pré‑requisitos

- **Node.js 18+**  
- **Playwright Test** instalado como devDependency do projeto

```bash
npm install -D @playwright/test
npx playwright install

Dica: o projeto usa CommonJS no playwright.config.js
(const { defineConfig } = require('@playwright/test'); + module.exports = defineConfig({...})).

Como a autenticação é obtida
Arquivo src/auth.api.js:

Realiza POST https://dummyjson.com/auth/login com as credenciais de demo:

username: emilys
password: emilyspass


Retorna { accessToken, refreshToken }
O accessToken é utilizado nas três técnicas de pré‑auth:

TécnicaOnde o token entraQuando aplicarHeaderAuthorization: Bearer <token> (contexto Playwright)Quando a API/edge valida todas as chamadas por headerLocalStoragelocalStorage.setItem('accessToken', token) antes do gotoSPAs (React/Vue/Angular) que leem token no bootCookiecontext.addCookies([...])Apps que usam sessão baseada em cookie (JWT/SessionId)

Testes (arquivo tests/preauth.spec.js)

A) Token via Authorization header global → valida em https://httpbin.org/headers se o header foi enviado
B) Token pré‑carregado no LocalStorage (SPA) → injeta antes do goto e confere com page.evaluate
C) Token como cookie (sessão) → seta cookie e valida em https://httpbin.org/cookies


Esses alvos (httpbin / example.com) tornam o projeto independente de uma UI proprietária.
Para usar na sua UI real, troque:

TARGET_URL por sua aplicação
LOCALSTORAGE_KEY pela chave que a UI lê
COOKIE_NAME pelo nome esperado pelo servidor

Como executar
No diretório ui-api-token/:
# instalar dependências (primeira vez)npm installnpx playwright install

# instalar dependências (primeira vez)
npm install
npx playwright install

# headless (rápido)
npx playwright test

# com navegador
npx playwright test --headed

# relatório HTML (modo servidor)
npx playwright show-report

# abrir o HTML direto (sem servidor/portas)
# recomendado para evitar erro de porta ocupada (EADDRINUSE)
start ./playwright-report/index.html

Se o show-report acusar EADDRINUSE 9323, feche o servidor anterior com Ctrl+C
ou suba em outra porta: npx playwright show-report --port=9333.

Evidência — Relatório HTML (Playwright)
./screenshots/relatorio-ui-token.png

Dica: para telas adicionais, salve no mesmo diretório e referencie no README.

Boas práticas aplicadas

Pré‑autenticação da UI via Header, LocalStorage e Cookie
Testes independentes de UI proprietária, com alvos públicos para prova de conceito
CommonJS no playwright.config.js (compatível sem alterar package.json)
Trace on-first-retry, screenshots e vídeos em falhas (configurável)
Relatório HTML versionável (playwright-report/)
Caminhos e exemplos genéricos, adequados a portfólio público

Como adaptar para uma UI real


Descubra como a sua UI autentica:

LocalStorage → ver chave em DevTools > Application > Local Storage
Cookie → ver nome/domínio em DevTools > Application > Cookies
Header → validados pelo backend/APIGW



Atualize no teste:

TARGET_URL, LOCALSTORAGE_KEY, COOKIE_NAME
As asserções finais (ex.: badge de usuário, dashboard, produtos etc.)



(Opcional) Crie fixtures para reaproveitar o token entre cenários.

Troubleshooting


Cannot find module '@playwright/test'
→ Rode npm install -D @playwright/test no diretório ui-api-token/.


defineConfig is not defined
→ Garanta CommonJS no config:

const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({ /* ... */ });

EADDRINUSE :9323 no show-report
→ Feche o anterior com Ctrl+C ou use --port=9333.
→ Alternativa infalível: start ./playwright-report/index.html.


Falha no login da API DummyJSON (rede/proxy)
→ Tente novamente; a API é pública e pode oscilar brevemente.
→ Em último caso, substitua o alvo por reqres.in ou simule token fixo (apenas para PoC).

Pipeline (opcional – Azure DevOps)

pool:
  vmImage: 'windows-latest'

variables:
  projectdir: 'ui-api-token'
  NPM_CACHE_FOLDER: '$(Pipeline.Workspace)/.npm'
  PLAYWRIGHT_BROWSERS_PATH: '$(Pipeline.Workspace)/.pw-browsers'

steps:
- checkout: self
  fetchDepth: 1

# (Opcional mas MUITO útil) Diagnóstico rápido
- powershell: |
    Write-Host "Build.SourcesDirectory = $(Build.SourcesDirectory)"
    Write-Host "Conteúdo da raiz:"
    Get-ChildItem "$(Build.SourcesDirectory)" -Force
    Write-Host "Conteúdo do projeto:"
    Get-ChildItem "$(Build.SourcesDirectory)/$(projectdir)" -Force
  displayName: 'Diagnóstico: estrutura do repo'

# ✅ Cache do npm (agora apontando para o lockfile da subpasta)
- task: Cache@2
  inputs:
    key: 'npm | "$(Agent.OS)" | $(Build.SourcesDirectory)/$(projectdir)/package-lock.json'
    restoreKeys: |
      npm | "$(Agent.OS)"
    path: '$(NPM_CACHE_FOLDER)'
  displayName: 'Cache do npm'

# ✅ Instalar dependências dentro da pasta certa
- powershell: |
    Set-Location "$(Build.SourcesDirectory)/$(projectdir)"
    npm config set cache "$(NPM_CACHE_FOLDER)" --global
    npm ci
  displayName: 'Instalar dependências (npm ci)'

# ✅ Cache dos browsers do Playwright
- task: Cache@2
  inputs:
    key: 'playwright | "$(Agent.OS)" | $(Build.SourcesDirectory)/$(projectdir)/package-lock.json'
    restoreKeys: |
      playwright | "$(Agent.OS)"
    path: '$(PLAYWRIGHT_BROWSERS_PATH)'
  displayName: 'Cache Playwright browsers'

# ✅ Instalar browsers do Playwright
- powershell: |
    Set-Location "$(Build.SourcesDirectory)/$(projectdir)"
    $env:PLAYWRIGHT_BROWSERS_PATH = "$(PLAYWRIGHT_BROWSERS_PATH)"
    npx playwright install
  displayName: 'Instalar browsers do Playwright'

# ✅ Rodar testes (gera HTML + JUnit)
- powershell: |
    Set-Location "$(Build.SourcesDirectory)/ui-api-token"
    npx playwright test --reporter=list,html,junit
  displayName: 'Executar testes Playwright'

# ✅ Publicar JUnit (mesmo se falhar)
- task: PublishTestResults@2
  condition: succeededOrFailed()
  inputs:
    testResultsFormat: 'JUnit'
    testResultsFiles: '**/junit*.xml'
    searchFolder: '$(Build.SourcesDirectory)/$(projectdir)'
    failTaskOnFailedTests: false
  displayName: 'Publicar resultados JUnit'

# ✅ Publicar relatório HTML do Playwright
- task: PublishPipelineArtifact@1
  condition: succeededOrFailed()
  inputs:
    targetPath: '$(Build.SourcesDirectory)/$(projectdir)/playwright-report'
    artifact: 'playwright-report'
  displayName: 'Publicar relatório HTML'

Depois de criar a pipeline, adicione o badge no topo deste README (igual o Projeto 3).

Este projeto comprova domínio de integração UI+API, cobrindo três estratégias de autenticação amplamente usadas em produção.
É 100% genérico, seguro e reutilizável — ideal para portfólio público e para iniciar automações reais.
Feito com 💛 por Juliana
