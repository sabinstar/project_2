const apiKey = 'ed0f10c4aed74b1a85e28038ba09b669';
const recipeContainer = document.getElementById('items');
const input = document.getElementById('inputName');
const msg = document.getElementById('msg');
const suggestions = document.getElementById('suggestions');
const favoritesContainer = document.getElementById('favorites');

// Add event listener for the search button click
document.getElementById("button").addEventListener('click', fetchRecipes);
// On page load, load favorites and random recipes
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    loadRandomRecipes(); // Load random recipes when the page loads
});

// Auto-suggest feature when typing in the input field
input.addEventListener('input', () => {
    const query = input.value;
    if (query.length < 2) {
        suggestions.innerHTML = "";
        return;
    }
    // Fetch recipe suggestions based on the query
    fetch(`https://api.spoonacular.com/recipes/autocomplete?number=5&query=${query}&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Show suggestions as a list of clickable items
            suggestions.innerHTML = data.map(item => `<a href="#" class="list-group-item list-group-item-action" onclick="selectSuggestion('${item.title}')">${item.title}</a>`).join('');
        })
        .catch(error => {
            console.error('Error fetching suggestions:', error);
        });
});

// Select a suggestion and trigger the recipe fetch
function selectSuggestion(title) {
    input.value = title;
    suggestions.innerHTML = "";
    fetchRecipes();
}

// Fetch recipes based on the search input
function fetchRecipes() {
    const query = input.value;
    if (query.trim() === '') {
        msg.style.display = 'none';
        recipeContainer.innerHTML = '';
        return;
    }
    console.log('Searching for:', query);  // Debugging line to check what is being searched

    // Fetch recipes from the Spoonacular API based on the query
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log('API response:', data);  // Debugging line to check the API response
            recipeContainer.innerHTML = '';
            if (data.results.length === 0) {
                msg.style.display = 'block'; // Show message if no results found
            } else {
                msg.style.display = 'none';  // Hide message if results found
                // Display the recipes in the UI
                data.results.forEach(recipe => {
                    const card = document.createElement('div');
                    card.className = 'card singleItem';
                    card.innerHTML = `
                        <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${recipe.title}</h5>
                            <button class="btn btn-outline-primary" onclick="fetchRecipeDetails(${recipe.id})" data-bs-toggle="modal" data-bs-target="#recipeModal">View Details</button>
                            <button class="btn btn-warning mt-2" onclick="addToFavorites(${recipe.id}, '${recipe.title}', '${recipe.image}')">Add to Favorites</button>
                        </div>
                    `;
                    recipeContainer.appendChild(card);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            msg.style.display = 'block';  // Show message in case of an error
            msg.innerHTML = `<h3>Error occurred while fetching recipes. Please try again later.</h3>`;
        });
}

// Fetch recipe details when clicked to view more information
function fetchRecipeDetails(id) {
    fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(recipe => {
            // Populate modal with recipe details
            document.getElementById('details').innerHTML = `
                <img src="${recipe.image}" class="img-fluid mb-3" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <p>${recipe.summary}</p>
                <h5>Ingredients</h5>
                <ul>${recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('')}</ul>
                <h5>Instructions</h5>
                <p>${recipe.instructions}</p>
                <h5>Nutritional Information</h5>
                <p>Calories: ${recipe.nutrition.nutrients.find(n => n.name === 'Calories').amount} kcal</p>
            `;
        })
        .catch(error => console.error('Error fetching recipe details:', error));
}

// Add a recipe to favorites and save it in local storage
function addToFavorites(id, title, image) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const button = event.target; // Get reference to the clicked button

    // Check if the recipe is already in the favorites
    if (!favorites.some(fav => fav.id === id)) {
        // If not, add to favorites
        favorites.push({ id, title, image });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites();
        
        // Update button text and style
        button.innerText = 'Added to Favorites';
        button.classList.remove('btn-warning');
        button.classList.add('btn-success');
    }
}

// Load favorites from local storage and display them
function loadFavorites() {
    favoritesContainer.innerHTML = '';
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.forEach(favorite => {
        const card = document.createElement('div');
        card.className = 'card singleItem';
        card.innerHTML = `
            <img src="${favorite.image}" class="card-img-top" alt="${favorite.title}">
            <div class="card-body text-center">
                <h5 class="card-title">${favorite.title}</h5>
                <button class="btn btn-danger mt-2" onclick="removeFromFavorites(${favorite.id})">Remove from Favorites</button>
            </div>
        `;
        favoritesContainer.appendChild(card);
    });
}

// Remove a recipe from the favorites
function removeFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
}

// Load random recipes on page load
function loadRandomRecipes() {
    fetch(`https://api.spoonacular.com/recipes/random?number=5&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            data.recipes.forEach(recipe => {
                const card = document.createElement('div');
                card.className = 'card singleItem';
                card.innerHTML = `
                    <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${recipe.title}</h5>
                        <button class="btn btn-outline-primary" onclick="fetchRecipeDetails(${recipe.id})" data-bs-toggle="modal" data-bs-target="#recipeModal">View Details</button>
                        <button class="btn btn-warning mt-2" onclick="addToFavorites(${recipe.id}, '${recipe.title}', '${recipe.image}')">Add to Favorites</button>
                    </div>
                `;
                recipeContainer.appendChild(card);  // Append random recipes to the main container
            });
        })
        .catch(error => {
            console.error('Error fetching random recipes:', error);
        });
}
