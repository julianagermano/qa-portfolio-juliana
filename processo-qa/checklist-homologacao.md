# 🧩 Checklist de Homologação – API Auth

Checklist utilizado para validar o comportamento do sistema em **ambiente de homologação**, garantindo estabilidade e qualidade antes de liberar para produção.

---

## ✔ Antes da Homologação

- [ ] Ambiente disponível e estável  
- [ ] Collection exportada atualizada  
- [ ] Environment configurado corretamente  
- [ ] Massa de teste revisada  
- [ ] Schemas validados  
- [ ] Pipeline anterior (DEV) passou sem falhas  
- [ ] Issues relacionadas ao deploy revisadas  

---

## ✔ Durante a Homologação (Smoke Test)

### 🔹 Autenticação
- [ ] Login com credenciais válidas  
- [ ] Login com credenciais inválidas (negativo)  
- [ ] Login com campos vazios (negativo)  

### 🔹 Refresh Token
- [ ] Renovação do token válida  
- [ ] Token antigo não mais aceito  

### 🔹 Rota Protegida
- [ ] /auth/me com token válido retorna 200  
- [ ] /auth/me sem token retorna 401  
- [ ] /auth/me com token inválido retorna 401  

---

## ✔ Validações Técnicas

- [ ] Contrato validado (JSON Schema)  
- [ ] Campos obrigatórios presentes  
- [ ] Tipos corretos  
- [ ] Nenhum campo sensível indevido retornado  
- [ ] Tempo de resposta dentro do esperado  
- [ ] Logs da API sem erros críticos  
- [ ] Erros tratados corretamente  
- [ ] Status codes condizentes com o cenário  

---

## ✔ Pós‑Homologação

- [ ] Evidências anexadas (HTML / JSON)  
- [ ] Relatório do Newman enviado ao time  
- [ ] Checklist de release atualizado  
- [ ] Aprovação do PO  
- [ ] Aprovação do QA  
- [ ] Deploy liberado para Produção  

---

Feito com 💛 por Juliana
``
