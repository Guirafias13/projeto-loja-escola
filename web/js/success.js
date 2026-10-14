// js/success.js
document.addEventListener("DOMContentLoaded", () => {
  const clienteNome = sessionStorage.getItem("clienteNome");
  const pedidoNumero = sessionStorage.getItem("pedidoNumero");

  const mensagemCliente = document.querySelector("#mensagemCliente");
  const elPedidoNumero = document.querySelector("#numeroPedido");

  if (clienteNome && mensagemCliente) {
    mensagemCliente.textContent = `Obrigado por comprar conosco, ${clienteNome}! Seu pedido foi processado com sucesso.`;
  }

  if (pedidoNumero && elPedidoNumero) {
    elPedidoNumero.textContent = pedidoNumero;
  }
});