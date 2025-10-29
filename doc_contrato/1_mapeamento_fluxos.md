# 🔍 Mapeamento de Fluxos Importantes  
**Cliente:** SauceDemo  
**Responsável:** QA Team  
**Data:** 29/10/2025  

---

## 🎯 Objetivo  
Identificar os principais fluxos do SauceDemo, avaliar o impacto da automação e sugerir opções de automação para garantir cobertura de testes e estabilidade do sistema.

---

## 💡 Sobre o Sistema  
- Nome do sistema: SauceDemo  
- Tipo: Web  
- O que ele faz: Plataforma de e-commerce de demonstração, permitindo login, visualização de produtos, carrinho e checkout.  
- Público principal: Usuários que testam ou aprendem automação de testes e processos de e-commerce.  
- Impacto no negócio: Embora seja um sistema de demonstração, é amplamente usado para aprendizado de QA e demonstração de fluxos críticos de compra; falhas impactam a confiabilidade do treinamento e demonstração de ferramentas.

---

## 🔁 Fluxos Principais Identificados  

### FLX-001 — Login e autenticação  
- **O que esse fluxo faz:** Permite que usuários autenticados acessem a plataforma.  
- **Tipo de fluxo:** simples  
- **Risco de falha:** alto  
- **Consequência:** Usuários não conseguem acessar o sistema, impossibilitando todos os demais fluxos.  
- **Benefício da automação::** Garantir que credenciais válidas funcionem e que erros de login sejam tratados corretamente.

### FLX-002 — Navegação e exibição de produtos  
- **O que esse fluxo faz:** Exibe catálogo de produtos, imagens, descrições e preços.  
- **Tipo de fluxo:** intermediário  
- **Risco de falha:** médio  
- **Consequência:** Usuários não conseguem ver produtos, impossibilitando compras.  
- **Benefício da automação::** Validar a correta exibição de produtos e filtros de ordenação.

### FLX-003 — Adicionar e remover itens do carrinho  
- **O que esse fluxo faz:** Permite selecionar produtos, adicioná-los ao carrinho e removê-los.  
- **Tipo de fluxo:** intermediário  
- **Risco de falha:** médio  
- **Consequência:** Produtos podem não ser adicionados ou removidos corretamente, comprometendo a experiência de compra.  
- **Benefício da automação::** Garantir consistência no carrinho e evitar perdas de itens.

### FLX-004 — Checkout e finalização de compra  
- **O que esse fluxo faz:** Permite preencher dados, revisar itens e concluir a compra.  
- **Tipo de fluxo:** complexo  
- **Risco de falha:** alto  
- **Consequência:** Usuários não conseguem concluir pedidos, afetando fluxo crítico de vendas.  
- **Benefício da automação::** Validar preenchimento de dados obrigatórios, cálculo de valores e exibição da mensagem de sucesso.

### FLX-005 — Logout e segurança de sessão  
- **O que esse fluxo faz:** Encerra a sessão do usuário e protege o acesso às páginas internas.  
- **Tipo de fluxo:** simples  
- **Risco de falha:** médio  
- **Consequência:** Usuários podem acessar páginas restritas sem login.  
- **Benefício da automação::** Garantir que a sessão seja encerrada corretamente e que redirecionamento funcione.

---

## 🔁 Fluxos Secundários Identificados  

### FLS-001 — Filtragem e ordenação de produtos  
- **O que esse fluxo faz:** Permite organizar os produtos por preço ou ordem alfabética.  
- **Tipo de fluxo:** simples  
- **Risco de falha:** baixo  
- **Consequência:** Usuários podem ter dificuldade em encontrar produtos desejados.  
- **Benefício da automação::** Validar filtros e ordenação corretamente.

### FLS-002 — Responsividade e UI  
- **O que esse fluxo faz:** Verifica adaptação da interface em dispositivos móveis e diferentes resoluções.  
- **Tipo de fluxo:** intermediário  
- **Risco de falha:** médio  
- **Consequência:** Layout quebrado pode prejudicar usabilidade.  
- **Benefício da automação::** Garantir consistência visual em diferentes dispositivos.

---

## 📦 Possibilidades de Pacote  
- **Pacote 1 — 3 fluxos principais:** Login, visualização de produtos e checkout; ideal para cobertura mínima de QA.  
- **Pacote 2 — 5 fluxos:** Adiciona carrinho e logout; bom custo-benefício para maior cobertura.  
- **Pacote 3 — personalizado:** Inclui todos os fluxos principais e secundários, filtros, responsividade e testes de UI; indicado para demonstração completa de automação.

---

## 💰 Retorno Esperado  
- Redução de falhas em produção: 80–90% dos fluxos críticos validados automaticamente.  
- Economia média estimada: Redução de esforço manual em QA (~50% do tempo de testes manuais).  
- Redução de tempo de testes manuais: Automatização permite regressão rápida em cada release.  
- Ganho em segurança e estabilidade: Validação de sessões, login, checkout e mensagens de erro.

---

## 🔜 Próximos Passos  
- Validar fluxos e pacote ideal com o cliente.  
- Elaborar o **Plano de Testes Simplificado** com base neste diagnóstico.  
- Preparar pré-contrato com escopo, pacotes e prazos.
