# 🧪 Plano de Testes Detalhado – SauceDemo

**Cliente:** SauceDemo  
**Responsável pelo QA:** QA Team  
**Data:** 29/10/2025  
**Versão do Sistema:** v1.0

---

## 1️⃣ Objetivo
Garantir que os fluxos críticos identificados no Plano de Testes Inicial funcionem corretamente por meio de casos de teste manuais e automatizados, reduzindo riscos em produção.

---

## 2️⃣ Escopo
- Fluxos incluídos: Login/Autenticação; Navegação/Exibição de Produtos; Adicionar/Remover Itens do Carrinho; Checkout/Finalização; Logout/Sessão; Filtragem/Ordenação; Responsividade.  
- Tipos de teste: Manual e Automatizado (prioridade à automação para fluxos críticos).  
- Ambiente de teste: staging/homologação controlado pelo Contratante.

---

## 3️⃣ Critérios de Aceitação
- Todos os casos de teste com prioridade Alta/Crítica executados e aprovados em staging.  
- Scripts automatizados para cenários críticos estáveis no CI (3 execuções consecutivas).  
- Evidências (screenshots, logs) anexadas e relatório de execução entregue ao cliente.

---

## 4️⃣ Plano de Teste por Fluxo

### 🔹 FLX-001 – Login e Autenticação  
**Tipo de Fluxo:** Simples  
**Objetivo:** Validar autenticação, mensagens de erro e tratamento de contas bloqueadas.  
**Pré-condições:** Contas de teste disponíveis (fixture: cypress/fixtures/users.json — standard_user, locked_out_user, problem_user).

#### Cenário 1 — Login válido
**Objetivo do Cenário:** permitir acesso com credenciais válidas.

**TST-001 - Login válido**  
Dado que o usuário está na página de login com credenciais válidas (standard_user / secret_sauce)  
quando preencher usuário e senha e clicar em "Login"  
então será redirecionado para /inventory.html e a lista de produtos (.inventory_list) será visível

**TST-002 - Login inválido**  
Dado que o usuário informa credenciais inválidas  
quando submeter o formulário de login  
então uma mensagem de erro clara deverá ser exibida e o acesso negado

**TST-003 - Usuário bloqueado**    
Dado que o usuário é locked_out_user  
quando tentar efetuar login  
então será exibida mensagem indicando que o usuário está bloqueado

**TST-004 - Campos obrigatórios (usuário/senha vazios)**  
Dado que um ou ambos os campos estão vazios  
quando submeter o formulário  
então a mensagem apropriada por campo deverá ser exibida (ex.: "Username is required", "Password is required")

#### Observações
- Automatizar com fixtures/users.json; validar texto das mensagens e presença de elementos no DOM (seletores estáveis/data-test).  
- Bonus: Incluir teste básico de XSS (payload não deve executar).

---

### 🔹 FLX-002 – Navegação e Exibição de Produtos  
**Tipo de Fluxo:** Intermediário  
**Objetivo:** Verificar carregamento correto do catálogo e navegação para detalhe.  
**Pré-condições:** Catálogo populado em staging, estar logado.

**TST-005 - Listagem de produtos**  
Dado que o usuário acessa /inventory.html  
quando a página terminar de carregar  
então os cards de produto devem mostrar imagem, nome e preço; 

**TST-006 - Detalhe do produto**
Dado que existe um produto na listagem  
quando o usuário clicar no card do produto  
então abrirá a página de detalhe contendo descrição, preço e botão "Add to cart"

#### Observações
- Validar atributos alt em imagens e existência de seletores/data-test para estabilidade de automação.

---

### 🔹 FLX-003 – Adicionar e Remover Itens do Carrinho  
**Tipo de Fluxo:** Crítico  
**Objetivo:** Garantir consistência do carrinho e cálculos de subtotal/total.  
**Pré-condições:** Usuário autenticado; catálogo com itens.

**TST-007 - Adicionar item ao carrinho**    
Dado que o usuário está logado em /inventory.html  
quando clicar em "Add to cart" em um produto  
então o contador do carrinho deve incrementar e o item deve aparecer em /cart.html

**TST-008 - Atualizar quantidade / Remover item**  
Dado que o carrinho contém itens  
quando atualizar a quantidade de um item ou remover um item  
então subtotais e total devem ser recalculados corretamente e o contador ajustado

