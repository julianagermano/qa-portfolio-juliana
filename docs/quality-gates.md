# 🚦 Quality Gates — Estratégia de Qualidade em CI/CD

Este documento define a estratégia de **Quality Gates**, ou seja, os critérios objetivos que determinam **quando uma pipeline deve permitir ou bloquear a progressão do código** em ambientes de CI/CD.

A abordagem apresentada é **genérica, escalável e orientada a risco**, sendo aplicável a qualquer produto ou organização.

---

## 🎯 Objetivo dos Quality Gates

Garantir que:
- falhas reais de qualidade bloqueiem a entrega
- falhas externas (infraestrutura, ambiente) não gerem bloqueios indevidos
- a pipeline seja confiável, previsível e auditável
- decisões de liberação sejam técnicas, não subjetivas

---

## 🧠 Princípio Central

> **Nem toda falha deve bloquear a pipeline.  
> Mas toda falha relevante de qualidade deve ser visível.**

Quality Gates existem para **separar falhas de produto de falhas de contexto**.

---

## 🧩 Tipos de Falha

### ✅ Falhas que DEVEM bloquear

- Testes automatizados falhando por regra de negócio
- Quebra de contrato de API
- Falha em testes críticos de regressão
- Erros funcionais em fluxos de negócio
- Violação de critérios mínimos de qualidade

---

### ⚠️ Falhas que NÃO devem bloquear

- Ambiente indisponível
- Timeout de infraestrutura
- Dependência externa fora do ar
- Erros de setup temporários
- Falhas intermitentes já conhecidas e monitoradas

Esses casos devem:
- gerar alerta
- registrar evidência
- **não impedir o fluxo de entrega**

---

## 🧪 Quality Gates por Camada de Teste

### 🔹 Testes de API

**Gate obrigatório**

Bloqueia pipeline quando:
- testes funcionais falham
- contratos de API são violados
- status e payload não correspondem ao esperado

Não bloqueia quando:
- API externa indisponível (mock configurado)
- ambiente fora do ar (quando identificado via health check)

---

### 🔹 Testes de Mensageria

**Gate condicional**

Bloqueia pipeline quando:
- eventos não são publicados
- consumidores não processam mensagens válidas
- mensagens duplicadas geram efeitos colaterais
- DLQ cresce sem controle

Não bloqueia quando:
- mensageria indisponível temporariamente
- ambiente de mensageria não inicializa corretamente
- falha externa identificada e registrada

---

### 🔹 Testes de UI (End‑to‑End)

**Gate seletivo**

Bloqueia pipeline quando:
- smoke tests críticos falham
- fluxo principal de negócio está quebrado

Não bloqueia quando:
- testes de regressão completos falham em ambientes instáveis
- falhas cosméticas ou não críticas
- flakiness conhecida e controlada

---

## 🔄 Estratégia de Execução dos Gates

### Execução recomendada por tipo de pipeline

| Tipo de Pipeline | Quality Gate |
|------------------|-------------|
Pull Request (PR) | API + Smoke UI |
Main / Develop | API + Mensageria + Smoke UI |
Nightly | API + Mensageria + UI Regressão |
Release | Todos os gates obrigatórios |

---

## 🩺 Health Check como Gate Inicial

Antes de qualquer execução de testes E2E, a pipeline deve realizar um **Health Check** do ambiente.

Resultados possíveis:
- ✅ Ambiente OK → executar testes
- ⚠️ Ambiente indisponível → pular testes E2E de forma controlada

O Health Check evita:
- falso negativo
- pipelines quebradas
- desperdício de tempo

---

## 📊 Métricas de Qualidade Associadas

Quality Gates devem ser acompanhados por métricas:

- taxa de falha por tipo de teste
- flakiness de testes
- tempo médio de execução
- crescimento de DLQ
- cobertura de testes por camada

Essas métricas orientam evolução contínua da estratégia.

---

## ✅ Boas Práticas para Quality Gates

- Definir gates claros e documentados
- Evitar gates excessivos
- Separar falha de produto e falha de ambiente
- Manter execução previsível
- Registrar evidências mesmo quando não bloquear
- Revisar gates periodicamente

---

## ⚠️ Antipadrões Comuns

- Bloquear pipeline por qualquer falha
- Executar todos os testes em todo commit
- Tratar flakiness como erro de produto
- Usar UI como único gate
- Não documentar critérios de bloqueio

---

## 🧩 Exemplo de Decisão de Quality Gate

```text
Teste de API falhou → BLOQUEIA
Teste de UI falhou por timeout → NÃO BLOQUEIA
Mensageria com DLQ crescente → BLOQUEIA
Ambiente fora do ar → NÃO BLOQUEIA

Conclusão
Quality Gates são fundamentais para garantir qualidade com escala, evitando bloqueios indevidos e assegurando que apenas falhas relevantes impeçam a entrega.
Uma estratégia bem definida:

aumenta a confiança na pipeline
reduz retrabalho
melhora a relação entre QA, Dev e DevOps
posiciona a qualidade como parte do produto


✍️ Documento criado com foco em QA Engineering, CI/CD e Qualidade Contínua.
