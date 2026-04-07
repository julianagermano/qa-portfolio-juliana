# Riscos Comuns em Dados e Mitigações de Qualidade

## Riscos em bancos relacionais
- registros sem relacionamento válido
- transações parcialmente persistidas
- concorrência gerando dados inválidos

Mitigações:
- testes de integração
- validação de rollback
- testes concorrentes

## Riscos em bancos não relacionais
- documentos inconsistentes
- duplicidade de dados
- consistência eventual não tratada

Mitigações:
- testes de idempotência
- validação pós-processamento
- observabilidade aplicada aos dados