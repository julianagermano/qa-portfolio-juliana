# 04 — Observabilidade como critério de Go/No-Go

Exemplos:
- taxa de erro acima do limite → No-Go
- p95 fora do SLO → Go com mitigação
- DLQ crescente → No-Go
- erro novo pós-release → rollback

Observabilidade complementa os testes,
não os substitui.