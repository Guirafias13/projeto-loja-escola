# projeto-loja-escola

# 🌌 Loja Impossível

Uma aplicação web de comércio eletrónico imersiva, moderna e futurista, desenvolvida para comercializar inventos extraordinários e artigos que desafiam as leis da física. O projeto combina um design visual sofisticado com uma experiência de utilizador fluida, segura e de altíssimo desempenho.

---

## 🚀 Tecnologias e Ferramentas

* **Front-end:** HTML5, CSS3 (com custom properties/variáveis, Flexbox, Grid e gradientes de alto contraste)
* **Framework CSS:** Bootstrap 5.3 (para estruturação responsiva e componentes base)
* **Linguagem:** JavaScript Vanilla (ES6+) moderno, modular e otimizado
* **Armazenamento:** `SessionStorage` para persistência e transporte seguro de dados entre as etapas do carrinho e checkout
* **APIs Externas:** Integração com a API **ViaCEP** para preenchimento automatizado de endereços

---

## 📂 Arquitetura do Projeto

```text
├── index.html         # Vitrine principal (catálogo, filtros e busca)
├── produto.html       # Página de detalhes e especificações do item
├── checkout.html      # Carrinho, dados de entrega e forma de pagamento
├── sucesso.html       # Recibo de confirmação e detalhes do pedido gerado
├── css/
│   └── styles.css     # Estilos globais e tema cósmico unificado
└── js/
    └── checkout.js    # Lógica de validação de formulários, CEP e sessão

```

---

## ✨ Principais Funcionalidades

* **Identidade Visual Cósmica:** Design imersivo em modo escuro (*dark mode*) com paleta de cores inspirada em nebulosas (tons profundos de azul e destaques em neon roxo e ciano).
* **Catálogo Dinâmico e Interativo:** Listagem de produtos inovadores com filtros por categorias (Tecnologia, Utilidades, Antigravidade, etc.), ordenação e busca instantânea.
* **Fluxo de Checkout Completo:**
* Resumo dinâmico do pedido em tempo real.
* Validação estrita de e-mail (exigência de domínio `@gmail.com`).
* Formatação automática de campos (como telefone e CEP).
* Consulta integrada à API ViaCEP para autocompletar logradouro, bairro, cidade e estado.


* **Experiência Pós-Compra:** Tela dedicada de sucesso (`sucesso.html`) com geração de código de rastreio/pedido aleatório e resumo do cliente.

---

## 📊 Performance e Otimização

O projeto foi rigorosamente auditado e desenvolvido sob padrões estritos de qualidade web, alcançando pontuações de excelência:

* **Performance:** 99
* **Acessibilidade:** 100
* **Boas Práticas:** 96
* **SEO:** 100

---

## 🛠️ Como Executar o Projeto Localmente

1. Certifique-se de ter um navegador moderno instalado (Google Chrome, Firefox, Edge, etc.).
2. Clone este repositório ou descarregue os ficheiros para a sua máquina:
```bash
git clone https://github.com/seu-utilizador/loja-impossivel.git

```


3. Abra a pasta do projeto num servidor local de desenvolvimento (como a extensão **Live Server** do Visual Studio Code) ou abra diretamente o ficheiro `index.html` no seu navegador.
