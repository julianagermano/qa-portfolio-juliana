@ -0,0 +1,36 @@
# 🚀 Projeto 4 — API + CSV (Iterações com Newman)

Este projeto demonstra como executar **a mesma collection** várias vezes usando **massa CSV**:
- Casos positivos e negativos
- Status esperado por linha
- Relatórios HTML/JSON consolidados

## 📁 Estrutura mínima

api-auth-iterations/
└─ README.md
api-auth-automation/
├─ Auth.postman_collection.json
├─ Auth_DummyJSON.postman_environment.json
└─ data/
└─ usuarios.csv


## ▶ Como rodar (PowerShell)

```powershell
newman run "api-auth-automation\Auth.postman_collection.json" `
  -e "api-auth-automation\Auth_DummyJSON.postman_environment.json" `
  -r "cli,json,html" `
  --iteration-data "api-auth-automation\data\usuarios.csv" `
  --reporter-json-export "Resultado_csv.json" `
  --reporter-html-export "Resultado_csv.html"
O relatório HTML/JSON consolida todas as iterações do CSV.

🧪 Validações sugeridas

expectedStatus do CSV vs status real da resposta
200 → tokens presentes
Não‑200 → mensagem de erro consistente (genérica)

Feito com 💛 por Juliana