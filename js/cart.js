const cartItemsContainer = document.getElementById("cartItems");
const subtotalElement = document.getElementById("subtotal");
const taxElement = document.getElementById("tax");
const deliveryElement = document.getElementById("delivery");
const totalElement = document.getElementById("total");

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    const cart = getCart();
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        updateTotals(0);
        return;
    }

    let subtotal = 0;

    cart.forEach(cartItem => {
        const product = products.find(item => item.id === cartItem.id);
        if (!product) return;

        const itemTotal = product.price * cartItem.quantity;
        subtotal += itemTotal;

        cartItemsContainer.innerHTML += `
            <div class="product-card cart-product">
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h3>${product.name}</h3>
                    <p>${product.tag}</p>
                    <p>Qty: ${cartItem.quantity}</p>
                </div>
                <div class="cart-price">
                    $${itemTotal.toFixed(2)}
                    <button class="remove-btn" data-id="${product.id}">Remove</button>
                </div>
            </div>
        `;
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", () => {
            removeFromCart(button.dataset.id);
        });
    });

    updateTotals(subtotal);
}

function updateTotals(subtotal) {
    const total = subtotal + TAX_AMOUNT + DELIVERY_AMOUNT;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${TAX_AMOUNT.toFixed(2)}`;
    deliveryElement.textContent = `$${DELIVERY_AMOUNT.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
}

renderCart();