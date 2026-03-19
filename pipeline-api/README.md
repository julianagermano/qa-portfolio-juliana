📘 Projeto 3 — Pipeline CI/CD para Testes de API

[![Build Status](https://dev.azure.com/SISTEMAS-DOTNET/QA/_apis/build/status%2Fjulianagermano.qa-portfolio-juliana?branchName=main)](https://dev.azure.com/SISTEMAS-DOTNET/QA/_build/latest?definitionId=2&branchName=main)

Este projeto demonstra como executar testes de API automaticamente usando:

Azure DevOps (YAML Pipeline)
Newman
Relatórios HTML publicados como artefato
Critérios de falha automática
Integração com repositório GitHub
Execução contínua para garantir qualidade


📁 Estrutura do Projeto
pipeline-api/
├─ azure-pipelines.yml
└─ README.md


🎯 Objetivo
Automatizar a execução dos testes de API criados no Projeto 1, garantindo:

Execução em cada push/PR
Qualidade contínua
Relatórios gerados automaticamente
Artefato publicado no build
Falha do pipeline se houver erro nos testes


🚀 O que o pipeline faz?

Instala Node.js
Instala Newman
Executa a collection do Projeto 1
Usa o environment do Projeto 1
Gera relatório HTML e JSON
Salva artefatos
Configura melhoria para CI/CD


📄 Arquivo principal
azure-pipelines.yml
Será criado na próxima etapa.

🔗 Dependências
Este pipeline depende dos arquivos do projeto:

/api-auth-automation/Auth.postman_collection.json
/api-auth-automation/Auth_DummyJSON.postman_environment.json


Feito com 💛 por Juliana
