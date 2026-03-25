# Automação UI – Playwright + CI/CD

Este projeto contém uma automação de testes end‑to‑end (E2E) de interface, desenvolvida com **Playwright** e integrada a uma **pipeline de CI/CD**, com foco em qualidade contínua, resiliência e decisões técnicas de execução.

O projeto foi desenhado para ser **genérico e reutilizável**, podendo ser adaptado a qualquer sistema web.

---

## 🎯 Objetivo do Projeto

Demonstrar uma abordagem moderna de QA Engineering, onde:

- Automação não gera falsos negativos
- Falhas de ambiente não quebram a pipeline
- Execução é controlada e previsível
- Qualidade é tratada como parte do sistema

---

## 🏗️ Estrutura do Projeto

```text
ui-api-token/
│
├─ tests/                   # Testes automatizados (Playwright)
│   ├─ preauth.spec.js
│   ├─ login.spec.js
│   └─ smoke.spec.js
│
├─ playwright.config.js     # Configuração do Playwright
├─ package.json
├─ package-lock.json
└─ README.md

Estratégia de Testes

Testes E2E orientados a fluxo de negócio
Navegação controlada por variáveis de ambiente
Execução idempotente (testes independentes)
Testes preparados para execução local e em CI/CD

A navegação da aplicação utiliza variáveis de ambiente:

await page.goto(process.env.BASE_URL);

Isso permite reutilizar os mesmos testes em diferentes ambientes sem alteração de código.

Como Executar os Testes
Os testes podem ser executados de duas formas: localmente ou via pipeline.

Execução Local (Desenvolvimento / Aprendizado)
Utilize este modo quando estiver:

desenvolvendo ou ajustando testes
validando cenários antes de subir para o repositório
depurando falhas

Passo a passo

Acesse a pasta do projeto:

cd ui-api-token

Instale as dependências (quando necessário):

npm install

Execute todos os testes:

npx playwright test

Ou execute um teste específico:

npx playwright test tests/preauth.spec.js

A execução local é manual e utilizada apenas para desenvolvimento.

Execução Automática via Pipeline (CI/CD)
A execução oficial dos testes ocorre automaticamente via pipeline quando:

um commit é realizado no repositório
a pipeline é executada manualmente

Neste modo:

não é necessário executar comandos localmente
a pipeline prepara o ambiente
decide se os testes devem ser executados
publica relatórios e evidências

Health Check e Execução Condicional
Antes de executar os testes E2E, a pipeline realiza um Health Check para validar a disponibilidade do ambiente.
Com base nesse resultado, a pipeline define se os testes devem ou não ser executados:

 Ambiente disponível → testes são executados
 Ambiente indisponível → testes são pulados de forma controlada

Essa abordagem evita:

falsos erros de automação
pipelines quebradas por falha externa
bloqueio indevido de entregas

Evidências e Relatórios
Quando executados, os testes geram:

Relatório HTML do Playwright
Evidências técnicas de execução
Resultados estruturados (JUnit), quando aplicável

Quando os testes são pulados por decisão da pipeline, a ausência de relatórios é tratada como comportamento esperado, não erro.

Boas Práticas Aplicadas

Separação clara entre automação e pipeline
Execução local apenas para desenvolvimento
Pipeline como fonte oficial de validação
Execução condicional baseada na disponibilidade do ambiente
Código desacoplado de ambiente específico

Conclusão
Este projeto demonstra uma automação de UI preparada para cenários reais de CI/CD, onde qualidade, estabilidade e tomada de decisão técnica são prioridades.
A estrutura permite evolução contínua, inclusão de novos testes e adaptação a diferentes contextos de execução.

