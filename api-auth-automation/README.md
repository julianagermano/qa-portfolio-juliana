# 🚀 Automação de API – Auth (Postman + Newman)

Este projeto demonstra uma automação completa de testes de API usando:

- Postman
- Testes funcionais
- Validação de contrato (JSON Schema + Ajv)
- Geração de relatório HTML/JSON com Newman
- Execução via `run-tests.bat`
- Estrutura escalável e reutilizável para projetos reais e CI/CD

---

## 📁 Estrutura do Projeto

api-auth-automation/
├─ Auth.postman_collection.json
├─ Auth_DummyJSON.postman_environment.json
├─ run-tests.bat
├─ data/
│  └─ usuarios.csv
└─ schemas/
├─ me.schema.json
├─ login.schema.json
└─ refresh.schema.json

## ▶ Como executar os testes (Execução Local)
### 💡 Execução via script (Windows)
Execute o arquivo:
```bash
run-tests.bat
newman run "Auth.postman_collection.json" -e "Auth_DummyJSON.postman_environment.json" -r "cli,html" --reporter-html-export "Resultado.html


### 💡 Execução manual via Newman
newman run "Auth.postman_collection.json" \
-e "Auth_DummyJSON.postman_environment.json" \
-r "cli,html" \
--reporter-html-export "Resultado.html"
---

## 🔍 Funcionalidades implementadas

- Login automático
- Refresh token automático
- Requisição autenticada /auth/me
- Testes de status, conteúdo e tipo
- Validação de contrato (JSON Schema)
- Execução via Newman
- Relatórios HTML e JSON
- Pipeline Azure DevOps (opcional)

---

## 📄 JSON Schemas

Os contratos ficam na pasta `/schemas`:

- `me.schema.json`
- `login.schema.json`
- `refresh.schema.json`

---

## 📦 Massa de dados

A pasta `/data/usuarios.csv` pode ser usada para testes iterativos via Newman.

---

## 🧪 Relatório de Testes

Após rodar:

run-tests.bat

você verá arquivos como:

- `Resultado_YYYY-MM-DD_HHMMSS.html`
- `Resultado_YYYY-MM-DD_HHMMSS.json`

---

## 📄 Testes de Contrato (QA-first) — Contract Gate

Este projeto valida contratos de API (schemas) como **Quality Gate** em CI/CD.

### Onde ficam os contratos (schemas)
Os contratos estão versionados em:
- `api-auth-automation/schemas/`

Exemplos:
- `login.response.200.schema.json`
- `login.response.401.schema.json`
- `error.response.default.schema.json`
- `me.response.200.schema.json`

### Como os schemas são usados
Antes de executar o Newman, os schemas são sincronizados para o environment do Postman:

```bash
node tools/sync-schemas-to-env.js

---

## 📌 Próximos passos

- Adicionar pipeline do Azure DevOps (CI/CD)
- Criar massa de testes negativa/positiva com CSV
- Expandir para UI (Selenium/Playwright)
- Criar template padrão multi-ambiente

---


Feito com 💛 por Juliana  
Projeto desenvolvido para fins de aprendizado, portfólio e evolução em QA Engineering.

