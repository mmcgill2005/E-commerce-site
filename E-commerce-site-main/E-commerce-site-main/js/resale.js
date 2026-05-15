const searchBar = document.getElementById("searchBar");
const categoryCards = document.querySelectorAll(".resale-category-card");
const resaleForm = document.getElementById("addResaleItemForm");
const itemNameInput = document.getElementById("itemName");
const itemPriceInput = document.getElementById("itemPrice");
const itemImageFileInput = document.getElementById("itemImageFile");
const itemImageInput = document.getElementById("itemImage");
const itemSportSelect = document.getElementById("itemSport");
const itemGenderSelect = document.getElementById("itemGender");
const itemConditionSelect = document.getElementById("itemCondition");
const addItemMessage = document.getElementById("addItemMessage");

function getSavedResaleProducts() {
    return JSON.parse(localStorage.getItem("newProducts")) || [];
}

function saveResaleProducts(products) {
    localStorage.setItem("newProducts", JSON.stringify(products));
}

function makeProductId(name) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return `${slug}-${Date.now()}`;
}

function saveItemWithImage(imageData) {
    const name = itemNameInput.value.trim();
    const price = parseFloat(itemPriceInput.value);
    const sport = itemSportSelect.value;
    const gender = itemGenderSelect.value;
    const condition = itemConditionSelect.value;
    const tag = condition === "new" ? "Brand New" : "Used";

    if (!name || !imageData || Number.isNaN(price) || price < 0) {
        addItemMessage.textContent = "Please complete all fields with valid values.";
        addItemMessage.style.color = "#dc2626";
        return;
    }

    const newProduct = {
        id: makeProductId(name),
        name,
        sport,
        gender,
        condition,
        tag,
        price,
        image: imageData
    };

    const existingProducts = getSavedResaleProducts();
    existingProducts.push(newProduct);
    saveResaleProducts(existingProducts);

    addItemMessage.textContent = "Item added successfully. Refresh the Products page to see it in shop listings.";
    addItemMessage.style.color = "#16a34a";
    resaleForm.reset();
}

if (resaleForm) {
    resaleForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const imageUrl = itemImageInput.value.trim();
        const imageFile = itemImageFileInput.files[0];

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function () {
                saveItemWithImage(reader.result);
            };
            reader.readAsDataURL(imageFile);
        } else if (imageUrl) {
            saveItemWithImage(imageUrl);
        } else {
            addItemMessage.textContent = "Please upload an image or provide a valid image URL.";
            addItemMessage.style.color = "#dc2626";
        }
    });
}

if (searchBar) {
    searchBar.addEventListener("keyup", function () {
        const value = searchBar.value.toLowerCase();
        categoryCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(value) ? "block" : "none";
        });
    });
}