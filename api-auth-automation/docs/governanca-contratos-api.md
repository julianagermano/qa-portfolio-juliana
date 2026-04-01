# 🧾 Governança de Contratos de API (QA‑first) — Breaking vs Non‑breaking

Este documento define regras e boas práticas para manter **contratos de API** estáveis e compatíveis, evitando que mudanças quebrem consumidores (UI, integrações, serviços).

A governança é **genérica e reutilizável** — pode ser aplicada em qualquer projeto.

---

## 🎯 Objetivo

Garantir que:
- contratos (schemas/OpenAPI) sejam **fonte da verdade**
- mudanças incompatíveis sejam detectadas **antes do deploy**
- PRs tenham critérios claros de aprovação
- a pipeline atue como **Quality Gate** para regressões de contrato

---

## 📌 Definição de Contrato

Contrato é o acordo formal entre **Provider** (API) e **Consumers** (UI/serviços) sobre:
- endpoints/métodos
- status codes
- formato do payload (campos, tipos, obrigatoriedade)
- estrutura de erros

🔒 Contrato **não** substitui testes funcionais. Ele protege **compatibilidade**.

---

## 🧱 Fontes de Contrato

Prioridade recomendada:
1) **OpenAPI/Swagger** (quando disponível)  
2) **JSON Schemas por endpoint** (sucesso e erro)  
3) Exemplos versionados (quando não há spec formal)

📌 Regra: contrato sempre versionado no Git.

---

## 🚫 Breaking Change (quebra contrato) — BLOQUEIA

Considera-se **breaking** (deve falhar gate/pipeline e exigir alinhamento):

### ✅ Estrutura de resposta (Response)
- Remover campo **obrigatório** (`required`)
- Renomear campo (ex.: `refreshToken` → `refresh_token`)
- Alterar tipo (string → number, object → array)
- Alterar formato de data/enum de forma incompatível
- Mudar a hierarquia do JSON (ex.: `data.user.id` → `user.id`)

### ✅ Status codes
- Alterar status esperado sem compatibilidade (ex.: 200 → 201/204)
- Alterar erro sem padronização (ex.: 401 antes, agora 400, sem acordo)

### ✅ Erros
- Remover `message` (ou campo mínimo padrão)
- Retornar body de erro com estrutura inconsistente (quebra UI e integrações)

### ✅ Contrato de autenticação
- Mudar formato de token (ex.: renomear campo `accessToken`)
- Alterar obrigatoriedade de headers sem compatibilidade

---

## ✅ Non‑breaking Change (evolução segura) — PERMITIDO

Considera-se **não breaking** (permitido, desde que mantenha compatibilidade):

- Adicionar campos **novos** em response  
  ✅ recomendado manter `additionalProperties: true` quando possível
- Adicionar campos **opcionais** (sem entrar em `required`)
- Adicionar novos endpoints
- Adicionar novos valores em enum **quando consumers toleram**
- Melhorar mensagens de erro mantendo estrutura mínima

---

## 🧪 Estratégia de Contrato (QA‑first)

### Contratos mínimos recomendados por endpoint
- **Sucesso (2xx)** → schema específico do endpoint (ex.: `login.response.200`)
- **Erro (4xx/5xx)** → schema padrão reutilizável (ex.: `error.response.default`)

### Recomendação prática
- Rígido no essencial (campos críticos)
- Flexível no evolutivo (campos extras permitidos)

---

## 🚦 Quality Gate (CI/CD)

A pipeline deve executar contratos como **gate**:

- Se contrato quebrar → **falha a pipeline**
- Se ambiente indisponível → decisão controlada (health check / skip), com evidência

Evidências mínimas:
- relatório HTML
- JUnit (para aba Tests)
- logs do job

---

## ✅ Checklist de Pull Request (PR)

Antes de aprovar um PR que altera API:

- [ ] Mudou payload de response?
- [ ] Atualizou schema correspondente?
- [ ] Mudou status code esperado?
- [ ] Ajustou contrato de erro (se aplicável)?
- [ ] Avaliou se é breaking vs non‑breaking?
- [ ] Contract Gate passou no CI?
- [ ] Atualizou documentação/OpenAPI (se existir)?
- [ ] Comunicou consumidores impactados (UI/serviços)?

📌 Se for breaking, exige:
- alinhamento com consumidores
- plano de rollout/versionamento
- atualização coordenada

---

## 🧩 Versionamento e Compatibilidade (recomendação)

Para mudanças breaking:
- Preferir versionamento (ex.: `/v2/…` ou header versioning)
- Ou manter compatibilidade por período (campo antigo + novo)

Regra: breaking change sem plano = risco alto.

---

## 🏁 Conclusão

Governança de contratos reduz:
- regressões
- retrabalho
- incidentes em produção
- quebra de UI e integrações

Ela reforça a qualidade como parte do produto, com **decisão técnica** e rastreabilidade.

---
✍️ Documento criado com foco em **QA Engineering, CI/CD e Qualidade Contínua**.