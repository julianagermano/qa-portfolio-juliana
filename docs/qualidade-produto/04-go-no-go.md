# 04 — Go/No-Go (Decisão de Liberação Orientada a Produto)

## Gates obrigatórios (No-Go se falhar)
- Contract Gate (API) em endpoints críticos
- Smoke UI dos fluxos de valor (journeys críticos)
- Taxa de erro acima do limite (quando medido)
- Regressão crítica falhando por regra de negócio

## Gates condicionais (não bloqueiam automaticamente)
- UI regressão completa em ambiente instável (avaliar evidência)
- testes longos noturnos
- falhas externas (dependências indisponíveis) com health check comprovando

## Modelo de decisão
- Go: todos gates obrigatórios passaram
- Go com mitigação: falhas não críticas + plano de mitigação + evidência
- No-Go: falha em fluxo crítico, contrato quebrado ou risco alto sem mitigação

## Evidências mínimas
- link do pipeline
- relatório (HTML/JUnit)
- logs/traceId quando aplicável
