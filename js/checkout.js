// Recupera o carrinho do localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Função para exibir os itens do carrinho no checkout
function displayCheckoutItems() {
    const checkoutContainer = document.getElementById('checkout-items');

    // Se o carrinho estiver vazio, exibe uma mensagem
    if (cart.length === 0) {
        checkoutContainer.innerHTML = '<p>Carrinho vazio. Adicione itens para continuar.</p>';
    } else {
        // Se houver itens, exibe cada um deles
        checkoutContainer.innerHTML = ''; // Limpa a lista de itens
        cart.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('checkout-item');
            div.innerHTML = `<p>${item.name} - R$ ${item.price.toFixed(2)}</p>`;
            checkoutContainer.appendChild(div);
        });
    }

    // Calcula o total do carrinho
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    document.getElementById('checkout-total').innerText = `Total: R$ ${total.toFixed(2)}`;
}

// Exibe os itens do carrinho ao carregar a página de checkout
if (window.location.pathname.includes('checkout.html')) {
    displayCheckoutItems();
}

// Lida com o envio do formulário de checkout
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Recupera os dados do formulário
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.getElementById('payment').value;

    // Simula a finalização da compra
    alert(`Obrigado pela sua compra, ${name}!\n\nDetalhes do Pedido:\nEndereço: ${address}\nTelefone: ${phone}\nForma de Pagamento: ${paymentMethod}`);

    // Limpa o carrinho após a finalização
    localStorage.removeItem('cart');
    window.location.href = 'index.html'; // Redireciona de volta para a página inicial
});
