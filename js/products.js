const sportFilter = document.getElementById("sportFilter");
const genderFilter = document.getElementById("genderFilter");
const conditionFilter = document.getElementById("conditionFilter");

const productCards = document.querySelectorAll(".store-product-card");

function filterProducts() {

    const selectedSport = sportFilter.value;
    const selectedGender = genderFilter.value;
    const selectedCondition = conditionFilter.value;

    productCards.forEach(card => {

        const cardSport = card.dataset.sport;
        const cardGender = card.dataset.gender;
        const cardCondition = card.dataset.condition;

        const matchSport =
            selectedSport === "all" ||
            cardSport === selectedSport;

        const matchGender =
            selectedGender === "all" ||
            cardGender === selectedGender;

        const matchCondition =
            selectedCondition === "all" ||
            cardCondition === selectedCondition;

        if (matchSport && matchGender && matchCondition) {
            card.style.display = "block";
        }
        else {
            card.style.display = "none";
        }

    });
}

sportFilter.addEventListener("change", filterProducts);
genderFilter.addEventListener("change", filterProducts);
conditionFilter.addEventListener("change", filterProducts);