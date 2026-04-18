// Select all Add to Cart buttons 
const buttons = document.querySelectorAll(".add-cart-btn");
// Select cart message area
const cartMessage = document.getElementById("cart-message");
// Add click behavior to each button
buttons.forEach(button => {
    button.addEventListener("click", () => {
        // Get product name
        const productName = button.getAttribute("data-product");
        // Display confirmation message
        cartMessage.textContent = `${productName} was added to the cart.`;
    });
});