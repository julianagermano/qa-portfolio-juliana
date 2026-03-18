# 🧪 Checklist de Testes de API

Checklist utilizado para garantir a qualidade funcional, estrutural e de contrato das APIs do projeto **Auth**.

---

## ✔ Validação de Requisições

- [ ] Endpoint correto configurado  
- [ ] Método HTTP correto (GET, POST, etc.)
- [ ] Parâmetros obrigatórios presentes  
- [ ] Corpo da requisição válido (JSON estruturado)  
- [ ] Autenticação configurada (quando necessário)  
- [ ] Headers essenciais presentes (Content-Type, Authorization)

---

## ✔ Validação de Respostas

- [ ] Código de status condizente com o cenário  
- [ ] Estrutura da resposta válida (JSON bem formado)  
- [ ] Campos obrigatórios retornados  
- [ ] Tipos corretos (string, number, boolean, object)  
- [ ] Mensagens de erro claras em cenários negativos  
- [ ] Contrato validado com JSON Schema  
- [ ] Tamanho da resposta dentro do esperado  

---

## ✔ Segurança Básica

- [ ] Sem dados sensíveis no payload (senha, token completo etc.)
- [ ] Token enviado apenas quando necessário  
- [ ] Token não aparece em logs  
- [ ] Resposta 401 para token inválido  
- [ ] Resposta 401 para ausência de token  

---

## ✔ Testes Negativos

- [ ] Username inválido  
- [ ] Password inválido  
- [ ] Campos vazios  
- [ ] Tipos incorretos (ex.: number em vez de string)  
- [ ] Token inválido  
- [ ] Token ausente  
- [ ] Campos extras inesperados  

---

## ✔ Boas Práticas

- [ ] Scripts Postman funcionando  
- [ ] Variáveis de ambiente inseridas  
- [ ] Nomes consistentes entre requests  
- [ ] Logs no Console do Postman  
- [ ] Coleção exportada com sucesso  
- [ ] Organização por módulos/rotas  
- [ ] README atualizado  

---

## ✔ Automação (Newman)

- [ ] Execução via terminal funcionando  
- [ ] Relatório JSON gerado  
- [ ] Relatório HTML gerado  
- [ ] `.bat` funcionando com timestamp  
- [ ] Ambiente (ENV) corretamente referenciado  
- [ ] Itens falhos listados no relatório  
- [ ] Sem warnings críticos  

---

## ✔ Pronto para Pipeline

- [ ] Arquivo `azure-pipelines.yml` criado  
- [ ] Testes executam sem falhas  
- [ ] Relatórios publicados como artefato  
- [ ] Critério de erro efetivo (Fail build)  
- [ ] Repositório organizado  

---

Feito com 💛 por Juliana
