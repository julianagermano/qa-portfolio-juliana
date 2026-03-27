#  Observabilidade para QA — Estratégia, Práticas e Checklist

Este documento define uma abordagem de **observabilidade aplicada à Qualidade de Software**, com foco em garantir que falhas sejam **detectáveis, diagnosticáveis e rastreáveis** em ambientes de desenvolvimento, homologação e produção.

A proposta é **genérica e reutilizável**, aplicável a qualquer produto e stack.

---

##  Objetivo

Garantir que:

- falhas em testes automatizados sejam investigáveis (não “misteriosas”)
- problemas em produção possam ser detectados rapidamente
- QA tenha dados para distinguir falha de produto vs falha de ambiente
- fluxos distribuídos (API + mensageria) sejam rastreáveis ponta a ponta
- a qualidade seja medida e evoluída com base em evidências

---

##  O que é Observabilidade (visão QA)

Observabilidade não é só “monitoramento”.

- **Monitoramento**: “algo está quebrado” (alerta)
- **Observabilidade**: “por que quebrou e onde quebrou” (diagnóstico)

QA usa observabilidade para:
- reduzir flakiness
- acelerar triagem de defeitos
- melhorar confiabilidade da pipeline
- identificar regressões reais

---

##  Os 3 Pilares da Observabilidade

### 1) Logs
Registro de eventos e erros em texto estruturado.

QA usa logs para:
- identificar causa raiz
- validar fluxo executado
- verificar payloads relevantes (sem dados sensíveis)

**Boas práticas**
- logs estruturados (JSON quando possível)
- níveis de log (INFO/WARN/ERROR)
- mensagem clara e identificável
- sem PII/senha/token

---

### 2) Métricas
Números ao longo do tempo.

QA usa métricas para:
- detectar degradação de performance
- identificar aumento de erros
- medir estabilidade (flakiness)

**Exemplos**
- latência p95/p99
- taxa de erro (4xx/5xx)
- throughput (req/min)
- consumo e backlog de filas
- crescimento de DLQ

---

### 3) Traces (Distributed Tracing)
Rastreamento ponta a ponta de uma transação entre serviços.

QA usa traces para:
- acompanhar fluxo entre API → mensageria → consumer → banco
- encontrar gargalo
- correlacionar logs de vários serviços

---

##  Identificadores essenciais (o “segredo” da observabilidade)

Para que QA consiga rastrear um fluxo, é essencial ter:

- **correlationId** (id de correlação)
- **traceId/spanId** (para tracing)
- **eventId/messageId** (para mensageria)
- **requestId** (para requisições HTTP)

### Exemplo de rastreabilidade ideal
```text
UI -> requestId -> API -> traceId -> evento -> messageId -> consumer -> banco

Como QA usa Observabilidade na prática
 1) Quando um teste falha (pipeline)
QA deve conseguir responder rapidamente:

falha é do produto ou do ambiente?
qual serviço falhou?
qual endpoint/evento foi afetado?
houve timeout, 5xx, ou erro de regra?
a falha é reprodutível?

Saídas esperadas:

link para logs do serviço
traceId/correlationId do fluxo
evidências do teste (screenshot/trace do Playwright, relatório Newman/JUnit)


 2) Em fluxos distribuídos (API + Mensageria)
QA valida:

evento foi publicado?
consumer processou?
houve retry?
foi para DLQ?
qual tempo entre publicação e consumo?

Métricas úteis:

publish rate
consume rate
queue depth (backlog)
DLQ count
processing time


 3) Em performance/estabilidade
QA acompanha:

p95/p99 de endpoints críticos
taxa de erro
saturação de recursos (CPU/Mem)
regressões após deploy


 Evidências mínimas que uma pipeline QA deve publicar

relatório de testes (JUnit/HTML)
logs relevantes (stdout do job)
artefatos de evidência:

Playwright: playwright-report, test-results
Newman: HTML/JSON


timestamp e ambiente
versão/commit (SHA)


 Health Checks e “Falha Controlada” (padrão QA)
Antes de executar E2E, um Health Check deve validar:

DNS/URL acessível
resposta mínima do endpoint de saúde

Se falhar:

registrar evidência
pular E2E de forma controlada (quando aplicável)
não confundir com falha de produto


 Métricas de Qualidade (para QA acompanhar)
Qualidade de Produto

taxa de falhas por feature
taxa de erros 5xx por endpoint
tempo médio para correção (MTTR)
regressões por release

Qualidade da Automação

flakiness rate (% de falhas intermitentes)
tempo médio de execução
retries por suíte
falsos negativos evitados por health checks

Qualidade da Operação

backlog de filas
DLQ size
latência p95/p99
incidentes por período


 Checklist QA — Observabilidade “Pronta”
Logs

 logs estruturados
 sem dados sensíveis
 correlationId presente
 erro com stack trace em ERROR

Métricas

 p95/p99 disponíveis para endpoints críticos
 taxa de erro 4xx/5xx
 consumo e backlog de filas
 DLQ monitorada

Traces

 traceId disponível para requests críticos
 tracing em API → consumer
 correlação com logs

Pipeline

 publica relatórios e evidências
 registra versão (commit SHA)
 health check antes de E2E
 evita falso negativo por ambiente


 Antipadrões (o que evitar)

Logs sem contexto (“deu erro”)
Erros sem stack trace
Falta de correlationId
Alertas sem ação definida
Pipelines que falham por instabilidade externa sem evidência
Dados sensíveis em logs/relatórios


 Conclusão
Observabilidade é parte essencial da estratégia de qualidade.
Uma boa prática de QA Engineering inclui:

tornar falhas investigáveis
reduzir flakiness com sinais confiáveis
medir qualidade e estabilidade com métricas
rastrear fluxos distribuídos com IDs e tracing

Este documento serve como referência genérica para implementar observabilidade orientada à qualidade em qualquer projeto.

 Documento criado com foco em QA Engineering, CI/CD e Qualidade Contínua.
```text
UI -> requestId -> API -> traceId -> evento -> messageId -> consumer -> banco
