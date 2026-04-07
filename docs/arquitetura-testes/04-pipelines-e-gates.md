# 04 — Pipelines e Quality Gates

A esteira de CI/CD é utilizada como mecanismo de controle de risco e suporte à decisão de liberação.

## Gates obrigatórios (No-Go se falhar)
- Contract tests de API em endpoints críticos
- Smoke UI das jornadas principais
- Health check do ambiente
- Erros críticos de regressão funcional

---

## Gates condicionais
- Regressão completa em ambiente instável
- Testes longos noturnos
- Dependências externas indisponíveis

---

## Modelo de decisão
- **Go:** todos os gates obrigatórios passaram
- **Go com mitigação:** falhas não críticas + plano de ação
- **No-Go:** falha em fluxo crítico sem mitigação

---

## Evidências mínimas
- link do pipeline
- relatório de testes (HTML/JUnit)
- logs ou traceId quando aplicável