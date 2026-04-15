# Portfolio Projects
[![Build Status](https://dev.azure.com/SISTEMAS-DOTNET/QA/_apis/build/status%2Fjulianagermano.qa-portfolio-juliana?branchName=main)](https://dev.azure.com/SISTEMAS-DOTNET/QA/_build/latest?definitionId=2&branchName=main)

QA Engineer com foco em automação de testes, APIs, CI/CD e qualidade de software ponta a ponta.

Este repositório apresenta projetos práticos de automação de testes
(UI e API), integração contínua e estratégias de qualidade aplicadas
a cenários reais de produto.

---

## 🔍 What you will find here

- API Test Automation (Postman + Newman)
- UI Test Automation (Playwright)
- CI/CD pipelines for test execution
- Quality Gates and test strategy
- Documentation focused on real-world QA scenarios

## 📁 Projetos do Portfólio

### 🚀 Projeto 1 — Automação de API (Auth – Postman + Newman)

Automação de testes de API garantindo validação de contratos,
integridade de dados e confiabilidade das integrações.

**Principais características:**
- Testes funcionais de API
- Testes de contrato (JSON Schema + Ajv)
- Scripts dinâmicos no Postman
- Refresh de token automático
- Execução via Newman
- Relatórios HTML e JSON
- Estrutura preparada para CI/CD

📎 Projeto:  
[api-auth-automation](./api-auth-automation/)

---

### 🚀 Projeto 2 — UI Authentication Automation + CI/CD (Playwright)

Automação de testes end-to-end validando fluxos críticos do usuário
e reduzindo risco de falhas em produção.

**Principais características:**
- Automação UI com Playwright
- Navegação controlada por variáveis de ambiente
- Execução local para desenvolvimento
- Execução automática via pipeline (CI/CD)
- Health Check para validação de ambiente
- Execução condicional de testes (skip inteligente)
- Publicação de evidências e relatórios

**Objetivo do projeto:**
Demonstrar uma abordagem moderna de QA Engineering, onde a automação:
- não gera falsos negativos
- não bloqueia entregas por falhas externas
- escala de forma sustentável em pipelines

📎 Projeto:  
[ui-api-auth-playwright](./ui-api-auth-playwright/)

---

## ▶️ Como Executar os Testes

Integração dos testes automatizados ao pipeline CI/CD,
garantindo validação contínua a cada mudança de código,
redução de riscos em deploy e feedback rápido ao time.

### 1️⃣ Execução Local (Desenvolvimento / Aprendizado)

Utilize quando estiver:
- desenvolvendo ou ajustando testes
- validando cenários antes de subir para o repositório
- aprendendo a estrutura de automação

**Passo a passo:**
```bash
cd ui-api-token
npm install
npx playwright test
``

Para executar um teste específico:
npx playwright test tests/preauth.spec.js
A execução local é manual e usada apenas para desenvolvimento.

2️⃣ Execução Automática via Pipeline (CI/CD)
A execução oficial ocorre automaticamente via pipeline quando:

um commit é realizado no repositório
a pipeline é executada manualmente

Neste modo:

não é necessário executar comandos no terminal local
a pipeline prepara o ambiente
decide se os testes devem ser executados
publica relatórios e evidências


✅ Boas Práticas Adotadas

Execução manual apenas para desenvolvimento
Pipeline como fonte oficial de validação
Separação clara entre automação e CI/CD
Execução condicional baseada na disponibilidade do ambiente

Objetivo do Portfólio
Centralizar projetos que demonstrem:

Qualidade ponta a ponta
Automação de testes
Integração contínua
Testes de API e UI
Estruturas reutilizáveis
Boas práticas de QA Engineering

## 📚 Documentos de Estratégia de Qualidade

- 🧾 Governança de Contratos de API (Breaking vs Non‑breaking)  
  docs/governanca-contratos-api.md

Os documentos abaixo consolidam a abordagem de QA Engineering aplicada neste portfólio, cobrindo estratégia de testes, mensageria, CI/CD, observabilidade e governança de qualidade.

- 🧪 Estratégia de Testes (API x UI x Mensageria)  
  docs/estrategia-testes-api-ui-mensageria.md

- 📬 Estratégia de Testes com Mensageria  
  docs/estrategia-testes-mensageria.md

- 🚦 Quality Gates  
  docs/quality-gates.md

- 🔭 Observabilidade para QA  
  docs/observabilidade-para-qa.md

- 🛠️ Playbook de Triagem de Falhas  
  docs/playbook-triagem-falhas-qa.md

- 🐞 Template de Bug Report Técnico  
  docs/template-bug-report-tecnico.md

- 🚨 Template de Incidente (Post‑mortem)  
  docs/template-incidente-post-mortem-qa.md

Sobre mim

QA Engineer com foco em qualidade ponta a ponta,
automação de testes (API e UI) e integração contínua.

Atuo na criação de pipelines, estratégias e templates reutilizáveis
para escalar qualidade e reduzir riscos ao longo do ciclo de entrega.

Próximos projetos

Pipelines avançados em Azure DevOps
Testes híbridos (API + UI)
Estratégias de Smoke e Regressão
Testes com geração dinâmica de dados
