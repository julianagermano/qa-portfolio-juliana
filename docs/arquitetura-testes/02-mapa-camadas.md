# 02 — Mapa de Camadas de Teste

A distribuição de testes segue uma abordagem prática, adaptada à realidade do produto.

## 1. Testes Unitários / Componentes
**Responsável:** Engenharia  
**Objetivo:** Garantir regras isoladas e comportamento interno.

- Executados no build
- Feedback rápido
- Não substituem testes de integração

---

## 2. Testes de API / Contrato
**Responsável:** QA  
**Objetivo:** Validar regras de negócio, contratos e integrações.

- Validação de schemas
- Status codes e erros padronizados
- Cenários positivos e negativos
- Base principal da regressão

---

## 3. Testes de Dados (SQL)
**Responsável:** QA  
**Objetivo:** Garantir consistência e integridade dos dados.

- Conferência de persistência
- Validação de estados
- Apoio a testes de integração e E2E

---

## 4. Testes UI End-to-End
**Responsável:** QA  
**Objetivo:** Validar jornadas críticas do usuário.

- Poucos testes
- Alto valor
- Executados como smoke e validação final

---

## 5. Testes Exploratórios
**Responsável:** QA / Produto  
**Objetivo:** Descobrir riscos não previstos.

- Orientados a risco
- Executados sob demanda
- Complementam automação