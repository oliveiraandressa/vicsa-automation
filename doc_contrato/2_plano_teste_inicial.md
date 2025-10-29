# 🧪 Plano de Testes Inicial – Cenários

**Cliente:** SauceDemo  
**Sistema / Aplicação:** SauceDemo (e‑commerce demo)  
**Responsável:** QA Team  
**Data:** 29/10/2025

---

## 🎯 Objetivo
Definir cenários de teste iniciais para os fluxos críticos identificados no mapeamento, permitindo validar rapidamente o escopo da automação e estimar prazos.

---

## 🔹 Cenário 1 – Login e Autenticação
**Descrição:** Validar autenticação com credenciais válidas e tratamento de erros com credenciais inválidas.  
**Objetivo:** Garantir que usuários legítimos acessem a aplicação e que tentativas inválidas sejam apresentadas corretamente.  
**Resultado Esperado:**  
- Login com credenciais válidas redireciona para a página principal do usuário.  
- Login com credenciais inválidas apresenta mensagem de erro clara e não concede acesso.  
- Validações de campos (usuário/senha obrigatórios) funcionam.

---

## 🔹 Cenário 2 – Navegação e Exibição de Produtos
**Descrição:** Verificar carregamento e exibição do catálogo de produtos (imagens, títulos, preços, descrições).  
**Objetivo:** Confirmar que a listagem de produtos carrega corretamente e apresenta informações essenciais.  
**Resultado Esperado:**  
- Lista de produtos exibida sem erros.  
- Cada produto mostra imagem, nome, preço e link para detalhe.  
- Paginação/scroll ou carregamento lazy funciona quando aplicável.

---

## 🔹 Cenário 3 – Adicionar e Remover Itens do Carrinho
**Descrição:** Adicionar um ou mais produtos ao carrinho, atualizar quantidade e remover itens.  
**Objetivo:** Garantir consistência do carrinho entre ações e exibir totais corretamente.  
**Resultado Esperado:**  
- Produto adicionado ao carrinho e contador/indicador atualizado.  
- Alteração de quantidade reflete no subtotal e total.  
- Remover item atualiza o carrinho e totais corretamente.

---

## 🔹 Cenário 4 – Checkout e Finalização de Compra
**Descrição:** Executar checkout com preenchimento de dados obrigatórios e finalizar pedido.  
**Objetivo:** Validar fluxo crítico de compra, cálculos e confirmação de pedido.  
**Resultado Esperado:**  
- Formulário do checkout valida campos obrigatórios.  
- Valores (subtotal, frete, impostos, total) calculados corretamente.  
- Pedido finalizado com página/alerta de confirmação e número de pedido gerado.

---

## 🔹 Cenário 5 – Logout e Segurança de Sessão
**Descrição:** Encerrar sessão e validar que páginas restritas exigem autenticação.  
**Objetivo:** Assegurar que logout remove acesso e previne acesso não autorizado.  
**Resultado Esperado:**  
- Logout redireciona para tela pública (ex.: login/home).  
- Acesso a URLs internas após logout exige novo login (redirecionamento/401).

---

## 🔹 Cenário 6 – Filtragem e Ordenação de Produtos (secundário)
**Descrição:** Aplicar filtros e ordenações (preço, nome) e validar resultados.  
**Objetivo:** Confirmar que filtros/ordenadores retornam conjuntos corretos de produtos.  
**Resultado Esperado:**  
- Filtros aplicados atualizam a lista conforme critérios.  
- Ordenação altera a sequência esperada (ex.: menor para maior preço).

---

## 🔹 Cenário 7 – Responsividade e UI (secundário - manual)
**Descrição:** Validar layout e elementos em diferentes larguras/resoluções (mobile/tablet/desktop).  
**Objetivo:** Garantir usabilidade e visual consistente em dispositivos alvo.  
**Resultado Esperado:**  
- Elementos essenciais (menu, botões, produtos, formulários) permanecem acessíveis e legíveis.  
- Não há quebras de layout importantes em resoluções críticas.

---

## 💡 Observação
- Este plano não detalha passos ou dados; serve apenas como base para contrato e estimativa de esforço.  
- Prioridade inicial: automatizar Cenários 1, 3 e 4 (fluxos críticos).  