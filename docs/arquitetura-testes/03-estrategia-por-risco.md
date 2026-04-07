# 03 — Estratégia de Testes Baseada em Risco

A priorização dos testes é definida com base em **impacto no negócio** e **probabilidade de falha**.

## Classificação de risco
- **Alto:** bloqueia uso, gera perda financeira ou impacto reputacional
- **Médio:** afeta parte do fluxo ou gera retrabalho
- **Baixo:** impacto limitado ou facilmente reversível

---

## Estratégia por nível de risco

### Risco Alto
- Testes de API obrigatórios
- Smoke UI obrigatório
- Gate bloqueante no pipeline
- Monitoramento pós-release

### Risco Médio
- Testes de API
- Regressão seletiva
- Avaliação de contexto para Go/No-Go

### Risco Baixo
- Validação manual ou exploratória
- Não bloqueia pipeline

---

## Princípio
Nem todo risco deve ser automatizado em UI.
A automação deve existir onde **reduz risco real**, não onde apenas aumenta cobertura.