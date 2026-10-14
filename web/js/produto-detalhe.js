// js/produto-detalhe.js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Captura o ID da URL (ex: produto.html?id=2)
    const params = new URLSearchParams(window.location.search);
    const produtoId = parseInt(params.get("id"));

    // 2. Procura o produto no catálogo global (vindo de produtos.js)
    const produto = typeof catalogoProdutos !== "undefined"
        ? catalogoProdutos.find(p => p.id === produtoId)
        : null;

    // 3. Se o produto não existir, exibe a tela de erro com botão de retorno seguro
    if (!produto) {
        document.getElementById("conteudo").innerHTML = `
            <div class="container py-5 text-center my-auto">
              <h2 class="fw-bold mb-3">Produto não encontrado</h2>
              <p class="text-secondary mb-4">O item que procura não existe ou foi removido.</p>
              <button onclick="voltarParaVitrine()" class="btn btn-dark px-4 py-2">Voltar para a vitrine</button>
            </div>
        `;
        return;
    }

    // 4. Preenche os elementos da página com os dados dinâmicos do produto
    const setElementText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    setElementText("breadcrumbNome", produto.nome);
    setElementText("produtoNome", produto.nome);
    setElementText("produtoCategoria", produto.categoria);
    setElementText("produtoDescricao", produto.descricao);
    setElementText("produtoPreco", `R$ ${produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
    setElementText("produtoIcone", produto.icone);

    // 5. Preenche as regras do desafio atendidas
    const containerRegras = document.getElementById("produtoRegras");
    if (containerRegras && produto.regrasAtendidas) {
        containerRegras.innerHTML = produto.regrasAtendidas
            .map(r => `<span class="badge bg-light text-dark border">${r}</span>`)
            .join("");
    }

    // 6. Configura o botão de compra para salvar no sessionStorage e avançar para o checkout
    const btnComprar = document.getElementById("btnComprar");
    const inputQuantidade = document.getElementById("quantidade");

    btnComprar?.addEventListener("click", () => {
        const qtd = inputQuantidade ? parseInt(inputQuantidade.value) || 1 : 1;

        sessionStorage.setItem("produtoNome", produto.nome);
        sessionStorage.setItem("produtoPreco", produto.preco);
        sessionStorage.setItem("quantidade", qtd);

        window.location.href = "checkout.html";
    });
});

// Função global auxiliar para garantir o redirecionamento correto à vitrine
function voltarParaVitrine() {
    // Tenta voltar para index.html na mesma pasta, ou redireciona pelo histórico se preferir
    window.location.href = "index.html";
}