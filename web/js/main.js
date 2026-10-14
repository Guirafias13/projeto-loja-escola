// js/main.js
const listaProdutos = document.querySelector("#listaProdutos");
const inputFiltro = document.querySelector("#filtroProduto");
const selectRegra = document.querySelector("#filtroRegra");
const selectOrdenacao = document.querySelector("#ordenacao");
const mensagemFiltro = document.querySelector("#mensagemFiltro");

function renderizarProdutos(produtosParaExibir) {
  if (!listaProdutos) return;

  listaProdutos.innerHTML = "";

  if (produtosParaExibir.length === 0) {
    listaProdutos.innerHTML = `<div class="col-12 text-center py-4"><p class="text-secondary">Nenhum produto encontrado com os critérios selecionados.</p></div>`;
    return;
  }

  produtosParaExibir.forEach((produto) => {
    const col = document.createElement("article");
    col.className = "col-sm-6 col-lg-4 product-item";
    col.dataset.name = produto.nome.toLowerCase();

    const regrasTags = produto.regrasAtendidas
      .map(r => `<span class="badge bg-light text-dark border me-1 mb-1">${r}</span>`)
      .join("");

    col.innerHTML = `
      <div class="card h-100 product-card shadow-sm">
        <div class="product-illustration" aria-hidden="true">${produto.icone}</div>
        <div class="card-body d-flex flex-column">
          <p class="small text-secondary mb-1">${produto.categoria}</p>
          <h3 class="h5">${produto.nome}</h3>
          <p class="flex-grow-1">${produto.descricao}</p>
          <div class="mb-3">${regrasTags}</div>
          <p class="price mb-3">R$ ${produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          <a class="btn btn-dark mt-auto" href="produto.html?id=${produto.id}">Ver detalhes</a>
        </div>
      </div>
    `;
    listaProdutos.appendChild(col);
  });
}

function filtrarEOrdenarProdutos() {
  const termo = inputFiltro ? inputFiltro.value.trim().toLowerCase() : "";
  const regraSelecionada = selectRegra ? selectRegra.value : "";
  const ordenacao = selectOrdenacao ? selectOrdenacao.value : "";

  // 1. Filtragem
  let resultado = catalogoProdutos.filter(produto => {
    // Agora verifica estritamente apenas o nome do produto
    const nomeMatch = produto.nome.toLowerCase().includes(termo);

    const regraMatch = selectRegra.value === "" || produto.regrasAtendidas.includes(selectRegra.value);
    return nomeMatch && regraMatch;
  });

  // 2. Ordenação
  if (ordenacao === "menor-preco") {
    resultado.sort((a, b) => a.preco - b.preco);
  } else if (ordenacao === "maior-preco") {
    resultado.sort((a, b) => b.preco - a.preco);
  } else if (ordenacao === "nome") {
    resultado.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  renderizarProdutos(resultado);

  if (mensagemFiltro) {
    if (!termo && !regraSelecionada) {
      mensagemFiltro.textContent = "";
    } else {
      mensagemFiltro.textContent = `${resultado.length} produto(s) encontrado(s).`;
    }
  }
}

// Inicialização e Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  renderizarProdutos(catalogoProdutos);
});

inputFiltro?.addEventListener("input", filtrarEOrdenarProdutos);
selectRegra?.addEventListener("change", filtrarEOrdenarProdutos);
selectOrdenacao?.addEventListener("change", filtrarEOrdenarProdutos);