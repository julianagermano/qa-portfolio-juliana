# 06 — Release Playbook (Produto + Qualidade)

## Antes do deploy
- revisar mudanças por jornada
- validar gates obrigatórios
- confirmar health check
- checar métricas relevantes

## Durante/Após deploy
- monitorar taxa de erro e p95/p99
- validar jornada crítica (smoke)
- acompanhar DLQ/backlog (se houver)

## Em caso de falha
- classificar: produto vs ambiente vs automação
- usar correlationId/traceId
- registrar evidência (logs, report, screenshots)
- acionar rollback/mitigação conforme Go/No-Go