**TST-009 - Persistência do carrinho entre sessões**
Dado que o usuário adicionou itens ao carrinho  
quando recarregar a página ou encerrar sessão e logar novamente (conforme política da aplicação)  
então o estado do carrinho deve persistir conforme regra definida



---

### 🔹 FLX-004 — Checkout e Finalização de Compra  
**Tipo de Fluxo:** Crítico  
**Objetivo:** Validar preenchimento, cálculos e confirmação do pedido.  
**Pré-condições:** Carrinho com ao menos 1 item; sandbox de pagamento quando aplicável.

TST-010 - Checkout com dados válidos  
Dado que o carrinho possui itens e o usuário está autenticado  
quando preencher First Name, Last Name e Postal Code e seguir os passos do checkout  
então a página de confirmação (/checkout-complete.html) deverá exibir número/ID do pedido e totais corretos

TST-011 - Validações de formulário no checkout  
Dado que o usuário deixa campos obrigatórios vazios  
quando tentar avançar no checkout  
então cada campo obrigatório deverá apresentar mensagem de erro específica

TST-012 - Falha de pagamento simulada  
Dado que o serviço de pagamento retorna erro no sandbox  
quando confirmar pagamento  
então a aplicação deverá exibir mensagem de falha e não gerar pedido; estado do pedido deve permanecer consistente

#### Observações
- Mockar/isolaar chamadas externas quando possível para automação determinística; registrar requests/responses se aplicável.

---

### 🔹 FLX-005 — Logout e Segurança de Sessão  
**Tipo de Fluxo:** Simples  
**Objetivo:** Garantir encerramento de sessão e proteção de rotas.  
**Pré-condições:** Usuário autenticado.

TST-013 - Logout funcional  
Dado que o usuário está logado  
quando clicar em "Logout" no menu  
então será redirecionado para a tela de login e acesso a páginas restritas será negado

TST-014 - Acesso direto sem sessão  
Dado que não há sessão ativa  
quando acessar diretamente /inventory.html ou /checkout-step-one.html  
então a aplicação deverá redirecionar para login ou retornar 401 conforme política

---

### 🔹 FLX-006 — Filtragem e Ordenação de Produtos  
**Tipo de Fluxo:** Secundário  
**Objetivo:** Validar filtros e ordenações aplicadas à listagem.  
**Pré-condições:** Catálogo variado.

TST-015 - Filtrar por critério (categoria/faixa de preço)  
Dado que existem produtos com propriedades variadas  
quando aplicar filtro  
então somente produtos que atendam ao critério deverão ser exibidos

TST-016 - Ordenação (price/name)  
Dado que a listagem está visível  
quando aplicar ordenação (ex.: price low→high)  
então a sequência dos itens deverá refletir o critério selecionado

---

### 🔹 FLX-007 — Responsividade e UI  
**Tipo de Fluxo:** Manual com suporte automatizado (screenshots)  
**Objetivo:** Verificar apresentação e usabilidade em breakpoints críticos.

TST-017 - Checkpoints visuais (screenshots)  
Dado que a aplicação está disponível em staging  
quando capturar screenshots em 320px, 768px e 1024px das páginas críticas (login, produtos, cart, checkout)  
então não deve haver quebras visuais críticas e elementos essenciais devem permanecer acessíveis

---

## 5️⃣ Critérios de Saída
- Todos os casos críticos (TST-001..TST-012) executados e aprovados ou com bugs reportados e triados.  
- Scripts automatizados estáveis no CI para cenários prioritários.  
- Relatório com evidências entregue.

---

## 6️⃣ Entregáveis
- Documento de casos detalhados (este arquivo).  
- Scripts Cypress (cypress/e2e/*).  
- Fixtures e comandos de suporte (cypress/fixtures, cypress/support).  
- README de execução e relatório com screenshots / logs.

---

## 7️⃣ Frequência e Manutenção
- Execução: smoke em PRs (cenários críticos); suíte completa nightly.  
- Manutenção: revisão de scripts após alterações de UI; priorizar estabilidade dos testes críticos.

---

## 8️⃣ Aprovação
**Cliente:** ___________________________  Data: ___ / ___ / ____  
**QA Responsável:** ____________________  Data: ___ / ___ / ____
