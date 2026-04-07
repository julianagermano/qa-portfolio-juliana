# SQL como Ferramenta de Apoio à Qualidade

SQL é utilizado por QA como instrumento de validação,
não como administração de banco.

Usos comuns:
- validar persistência de dados
- conferir estado após execução de fluxo
- verificar integridade e consistência
- apoiar investigação de defeitos

Exemplo genérico:
SELECT status, created_at
FROM pedidos
WHERE id = 123;