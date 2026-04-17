const searchBar = document.getElementById("searchBar");
const categoryCards = document.querySelectorAll(".resale-category-card");

if (searchBar) {
    searchBar.addEventListener("keyup", function () {
        const value = searchBar.value.toLowerCase();

        categoryCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(value)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}