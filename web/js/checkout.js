// js/checkout.js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Recupera os dados do produto armazenados na sessão
    const produtoNome = sessionStorage.getItem("produtoNome");
    const produtoPreco = parseFloat(sessionStorage.getItem("produtoPreco"));
    const quantidade = parseInt(sessionStorage.getItem("quantidade")) || 1;

    // 2. Elementos do resumo
    const elNome = document.getElementById("resumoNomeProduto");
    const elPrecoUnitario = document.getElementById("resumoPrecoUnitario");
    const elQuantidade = document.getElementById("resumoQuantidade");
    const elTotal = document.getElementById("resumoTotal");

    // 3. Se não houver produto na sessão, avisa o utilizador e bloqueia
    if (!produtoNome || isNaN(produtoPreco)) {
        const resumoBox = document.querySelector(".summary-box");
        if (resumoBox) {
            resumoBox.innerHTML = `
                <h2 class="h4 mb-3">Resumo do Pedido</h2>
                <p class="text-warning mb-3">Nenhum produto selecionado.</p>
                <a href="index.html" class="btn btn-outline-light btn-sm w-100">Escolher produtos</a>
            `;
        }
        return;
    }

    // 4. Preenche o resumo corretamente com o produto real escolhido
    if (elNome) elNome.textContent = produtoNome;
    if (elPrecoUnitario) elPrecoUnitario.textContent = `R$ ${produtoPreco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elQuantidade) elQuantidade.textContent = quantidade;

    const total = produtoPreco * quantidade;
    if (elTotal) elTotal.textContent = `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    // 5. Funcionalidade de busca de CEP (ViaCEP)
    const cepInput = document.getElementById("cep");
    const btnBuscarCep = document.getElementById("buscarCep");
    const cepFeedback = document.getElementById("cepFeedback");

    const preencherEndereco = (dados) => {
        if (dados.erro) {
            cepFeedback.innerHTML = '<span class="text-danger">CEP não encontrado.</span>';
            return;
        }
        document.getElementById("logradouro").value = dados.logradouro || "";
        document.getElementById("bairro").value = dados.bairro || "";
        document.getElementById("cidade").value = dados.localidade || "";
        document.getElementById("estado").value = dados.uf || "";
        cepFeedback.innerHTML = '<span class="text-success">Endereço preenchido automaticamente!</span>';
    };

    btnBuscarCep?.addEventListener("click", () => {
        let cep = cepInput.value.replace(/\D/g, "");
        if (cep.length !== 8) {
            cepFeedback.innerHTML = '<span class="text-danger">CEP inválido. Digite 8 números.</span>';
            return;
        }
        cepFeedback.innerHTML = '<span class="text-info">A buscar CEP...</span>';
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then(data => preencherEndereco(data))
            .catch(() => {
                cepFeedback.innerHTML = '<span class="text-danger">Erro ao consultar o CEP.</span>';
            });
    });

    // 6. Validação e submissão do formulário de checkout
    const form = document.getElementById("checkoutForm");
    form?.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById("email");
        const emailValor = emailInput ? emailInput.value.trim() : "";

        // Validação customizada para exigir @gmail.com
        if (!emailValor.endsWith("@gmail.com")) {
            emailInput.setCustomValidity("O e-mail deve terminar com @gmail.com");
            form.classList.add("was-validated");
            return;
        } else {
            emailInput.setCustomValidity("");
        }

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        // Salva os dados do cliente para a tela de sucesso
        const nomeCliente = document.getElementById("nome").value;
        sessionStorage.setItem("clienteNome", nomeCliente);
        
        // Gera um número de pedido aleatório
        const numeroAleatorio = "PED-" + Math.floor(100000 + Math.random() * 900000);
        sessionStorage.setItem("pedidoNumero", numeroAleatorio);

        // Limpa os dados da sessão e avança para o sucesso
        sessionStorage.removeItem("produtoNome");
        sessionStorage.removeItem("produtoPreco");
        sessionStorage.removeItem("quantidade");

        window.location.href = "sucesso.html";
    });
});

// Funções auxiliares para formatação de telefone
function somenteNumeros(valor) {
    return valor.replace(/\D/g, "");
}

function formatarTelefone(valor) {
  const numeros = somenteNumeros(valor).slice(0, 11);
  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  if (numeros.length <= 10) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

const telefoneInput = document.querySelector("#telefone");
telefoneInput?.addEventListener("input", (e) => {
  e.target.value = formatarTelefone(e.target.value);
});
