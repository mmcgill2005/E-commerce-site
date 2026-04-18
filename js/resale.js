const searchBar = document.getElementById("searchBar");
const categoryCards = document.querySelectorAll(".resale-category-card");
// Select search bar
if (searchBar) {
    // Filter categories based on search text
    searchBar.addEventListener("keyup", function () {
        const value = searchBar.value.toLowerCase();
        // Select all resale category cards
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