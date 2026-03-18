📘 Plano de Teste – Projeto Auth (API)
📌 1. Introdução
Este documento descreve a estratégia de testes aplicada ao projeto Auth, contemplando autenticação, refresh token e consulta autenticada.
O objetivo é definir critérios, abrangência, responsabilidades e abordagem para garantir a qualidade funcional e técnica da solução.

📌 2. Escopo
2.1 Funcionalidades cobertas

Autenticação via Login
Renovação de token via Refresh
Acesso autenticado via /auth/me
Validação de contrato (JSON Schema)
Negativos: credenciais incorretas, campos ausentes
Persistência e atualização de tokens
Scripts e variáveis de ambiente

2.2 Fora de escopo

UI
Banco de dados
Segurança avançada
Performance/Carga
Infraestrutura


📌 3. Critérios de Aceite

100% dos endpoints retornam códigos esperados
Funções críticas possuem testes positivos e negativos
Contratos validados com JSON Schema
Nenhum erro em testes automáticos (Newman)
Token atualizado corretamente


📌 4. Critérios de Entrada

Ambiente funcional
Collection e Environment configurados
Schemas validados
Massa CSV disponível

📌 5. Critérios de Saída

0 falhas em testes funcionais
0 falhas em contrato
Relatório HTML/JSON gerado
Checklist concluído


📌 6. Abordagem de Teste

Funcional (positivo e negativo)
Contrato (Ajv + JSON Schema)
Massa de dados (CSV)
Scripts dinâmicos Postman
Execução automatizada via Newman
Relatório HTML/JSON
Pipeline configurável no ADO


📌 7. Tipos de Teste

Teste funcional
Teste negativo
Teste de contrato
Teste de fluxo
Teste de integração simples (Login → Refresh → Me)


📌 8. Riscos






























RiscoImpactoMitigaçãoToken expira rápidoAltoAutomatizar RefreshMudança no contrato da APIAltoUsar JSON SchemaErro silencioso na APIMédioTestes negativosMassa inválidaBaixoCSV validado

📌 9. Evidências

Relatórios HTML
Logs do Newman
JSONs de resposta
Prints dos testes no Postman (opcional)


📌 10. Ferramentas Utilizadas

Postman
Newman
JSON Schema / Ajv
GitHub
CSV Data Files
PowerShell


📌 11. Responsabilidades

QA: planejamento, execução, automação, validação
DEV: correções, versionamento, contrato
PO: critérios de aceite
Time: garantia da qualidade contínua


📌 12. Conclusão
Este plano de teste assegura que o fluxo de autenticação e autorização seja validado de forma consistente, automatizada e rastreável, seguindo as melhores práticas de QA.

Feito com 💛 por Juliana
