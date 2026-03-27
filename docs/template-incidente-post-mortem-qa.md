# 🚨 Template de Incidente (Post‑mortem) — QA Engineering

Este documento define um **template de post‑mortem de incidente**, com foco em **análise técnica, aprendizado contínuo e melhoria de qualidade**, sob a ótica de QA Engineering.

O objetivo não é apontar culpados, mas **entender o que aconteceu, por que aconteceu e como evitar recorrência**.

---

## 🎯 Objetivo do Post‑mortem

- documentar incidentes de forma clara e técnica
- identificar causas raiz reais (não sintomas)
- avaliar impacto para usuários e negócio
- gerar ações concretas de melhoria
- fortalecer automação, pipeline e processos de QA

---

## 📌 Informações Gerais do Incidente

- **ID do Incidente:**  
- **Título:**  
  _(curto e descritivo)_

- **Data/Hora de início:**  
- **Data/Hora de resolução:**  
- **Ambiente afetado:**  
  _(prod / hml / qa / dev)_

- **Duração total:**  

- **Status final:**  
  - [ ] Resolvido
  - [ ] Mitigado
  - [ ] Em monitoramento

---

## 🧠 Resumo Executivo

Descrição breve do incidente, em linguagem acessível, respondendo:

- o que aconteceu?
- quando foi percebido?
- quem foi impactado?
- como foi resolvido?

> Exemplo:  
> “Entre 10:15 e 11:40, pedidos criados não tiveram status atualizado devido à falha no consumo de eventos assíncronos, impactando usuários finais.”

---

## 📊 Impacto

- **Usuários impactados:**  
- **Funcionalidades afetadas:**  
- **Impacto para o negócio:**  
  _(ex.: pedidos não processados, atrasos, perda de receita, retrabalho operacional)_

- **Severidade do incidente:**  
  - [ ] Baixa
  - [ ] Média
  - [ ] Alta
  - [ ] Crítica

---

## 🕒 Linha do Tempo (Timeline)

Registrar os principais eventos do incidente.

| Horário | Evento |
|-------|-------|
| 10:15 | Erro detectado em monitoramento |
| 10:20 | QA confirma falha via automação |
| 10:30 | Dev identifica falha no consumer |
| 11:10 | Hotfix aplicado |
| 11:40 | Sistema normalizado |

📌 A timeline ajuda a identificar atrasos e pontos de melhoria no tempo de resposta.

---

## 🔍 Análise Técnica

### 🔹 Onde ocorreu a falha
- [ ] UI
- [ ] API
- [ ] Mensageria
- [ ] Banco de dados
- [ ] Infraestrutura
- [ ] Pipeline CI/CD

---

### 🔹 O que falhou tecnicamente

Descrever o componente que falhou e o comportamento observado.

> Exemplo:  
> “O consumer do evento `ORDER_CREATED` deixou de processar mensagens devido a timeout na conexão com o banco.”

---

### 🔹 Causa Raiz (Root Cause)

Descrever **a causa real**, não apenas o efeito.

> Exemplo:  
> “Alteração recente no schema do banco aumentou o tempo de resposta, levando o consumer a exceder o timeout configurado.”

---

## 🔗 Evidências Técnicas

Anexar ou referenciar:

- logs relevantes
- correlationId / traceId
- eventId / messageId
- screenshots ou vídeos (UI)
- relatórios de testes (HTML/JUnit/Newman)
- métricas e gráficos (quando disponíveis)

📌 **Incidente sem evidência não gera aprendizado.**

---

## 🧪 Papel da Qualidade (QA)

### 🔹 Como o QA detectou o incidente
- [ ] Automação (API/UI)
- [ ] Pipeline CI/CD
- [ ] Monitoramento / Observabilidade
- [ ] Reporte manual
- [ ] Reclamação de usuário

---

### 🔹 Por que o incidente não foi prevenido

Avaliar honestamente:
- ausência de teste?
- cobertura insuficiente?
- falta de quality gate?
- automação não executada?
- health check inexistente?

---

## ✅ Ações Corretivas (Curto Prazo)

Ações tomadas para resolver o incidente.

- [ ] Correção de código
- [ ] Reprocessamento de dados
- [ ] Ajuste de configuração
- [ ] Restart de serviço
- [ ] Mitigação temporária

---

## 🚀 Ações Preventivas (Médio / Longo Prazo)

Ações para evitar recorrência.

### 🔹 Qualidade / Testes
- adicionar testes automatizados
- criar testes de mensageria
- ampliar cenários negativos
- melhorar massa de dados

### 🔹 Pipeline / CI
- adicionar ou ajustar quality gates
- incluir health checks
- melhorar execução condicional
- aumentar evidências geradas

### 🔹 Observabilidade
- novos logs
- métricas adicionais
- alertas mais precisos
- tracing ponta a ponta

---

## 📊 Lições Aprendidas

Registrar aprendizados objetivos:

- o que funcionou bem?
- o que pode melhorar?
- quais sinais foram ignorados?
- como reagir mais rápido da próxima vez?

---

## 🧩 Relação com Documentos de Qualidade

Este incidente se relaciona com:

- [ ] Estratégia de Testes
- [ ] Quality Gates
- [ ] Observabilidade
- [ ] Playbook de Triagem
- [ ] Automação API / UI / Mensageria

---

## 🏁 Conclusão

Este post‑mortem reforça que incidentes são oportunidades de **melhoria contínua**, não falhas individuais.

A aplicação consistente deste template contribui para:
- aumento da confiabilidade do sistema
- maturidade da qualidade
- redução de recorrência de incidentes
- fortalecimento da cultura de aprendizado

---

✍️ Template criado com foco em **QA Engineering, resiliência e qualidade contínua**.
