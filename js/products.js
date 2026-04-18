// Get filter dropdown controls
const sportFilter = document.getElementById("sportFilter");
const genderFilter = document.getElementById("genderFilter");
const conditionFilter = document.getElementById("conditionFilter");
// Select all product cards
const productCards = document.querySelectorAll(".store-product-card");
// Filters products based on selected criteria
function filterProducts() {
    // Store dropdown selections
    const selectedSport = sportFilter.value;
    const selectedGender = genderFilter.value;
    const selectedCondition = conditionFilter.value;
      // Loop through every product card
    productCards.forEach(card => {
         // Read data attributes from each product
        const cardSport = card.dataset.sport;
        const cardGender = card.dataset.gender;
        const cardCondition = card.dataset.condition;
        // Compare selections to product data
        const matchSport =
            selectedSport === "all" ||
            cardSport === selectedSport;

        const matchGender =
            selectedGender === "all" ||
            cardGender === selectedGender;

        const matchCondition =
            selectedCondition === "all" ||
            cardCondition === selectedCondition;
        // Show matching products,
        // hide non-matching products
        if (matchSport && matchGender && matchCondition) {
            card.style.display = "block";
        }
        else {
            card.style.display = "none";
        }

    });
}
// Run filtering when dropdown changes
sportFilter.addEventListener("change", filterProducts);
genderFilter.addEventListener("change", filterProducts);
conditionFilter.addEventListener("change", filterProducts);