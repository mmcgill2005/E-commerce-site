const buttons = document.querySelectorAll(".add-cart-btn");
const cartMessage = document.getElementById("cart-message");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const productName = button.getAttribute("data-product");
        cartMessage.textContent = `${productName} was added to the cart.`;
    });
});