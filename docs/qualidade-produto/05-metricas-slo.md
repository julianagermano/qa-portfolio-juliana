# 05 — Métricas e SLOs por Jornada (SLI/SLO)

## Métricas recomendadas
- Disponibilidade por endpoint/jornada
- Latência p95/p99 (API e UI)
- Taxa de erro 4xx/5xx
- Backlog/DLQ (mensageria)
- Flakiness de testes (automação)

## Exemplo de SLO (ajuste por produto)
| Jornada | SLI | SLO |
|---|---|---|
| Login | p95 API /login | < 500ms |
| Login | erro 5xx | < 0.5% |
| Criar pedido | sucesso 2xx | > 99% |
| Status | tempo evento→consumo | < 5s |

## Uso em qualidade
SLO é insumo de Go/No-Go e de melhoria contínua.
