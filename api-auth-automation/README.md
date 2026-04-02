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

## 📄 Testes de Contrato (QA‑first) — Contract Gate

Este projeto implementa **testes de contrato de API (JSON Schema)** como **Quality Gate** em CI/CD, garantindo que mudanças incompatíveis sejam detectadas antes do deploy.

### 📌 Onde ficam os contratos
Os contratos estão versionados em:
- `api-auth-automation/schemas/

Principais schemas:
- `login.response.200.schema.json`
- `login.response.401.schema.json`
- `error.response.default.schema.json`
- `me.response.200.schema.json`

### 🔄 Como os contratos são utilizados
Antes da execução dos testes, os schemas são sincronizados do Git para o environment do Postman por meio do script:

```bash
node tools/sync-schemas-to-env.js

Dessa forma, o Newman sempre valida os contratos atualizados e versionados no repositório.

▶ Execução local (mesmo padrão do CI)


cd api-auth-automation
npm ci
node tools/sync-schemas-to-env.js
npx newman run Auth.postman_collection.json \
  -e Auth_DummyJSON.postman_environment.json \
  -r "cli,htmlextra,junitfull" \
  --reporter-htmlextra-export reports/Resultado_API_Contrato.html \
  --reporter-junitfull-export reports/junit.xml


 Evidências em CI/CD
A pipeline executa os testes de contrato e publica:

Artifact contract-report com o relatório HTML (reports/*.html)
Resultados de teste (JUnit) exibidos na aba Tests do Azure DevOps

 Caso algum contrato seja quebrado, o Newman falha e o pipeline bloqueia a progressão, atuando como gate de qualidade.

---

## ✅ 4) Salvar o arquivo
No editor:
- **Ctrl + S**
- Feche o arquivo

---

## ✅ 5) Subir a documentação para o Git (passo a passo)

Agora vamos versionar isso.

### 5.1 Abrir PowerShell na raiz do repo
```powershell
cd C:\Users\jsgermano\Documents\GitHub\qa-portfolio-juliana

5.2 Adicionar o README ao commit
git add api-auth-automation/README.md

5.3 Conferir
git status

✅ Deve aparecer:
modified: api-auth-automation/README.md

5.4 Commitar
git commit -m "Documenta Contract Gate QA-first no projeto de API"

5.5 Enviar para o GitHub
git push

Pronto

---

<!-- validação do Contract Gate: mudança controlada -->


Feito com 💛 por Juliana  
Projeto desenvolvido para fins de aprendizado, portfólio e evolução em QA Engineering.

