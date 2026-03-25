# 🚀 Projeto 4 — API + CSV (Iterações com Newman)

![Tipo](https://img.shields.io/badge/Tipo-Automação%20API-blue?style=flat-square)
![Runner](https://img.shields.io/badge/Newman-CLI-orange?style=flat-square)
![Relatório](https://img.shields.io/badge/Relatório-HTML%20%2F%20JSON-green?style=flat-square)

Este projeto demonstra como utilizar **massa de dados em CSV** para realizar múltiplas iterações com o **Newman**, validando cenários positivos e negativos com base no campo `expectedStatus`.

Relatórios completos em **HTML** e **JSON** são gerados ao final da execução.

> 🔒 Projeto totalmente genérico e seguro.  
> API utilizada: **DummyJSON (pública)**.

---

## 📁 Estrutura do Projeto

```text
qa-portfolio-juliana/
├─ api-auth-automation/
│  ├─ Auth.postman_collection.json
│  ├─ Auth_DummyJSON.postman_environment.json
│  └─ data/
│     └─ usuarios.csv
└─ api-auth-iterations/
   └─ README.md

### Pré-requisitos

Node.js 18+
Newman instalado globalmente:

Reporters HTML (recomendado):
  npm install -g newman-reporter-html newman-reporter-htmlextra

### Massa de Dados (CSV)
Arquivo utilizado:
Arquivo: api-auth-automation/data/usuarios.csv

username,password,expectedStatus,case
emilys,emilyspass,200,login_valido
emilys,wrongpass,401,senha_incorreta
user123,abc123,401,usuario_inexistente
,anypass,400,username_vazio
john.doe,,400,password_vazio

### Body do login no Postman deve ser:

{
  "username": "{{username}}",
  "password": "{{password}}"
}

### Script de validação por iteração (Login → Tests)
const expected = Number(pm.iterationData().get("expectedStatus"));
const got = pm.response.code;

pm.test(`Status esperado (${expected}) vs recebido (${got})`, function () {
    pm.expect(got).to.eql(expected);
});

if (got === 200) {
    let data = pm.response.json();
    pm.test("Resposta contém tokens", function () {
        pm.expect(data).to.have.property("accessToken");
        pm.expect(data).to.have.property("refreshToken");
    });
} else {
    let err = {};
    try { err = pm.response.json(); } catch(e) {}
    pm.test("Resposta de erro possui mensagem", function () {
        pm.expect(err).to.have.property("message");
    });
}

---

## ▶️ Como Executar os Testes (PowerShell / Newman)

Este projeto utiliza o **Newman CLI** para executar a collection do Postman com massa de dados em CSV.

---

### ✅ Execução simples (CLI)

```powershell
newman run ".\api-auth-automation\Auth.postman_collection.json" `
  -e ".\api-auth-automation\Auth_DummyJSON.postman_environment.json" `
  --iteration-data ".\api-auth-automation\data\usuarios.csv"

Conclusão
Este projeto demonstra domínio em:

Automação de API
Testes orientados a dados (DDT)
Newman CLI
Relatórios HTML avançados
Scripts dinâmicos no Postman
Ele se integra naturalmente aos demais projetos do portfólio.

newman run ".\api-auth-automation\Auth.postman_collection.json" `
  -e ".\api-auth-automation\Auth_DummyJSON.postman_environment.json" `
  -r "cli,htmlextra" `
  --iteration-data ".\api-auth-automation\data\usuarios.csv" `
  --reporter-htmlextra-export "Resultado_csv.html"

newman run ".\api-auth-automation\Auth.postman_collection.json" `
  -e ".\api-auth-automation\Auth_DummyJSON.postman_environment.json" `
  -r "cli,html,json" `
  --iteration-data ".\api-auth-automation\data\usuarios.csv" `
  --reporter-html-export "Resultado_csv.html" `
  --reporter-json-export "Resultado_csv.json"

Feito com 💛 por Juliana
