# 🐞 Template de Bug Report Técnico — QA Engineering

Este template define um padrão de **registro técnico de defeitos**, com foco em **clareza, evidência e tomada de decisão**, facilitando a comunicação entre QA, Desenvolvimento, Produto e DevOps.

O objetivo é garantir que todo bug seja:
- reproduzível
- rastreável
- tecnicamente explicável
- priorizável com base em impacto

---

## 📌 Informações Básicas

- **Título do Bug:**  
  _(claro, objetivo e técnico)_

- **ID / Referência:**  
  _(opcional – Jira, Azure Boards, GitHub Issue, etc.)_

- **Ambiente:**  
  _(dev / hml / qa / prod)_

- **Versão / Build / Commit:**  
  _(ex.: commit SHA, tag, pipeline run)_

- **Data/Hora da detecção:**  
  _(com fuso, se necessário)_

---

## 🎯 Classificação

- **Tipo de Falha:**
  - [ ] Produto (regra de negócio)
  - [ ] Automação
  - [ ] Ambiente / Infra
  - [ ] Mensageria
  - [ ] Performance
  - [ ] Dados / Massa

- **Severidade:**
  - [ ] Crítica (bloqueia fluxo principal)
  - [ ] Alta
  - [ ] Média
  - [ ] Baixa

- **Prioridade sugerida:**
  - [ ] P0
  - [ ] P1
  - [ ] P2
  - [ ] P3

---

## 🧠 Contexto do Problema

Descrever **o que estava sendo validado** e **por que isso é importante**.

> Exemplo:  
> “Durante a validação do fluxo de criação de pedido, foi identificado que o status final não é atualizado corretamente após o processamento do evento assíncrono.”

---

## 🔁 Passos para Reproduzir

Descrever os passos de forma **determinística**, evitando ambiguidades.

1. Acessar endpoint / tela:  
2. Executar ação:  
3. Enviar payload / realizar interação:  
4. Aguardar processamento (quando aplicável):  
5. Observar comportamento incorreto:

📌 **Observação:**  
Se o problema for assíncrono, informar tempo médio esperado para processamento.

---

## ✅ Comportamento Esperado

Descrever **o resultado correto**, alinhado à regra de negócio ou contrato.

> Exemplo:  
> “Após a publicação do evento `ORDER_CREATED`, o pedido deveria ter o status atualizado para `CONFIRMED` em até 5 segundos.”

---

## ❌ Comportamento Atual

Descrever **o que ocorre de fato**, de forma objetiva.

> Exemplo:  
> “O pedido permanece com status `CREATED` mesmo após o consumo do evento.”

---

## 📦 Evidências Técnicas

Anexar ou referenciar **evidências obrigatórias**:

- ✅ Logs relevantes (com correlationId / traceId)
- ✅ Screenshots (UI)
- ✅ Relatórios de teste (HTML/JUnit/Newman)
- ✅ Payload de request/response
- ✅ Evento publicado (mensageria)
- ✅ Mensagem em DLQ (se aplicável)

📌 **Bug sem evidência técnica não deve ser considerado concluído.**

---

## 🔗 Identificadores de Rastreamento

Preencher sempre que possível:

- **correlationId:**  
- **requestId:**  
- **traceId / spanId:**  
- **eventId / messageId:**  

Esses IDs permitem rastreamento ponta a ponta.

---

## 📊 Impacto Avaliado

- Fluxo afetado:  
- Usuários impactados:  
- Risco para negócio:  
- Existe workaround? (Sim / Não)

---

## 🧪 Resultado da Triagem

- **Reprodutível?** (Sim / Não)
- **Falha intermitente?** (Sim / Não)
- **Ocorrência isolada ou recorrente?**
- **Falha de produto confirmada?** (Sim / Não)

---

## 🩺 Análise Inicial do QA

_(Campo essencial para QA Engineering)_

Descrever:
- hipótese da causa raiz
- serviços envolvidos
- possível camada de origem (UI, API, Mensageria, Infra)
- recomendações iniciais

> Exemplo:  
> “A análise indica falha no consumer do evento `ORDER_CREATED`, possivelmente relacionada a timeout no processamento, pois o evento foi publicado corretamente, mas não houve ACK.”

---

## 🔄 Relação com Pipeline / Automação

- O bug foi detectado por:
  - [ ] Teste manual
  - [ ] Teste automatizado
  - [ ] Pipeline CI/CD
  - [ ] Monitoramento / Observabilidade

- Pipeline bloqueada?
  - [ ] Sim
  - [ ] Não
  - [ ] Execução pulada (Health Check)

---

## ✅ Critério de Aceite para Correção

Definir como o bug será considerado resolvido:

- comportamento esperado validado
- testes automatizados ajustados/criados
- não há regressão em fluxos relacionados
- evidências atualizadas

---

## 🏁 Observações Finais

Campo livre para:
- dependências externas
- riscos conhecidos
- decisões de produto
- acompanhamento futuro

---

✍️ Template criado com foco em **QA Engineering, CI/CD e Qualidade Contínua**.
