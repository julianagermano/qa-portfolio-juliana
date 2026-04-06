# 02 — Registro de Riscos do Produto (Impacto x Probabilidade)

## Escalas
Impacto: Baixo / Médio / Alto
Probabilidade: Baixo / Médio / Alto
Detectabilidade: Alta (pega no CI) / Média / Baixa (só em produção)

## Riscos por jornada (exemplo)
| Jornada | Risco | Impacto | Probabilidade | Detectabilidade | Mitigação |
|---|---|---|---|---|---|
| Login | indisponibilidade / 5xx | Alto | Médio | Alta | contract gate + smoke UI + monitoramento |
| Criar pedido | regra de negócio incorreta | Alto | Médio | Média | testes API + dados + validação DB |
| Status | inconsistência assíncrona | Médio/Alto | Médio | Baixa | mensageria + tracing + DLQ |
| Cancelamento | estado inválido | Alto | Baixo/Médio | Média | cenários negativos + idempotência |

## Observação
Riscos com impacto alto e detectabilidade baixa devem receber prioridade máxima de testes e observabilidade.
