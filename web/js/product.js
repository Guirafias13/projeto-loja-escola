// js/product.js
const params = new URLSearchParams(window.location.search);
const produtoId = Number(params.get("id"));

// Encontra o produto no catálogo importado de produtos.js
const produto = typeof catalogoProdutos !== 'undefined' 
  ? catalogoProdutos.find(p => p.id === produtoId) 
  : null;

// Elementos da página
const breadcrumbNome = document.querySelector(".breadcrumb-item.active");
const tituloPagina = document.querySelector("h1");
const categoriaEl = document.querySelector(".eyebrow");
const descricaoEl = document.querySelector(".lead");
const precoEl = document.querySelector(".price");
const ilustracaoEl = document.querySelector(".product-detail-illustration");
const formProduto = document.querySelector("#formProduto");
const quantidade = document.querySelector("#quantidade");
const feedback = document.querySelector("#produtoFeedback");

// Se o produto não existir ou o ID for inválido, exibe mensagem de erro amigável
if (!produto) {
  const mainContent = document.querySelector("#conteudo");
  if (mainContent) {
    mainContent.innerHTML = `
      <div class="container py-5 text-center">
        <h1>Produto não encontrado</h1>
        <p class="lead text-secondary my-4">O produto que você está tentando acessar não existe ou foi removido.</p>
        <a href="index.html" class="btn btn-dark btn-lg">Voltar para a vitrine</a>
      </div>
    `;
  }
} else {
  // Preenche os dados dinamicamente na página
  document.title = `Loja Escola | ${produto.nome}`;
  if (breadcrumbNome) breadcrumbNome.textContent = produto.nome;
  if (tituloPagina) tituloPagina.textContent = produto.nome;
  if (categoriaEl) categoriaEl.textContent = produto.categoria;
  if (descricaoEl) descricaoEl.textContent = produto.descricao;
  if (precoEl) precoEl.textContent = `R$ ${produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  if (ilustracaoEl) ilustracaoEl.textContent = produto.icone;

  // Se houver regras criativas cadastradas, podemos exibi-las em uma seção de detalhes
  const detalhesSecao = document.querySelector("#titulo-detalhes")?.parentElement;
  if (detalhesSecao && produto.regrasAtendidas) {
    const regrasHtml = produto.regrasAtendidas.map(regra => `<li>Regra atendida: ${regra}</li>`).join("");
    detalhesSecao.innerHTML = `
      <h2 id="titulo-detalhes" class="h4">Detalhes e Regras do Desafio</h2>
      <ul>
        <li>${produto.descricao}</li>
        ${regrasHtml}
      </ul>
    `;
  }
}

// Manipula o envio do formulário para salvar no sessionStorage
formProduto?.addEventListener("submit", (event) => {
  event.preventDefault();
  
  if (!produto) return;

  const quantidadeEscolhida = Number(quantidade.value);

  if (quantidadeEscolhida < 1 || quantidadeEscolhida > 10) {
    feedback.textContent = "Escolha uma quantidade entre 1 e 10.";
    quantidade.focus();
    return;
  }

  // Salva os dados do produto escolhido e a quantidade no sessionStorage
  sessionStorage.setItem("produtoId", produto.id);
  sessionStorage.setItem("produtoNome", produto.nome);
  sessionStorage.setItem("produtoPreco", produto.preco);
  sessionStorage.setItem("quantidade", String(quantidadeEscolhida));

  window.location.href = "checkout.html";
});