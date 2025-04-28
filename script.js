const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const recipesContainer = document.getElementById('recipes-container');

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
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
            <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
        `;
        recipesContainer.appendChild(recipeCard);
    });
}

function searchRecipes() {
    const query = searchInput.value.toLowerCase();
    const filteredRecipes = sampleRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(query) ||
        recipe.ingredients.toLowerCase().includes(query)
    );
    displayRecipes(filteredRecipes);
}

searchBtn.addEventListener('click', searchRecipes);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchRecipes();
    }
});

displayRecipes(sampleRecipes);