# 🧪 Estratégia de Testes – API x UI x Mensageria

Este documento descreve uma **estratégia de testes de qualidade ponta a ponta**, combinando **testes de API, testes de UI e testes de mensageria**, com foco em confiabilidade, escalabilidade e eficiência da esteira de CI/CD.

A abordagem apresentada é **genérica e reutilizável**, podendo ser aplicada a qualquer produto digital moderno.

---

## 🎯 Objetivo da Estratégia

Garantir que o produto:

- funcione corretamente em nível técnico e de negócio
- seja testado no nível certo (sem redundância)
- evite falsos negativos
- escale com segurança em CI/CD
- seja resiliente a falhas de ambiente e integração

---

## 🧠 Princípio Central

> **Nem tudo deve ser testado na UI.  
> Nem tudo deve ser testado na API.  
> Nem tudo deve ser testado via eventos.**

Cada camada existe para responder **um tipo específico de risco**.

---

## 🏗️ Camadas de Teste

```text
┌──────────────────────────────┐
│           UI (E2E)           │  → Fluxo de negócio
├──────────────────────────────┤
│            API               │  → Regras e integrações
├──────────────────────────────┤
│         Mensageria           │  → Processos assíncronos
└──────────────────────────────┘

Testes de API
Quando usar
Utilize testes de API para validar:

regras de negócio
contratos de resposta
integrações entre serviços
persistência de dados
cenários positivos e negativos

Exemplos

Criar pedido
Validar login/autenticação
Atualizar status
Verificar payloads e schemas

Benefícios

Execução rápida
Alta estabilidade
Fácil automação
Ideal para regressão

O que NÃO testar aqui

Experiência do usuário
Layout
Navegação visual


🔹 Testes de UI (End-to-End)
Quando usar
Utilize testes de UI para validar:

fluxos críticos do usuário
integração completa (frontend + backend)
navegação e comportamento funcional
caminhos felizes principais

Exemplos

Login completo
Criação de pedido
Finalização de fluxo
Ações que representam valor de negócio

Benefícios

Visão real do usuário
Validação ponta a ponta

Cuidados

Testes mais lentos
Mais suscetíveis a flakiness
Devem ser poucos e bem escolhidos

📌 Regra prática:

Se já está validado na API, a UI só precisa garantir que o fluxo funciona, não repetir todas as validações.


🔹 Testes de Mensageria
Quando usar
Utilize testes de mensageria para validar:

fluxos assíncronos
eventos publicados corretamente
consumo de mensagens
efeitos finais no sistema
resiliência a falhas

Exemplos

Pedido criado gera evento
Evento consumido atualiza banco
Falha no consumer gera retry ou DLQ
Mensagem duplicada não duplica efeito

Benefícios

Alta confiabilidade
Cobertura de cenários críticos invisíveis à UI
Essencial em arquiteturas distribuídas


🔄 Combinação das Camadas (como usar juntas)
Exemplo de fluxo real

Usuário cria pedido (UI)
→ API cria pedido
→ Evento ORDER_CREATED é publicado
→ Consumer processa
→ Banco é atualizado
→ Status final é refletido na UI

→ Status final é refletido na UIMostrar mais linhas
Estratégia de teste recomendada

<img width="413" height="275" alt="image" src="https://github.com/user-attachments/assets/08986a63-2677-4dc8-b557-c4465a0ce089" />

Resultado: cobertura alta sem redundância.

Estratégia em CI/CD
Execução recomendada

API: sempre (regressão)
Mensageria: sempre que houver evento
UI (Smoke): sempre
UI (Regressão): sob demanda ou noturno

Execução condicional

Ambientes indisponíveis não devem quebrar pipeline
Health Check decide execução de UI E2E
API e mensageria continuam sendo validados

Antipadrões a Evitar

Testar tudo pela UI
Repetir as mesmas validações em todas as camadas
Ignorar mensageria
Tratar falha de ambiente como falha de teste
Criar testes E2E excessivos


✅ Boas Práticas

Testar cada risco na camada correta
Priorizar testes rápidos e estáveis
Usar UI apenas para fluxos críticos
Automatizar validações de eventos
Documentar decisões de teste
Manter pipeline resiliente


🧩 Conclusão
Uma boa estratégia de testes não depende de uma única camada, mas da combinação inteligente entre API, UI e Mensageria.
Essa abordagem:

reduz flakiness
acelera feedback
aumenta confiabilidade
escala em CI/CD
reflete maturidade em QA Engineering


✍️ Documento criado com foco em QA Engineering, automação e qualidade contínua.

