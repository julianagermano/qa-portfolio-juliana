# 🚀 Checklist de Release

Checklist utilizado para validar a qualidade antes de liberar uma nova versão do projeto **Auth** para ambientes superiores (HML/PRD).

---

## ✔ Pré‑validações obrigatórias

- [ ] Todos os testes de API passando (Postman/Newman)
- [ ] Nenhum erro crítico/blocante registrado
- [ ] Plano de teste revisado e atualizado
- [ ] Cenários BDD atualizados
- [ ] Checklist de API concluído
- [ ] Massa de dados de teste validada (CSV)
- [ ] Schemas JSON atualizados (quando necessário)
- [ ] Documentação atualizada no GitHub (README / processos)

---

## ✔ Validações Técnicas

- [ ] Collection exportada corretamente
- [ ] Environment configurado sem dados sensíveis
- [ ] Scripts Postman funcionando
- [ ] Validação de contrato funcionando
- [ ] Execução do .bat funcionando
- [ ] Relatórios HTML e JSON gerados sem erro
- [ ] Nenhum aviso crítico no console do Newman

---

## ✔ Validações de Processo

- [ ] Issue/tarefa vinculada ao release
- [ ] Evidências anexadas
- [ ] Aprovação do PO
- [ ] Aprovação do QA
- [ ] Tags/versões anotadas (semântica recomendada)
- [ ] Logs de builds estáveis

---

## ✔ Validações de Ambiente

- [ ] Ambiente está acessível
- [ ] Variáveis de ambiente configuradas corretamente
- [ ] Serviços dependentes funcionando
- [ ] Histórico de deploy consultado
- [ ] Monitoramento básico funcional
- [ ] Endpoint respondendo OK após deploy

---

## ✔ Validações Pós‑Deploy

- [ ] Teste de fumaça executado
- [ ] Teste de autenticação executado
- [ ] Teste de refresh executado
- [ ] Teste da rota /auth/me executado
- [ ] Coleta de evidências (prints/relatórios)
- [ ] Atualização do status no trabalho (ADO/Jira)

---

## ✔ Conclusão

O release só deve ser aprovado quando **todos os itens acima forem validados**  
e não houver falhas funcionais, técnicas ou de processo.

---

Feito com 💛 por Juliana
