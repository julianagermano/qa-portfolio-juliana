# 🛠️ Playbook de Triagem de Falhas — QA Engineering

Este documento define um **playbook de triagem de falhas** para QA, com foco em **investigação técnica estruturada**, evitando achismos e reduzindo tempo de diagnóstico em pipelines, automações e ambientes produtivos.

A abordagem é **genérica, reutilizável e orientada a evidências**.

---

## 🎯 Objetivo

Permitir que QA consiga:

- identificar rapidamente a causa raiz de uma falha
- diferenciar falha de produto, automação ou ambiente
- registrar evidências técnicas claras
- comunicar problemas de forma objetiva com Dev e DevOps
- reduzir retrabalho e flakiness

---

## 🧠 Princípio Central

> **Toda falha deve ser classificável, rastreável e explicável.**

Se não é possível explicar a falha com evidência, a triagem está incompleta.

---

## 🧩 Tipos de Falha (Classificação Inicial)

Toda triagem começa com a **classificação da falha**.

### ✅ Falha de Produto
- regra de negócio quebrada
- comportamento funcional incorreto
- contrato de API violado
- evento não publicado ou processado corretamente

➡️ **Ação:** abrir bug

---

### ⚠️ Falha de Automação
- locator quebrado
- sincronização incorreta
- timeout inadequado
- massa de dados inválida
- teste não determinístico (flaky)

➡️ **Ação:** corrigir automação

---

### ⚙️ Falha de Ambiente / Infraestrutura
- ambiente fora do ar
- DNS indisponível
- dependência externa instável
- pod/serviço reiniciando
- mensageria indisponível

➡️ **Ação:** registrar incidente / pular execução controlada

---

## 🔍 Fluxo de Triagem (Passo a Passo)

### ✅ Passo 1 — Confirmar o contexto
Responder rapidamente:

- qual pipeline falhou?
- qual commit/version?
- qual ambiente?
- qual tipo de teste?

📌 **Sem contexto, não existe triagem.**

---

### ✅ Passo 2 — Verificar Health Check
Antes de olhar teste:

- ambiente respondeu?
- endpoint de saúde OK?
- mensageria acessível?

❌ Se Health Check falhou → **não é falha de produto**

---

### ✅ Passo 3 — Analisar saída da pipeline
Verificar:

- logs do job
- stack trace
- mensagens de erro
- tempo de execução
- etapa exata da falha

📌 Identificar se a falha é:
- setup
- execução
- teardown
- timeout

---

### ✅ Passo 4 — Validar evidências do teste

Dependendo da automação:

#### UI (Playwright)
- screenshot
- trace
- vídeo
- relatório HTML

#### API (Postman/Newman)
- relatório HTML
- JSON de execução
- payload de request/response

📌 **Falha sem evidência não é válida.**

---

### ✅ Passo 5 — Correlacionar com logs do sistema
Buscar nos logs:

- correlationId / requestId
- traceId
- messageId (mensageria)
- erro no consumer ou backend

Responder:
- a requisição chegou?
- o evento foi publicado?
- o consumer processou?
- houve retry ou DLQ?

---

### ✅ Passo 6 — Verificar efeitos colaterais
Validar:

- dados no banco
- status do recurso
- duplicidade de registros
- inconsistência de estado

📌 Isso diferencia erro funcional de erro superficial.

---

### ✅ Passo 7 — Classificar e decidir ação

| Tipo de Falha | Decisão |
|--------------|--------|
Produto | Abrir bug |
Automação | Ajustar teste |
Ambiente | Registrar incidente |
Intermitente | Monitorar / investigar flakiness |

---

## 🧪 Triagem por Tipo de Teste

### 🔹 Testes de API
Verificar:
- status HTTP
- payload
- contrato/schema
- logs do backend
- persistência no banco

---

### 🔹 Testes de UI
Verificar:
- sincronização (waits)
- estabilidade do elemento
- dependência de dados
- falha isolada vs repetida

---

### 🔹 Testes de Mensageria
Verificar:
- evento publicado?
- fila correta?
- consumer ativo?
- retry configurado?
- mensagem em DLQ?

---

## 📊 Evidências mínimas para registrar falha

Todo bug ou incidente deve conter:

- descrição objetiva
- ambiente
- data/hora
- evidências (logs, prints, relatórios)
- IDs de correlação
- impacto observado
- classificação da falha

---

## 🩺 Tratamento de Flakiness

Quando um teste falha e passa em retry:

- registrar ocorrência
- verificar padrão de repetição
- analisar logs e tempo
- classificar como flaky se recorrente

📌 **Flakiness não deve ser ignorada.**

---

## ⚠️ Antipadrões de Triagem

- “Rodou de novo e passou”
- “Deve ser o ambiente”
- “Não sei o que foi”
- “Ignorar falha sem evidência”
- “Abrir bug sem análise”

---

## ✅ Boas Práticas de QA na Triagem

- Sempre coletar evidência
- Comunicar com base em fatos
- Evitar achismo
- Documentar padrões de falha
- Revisar falhas recorrentes
- Integrar triagem com observabilidade

---

## 🧩 Conclusão

Um playbook de triagem bem definido:

- reduz tempo de investigação
- melhora comunicação com Dev/DevOps
- aumenta confiabilidade da automação
- fortalece o papel do QA como engenheiro de qualidade

Este documento serve como referência prática para triagem técnica em qualquer projeto.

---

✍️ Documento criado com foco em **QA Engineering, CI/CD e Qualidade Contínua**.
