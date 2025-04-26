const searchBox = document.getElementById("searchBox");
const recipeContainer = document.getElementById("recipe-container");
const categorySelect = document.getElementById("category-select");
const areaSelect = document.getElementById("area-select");
const letterSelect = document.getElementById("letter-select");

window.addEventListener("DOMContentLoaded", () => {
    searchRecipe('chicken');
    loadDropdown("https://www.themealdb.com/api/json/v1/1/categories.php", "categories", categorySelect);
    loadDropdown("https://www.themealdb.com/api/json/v1/1/list.php?a=list", "meals", areaSelect);
    generateLetterDropdown();

});

// dropdown data for categories and areas
function loadDropdown(url, key, selectElement) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data[key].forEach(item => {
                const value = item.strCategory || item.strArea;
                createOption(selectElement, value);
            });
        });
}

function createOption(selectElement, name) {
    const option = document.createElement("option");
    option.textContent = name;
    option.value = name;
    selectElement.appendChild(option);
}

// Repeated meals function into recipe container
function generateMeal(meals) {
    recipeContainer.innerHTML = "";
    if (!meals || meals.length === 0) {
        recipeContainer.innerHTML = "<p>No recipes found!</p>";
        return;
    }

    meals.forEach(meal => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <button class="view-btn" onclick='${meal.idMeal ? `getMealById(${meal.idMeal})` : `showDetails(${JSON.stringify(meal)})`}'>View Details</button>
        `;
        recipeContainer.appendChild(card);
    });
}

// Search by name
function searchRecipe(query) {
    if (!query.trim()) {
        alert("Please enter a recipe name!");
        return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(res => res.json())
        .then(data => generateMeal(data.meals))
        .catch(err => console.error("Error:", err));
}

// View meal recipe in seprate div
function showDetails(meal) {
    document.getElementById("modal-title").textContent = meal.strMeal;
    document.getElementById("modal-img").src = meal.strMealThumb;
    document.getElementById("modal-instructions").textContent = meal.strInstructions;

    const ingredientsList = document.getElementById("modal-ingredients");
    ingredientsList.innerHTML = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            const li = document.createElement("li");
            li.textContent = `${ingredient} - ${measure}`;
            ingredientsList.appendChild(li);
        }
    }
    document.getElementById("recipe-modal").style.display = "flex";
}

// close icon
function closeModal() {
    document.getElementById("recipe-modal").style.display = "none";
}

// Get full meal details by ID (used in filters)
function getMealById(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => showDetails(data.meals[0]));
}

// Search meals by first letter

// Generate A-Z options
function generateLetterDropdown() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    letters.forEach(letter => {
        const option = document.createElement("option");
        option.value = letter;
        option.textContent = letter;
        letterSelect.appendChild(option);
    });
}

// Add event listener for dropdown
letterSelect.addEventListener("change", () => {
    const selectedLetter = letterSelect.value;
    if (selectedLetter) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${selectedLetter}`)
            .then(res => res.json())
            .then(data => generateMeal(data.meals));
    }
});


// Random meal (Suprise me)
document.getElementById("random-btn").addEventListener("click", () => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(res => res.json())
        .then(data => showDetails(data.meals[0]));
});

// Filter by category
categorySelect.addEventListener("change", () => {
    const selected = categorySelect.value;
    if (selected) {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selected}`)
            .then(res => res.json())
            .then(data => generateMeal(data.meals));
    }
});

// Filter by area
areaSelect.addEventListener("change", () => {
    const selected = areaSelect.value;
    if (selected) {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selected}`)
            .then(res => res.json())
            .then(data => generateMeal(data.meals));
    }
});
