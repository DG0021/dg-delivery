// Verifica se há um carrinho salvo no localStorage, caso contrário, cria um carrinho vazio
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Função para adicionar item ao carrinho
function addToCart(name, price) {
    // Cria um objeto item com o nome e preço
    const item = { name, price };

    // Adiciona o item ao carrinho
    cart.push(item);

    // Armazena o carrinho atualizado no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mostra no console o carrinho para debug
    console.log(cart);
}

// Função para remover item do carrinho
function removeFromCart(index) {
    // Remove o item pelo índice
    cart.splice(index, 1);

    // Atualiza o localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza a exibição do carrinho
    displayCart();
}

// Adiciona eventos aos botões de "Adicionar ao Carrinho"
const buttons = document.querySelectorAll('.add-to-cart');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const name = e.target.getAttribute('data-name');  // Pega o nome do item
        const price = parseFloat(e.target.getAttribute('data-price'));  // Pega o preço do item

        // Chama a função para adicionar o item ao carrinho
        addToCart(name, price);

        // Exibe uma mensagem de confirmação ao usuário
        alert(`${name} adicionado ao carrinho!`);
    });
});

// Função para exibir os itens no carrinho
function displayCart() {
    const cartContainer = document.getElementById('cart-items');

    // Limpa o conteúdo atual do carrinho antes de exibir os itens
    cartContainer.innerHTML = '';

    // Se o carrinho estiver vazio, exibe uma mensagem
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Carrinho vazio</p>';
    } else {
        // Se houver itens, exibe cada um deles com a opção de remover
        cart.forEach((item, index) => {
            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <p>${item.name} - R$ ${item.price.toFixed(2)}</p>
                <button class="remove-item" data-index="${index}">Remover</button>
            `;
            cartContainer.appendChild(div);
        });

        // Adiciona eventos de remoção de itens
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
    }

    // Exibe o total no carrinho
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    document.getElementById('cart-total').innerText = `Total: R$ ${total.toFixed(2)}`;
}

// Exibe o carrinho na página de carrinho ao carregar
if (window.location.pathname.includes('carrinho.html')) {
    displayCart();
}
