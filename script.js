const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const recipesContainer = document.getElementById('recipes-container');
const allRecipesBtn = document.getElementById('all-recipes-btn');
const favoritesBtn = document.getElementById('favorites-btn');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentFilter = 'all';

const sampleRecipes = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        ingredients: "spaghetti, eggs, pancetta, parmesan, pepper",
        cookTime: "15 mins",
        difficulty: "Easy"
    },
    {
        id: 2,
        title: "Chicken Tikka Masala",
        ingredients: "chicken, yogurt, tomatoes, spices, cream",
        cookTime: "45 mins",
        difficulty: "Medium"
    },
    {
        id: 3,
        title: "Caesar Salad",
        ingredients: "lettuce, croutons, parmesan, anchovies",
        cookTime: "10 mins",
        difficulty: "Easy"
    },
    {
        id: 4,
        title: "Beef Stir Fry",
        ingredients: "beef, vegetables, soy sauce, garlic, ginger",
        cookTime: "20 mins",
        difficulty: "Easy"
    },
    {
        id: 5,
        title: "Mushroom Risotto",
        ingredients: "arborio rice, mushrooms, stock, wine, parmesan",
        cookTime: "35 mins",
        difficulty: "Medium"
    },
    {
        id: 6,
        title: "Fish Tacos",
        ingredients: "white fish, tortillas, cabbage, lime, cilantro",
        cookTime: "25 mins",
        difficulty: "Easy"
    }
];

function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';
    
    recipes.forEach(recipe => {
        const isFavorite = favorites.includes(recipe.id);
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
            <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
            <button class="favorite-btn ${isFavorite ? 'favorited' : ''}" 
                    onclick="toggleFavorite(${recipe.id})">
                ${isFavorite ? '❤️' : '🤍'} ${isFavorite ? 'Favorited' : 'Add to Favorites'}
            </button>
        `;
        recipesContainer.appendChild(recipeCard);
    });
}

function searchRecipes() {
    const query = searchInput.value.toLowerCase();
    let filteredRecipes = sampleRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(query) ||
        recipe.ingredients.toLowerCase().includes(query)
    );
    
    if (currentFilter === 'favorites') {
        filteredRecipes = filteredRecipes.filter(recipe => favorites.includes(recipe.id));
    }
    
    displayRecipes(filteredRecipes);
}

function toggleFavorite(recipeId) {
    if (favorites.includes(recipeId)) {
        favorites = favorites.filter(id => id !== recipeId);
    } else {
        favorites.push(recipeId);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    if (currentFilter === 'all') {
        searchRecipes();
    } else {
        showFavorites();
    }
}

function showAllRecipes() {
    currentFilter = 'all';
    allRecipesBtn.classList.add('active');
    favoritesBtn.classList.remove('active');
    searchRecipes();
}

function showFavorites() {
    currentFilter = 'favorites';
    favoritesBtn.classList.add('active');
    allRecipesBtn.classList.remove('active');
    const favoriteRecipes = sampleRecipes.filter(recipe => favorites.includes(recipe.id));
    displayRecipes(favoriteRecipes);
}

searchBtn.addEventListener('click', searchRecipes);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchRecipes();
    }
});

allRecipesBtn.addEventListener('click', showAllRecipes);
favoritesBtn.addEventListener('click', showFavorites);

displayRecipes(sampleRecipes);