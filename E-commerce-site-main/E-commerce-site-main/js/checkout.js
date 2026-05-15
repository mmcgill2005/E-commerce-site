const checkoutItems = document.getElementById("checkoutItems");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutTax = document.getElementById("checkoutTax");
const checkoutDelivery = document.getElementById("checkoutDelivery");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutForm = document.getElementById("checkoutForm");

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function renderCheckout() {
    const cart = getCart();
    checkoutItems.innerHTML = "";

    let subtotal = 0;

    cart.forEach(cartItem => {
        const product = products.find(item => item.id === cartItem.id);

        if (!product) return;

        const itemTotal = product.price * cartItem.quantity;
        subtotal += itemTotal;

        checkoutItems.innerHTML += `
            <div class="mini-card product-card">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <div class="price">$${itemTotal.toFixed(2)}</div>
            </div>
        `;
    });

    const total = subtotal + TAX_AMOUNT + DELIVERY_AMOUNT;

    checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    checkoutTax.textContent = `$${TAX_AMOUNT.toFixed(2)}`;
    checkoutDelivery.textContent = `$${DELIVERY_AMOUNT.toFixed(2)}`;
    checkoutTotal.textContent = `$${total.toFixed(2)}`;
}

checkoutForm.addEventListener("submit", event => {
    event.preventDefault();
    alert("Order placed successfully. This is a demo checkout.");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
});

renderCheckout();