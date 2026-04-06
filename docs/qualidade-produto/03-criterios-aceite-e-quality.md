# 03 — Critérios de Aceite (Produto) e Critérios Técnicos de Qualidade

## Critérios de aceite (produto)
- descrevem comportamento esperado do usuário
- são verificáveis (pass/fail)
- evitam ambiguidade

Exemplo:
- "Ao finalizar login, o usuário deve acessar a área autenticada em até 2s."

## Critérios técnicos (engenharia)
- contratos: schemas, status codes, erros padronizados
- integridade de dados: consistência no banco / idempotência
- performance: p95/p99 por endpoint/jornada
- resiliência: retries, DLQ, timeouts
- observabilidade: correlationId/traceId

## Padrão recomendado
Para cada story/feature:
1) critérios de aceite
2) cenários (positivos/negativos)
3) evidências esperadas
4) gates aplicáveis (API/UI/contrato/performance)
