# Data Quality Gate

O Data Quality Gate é um mecanismo de decisão da pipeline que valida
a integridade e consistência dos dados após a execução de fluxos críticos,
utilizando dados como insumo para decisão de release.

## Objetivo
Bloquear releases que deixem o sistema em estado de dados inválido,
reduzindo risco de incidentes em produção.

## Escopo
- Entidades críticas (ex: pedidos, clientes, pagamentos)
- Estados finais relevantes
- Jornadas de alto impacto no negócio

## Tipos de validação
- Persistência correta
- Integridade referencial
- Estado válido
- Não duplicidade
- Consistência pós-falha

## Critérios de decisão
- NO-GO: inconsistência crítica ou duplicidade
- GO COM MITIGAÇÃO: risco conhecido e controlado
- GO: dados consistentes

## Evidências
- Resultados de testes de API
- Validações de dados (SQL ou mock)
- Logs funcionais

## Output
Relatório claro com decisão objetiva para suporte à liberação.