# Playbook — Teste Flakey

## Identificação
Teste falha sem mudança de código.

## Ações
- Marcar como flakey
- Isolar causa (ambiente, dados, sincronização)
- Ajustar teste ou remover temporariamente do gate

## Regra
Teste flakey NÃO pode bloquear release sem evidência.