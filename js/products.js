const productGrid = document.querySelector(".products-grid");
const sportFilter = document.getElementById("sportFilter");
const genderFilter = document.getElementById("genderFilter");
const conditionFilter = document.getElementById("conditionFilter");

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    saveCart(cart);
    alert("Item added to cart.");
}

function renderProducts(productList) {
    productGrid.innerHTML = "";

    productList.forEach(product => {
        productGrid.innerHTML += `
            <div class="store-product-card"
                 data-sport="${product.sport}"
                 data-gender="${product.gender}"
                 data-condition="${product.condition}">
                 
                <div class="store-image-container">
                    <span class="item-badge">${product.tag}</span>
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <div class="store-product-info">
                    <h3>${product.name}</h3>
                    <p class="store-price">$${product.price.toFixed(2)}</p>
                    <button class="shop-btn add-to-cart-btn" data-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    });

    document.querySelectorAll(".add-to-cart-btn").forEach(button => {
        button.addEventListener("click", () => {
            addToCart(button.dataset.id);
        });
    });
}

function filterProducts() {
    const selectedSport = sportFilter.value;
    const selectedGender = genderFilter.value;
    const selectedCondition = conditionFilter.value;

    const filteredProducts = products.filter(product => {
        const matchSport = selectedSport === "all" || product.sport === selectedSport;
        const matchGender = selectedGender === "all" || product.gender === selectedGender;
        const matchCondition = selectedCondition === "all" || product.condition === selectedCondition;

        return matchSport && matchGender && matchCondition;
    });

    renderProducts(filteredProducts);
}

sportFilter.addEventListener("change", filterProducts);
genderFilter.addEventListener("change", filterProducts);
conditionFilter.addEventListener("change", filterProducts);

renderProducts(products);