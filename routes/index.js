// index.js

document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from the server and render it
    fetchRecipes();
    
    // Add event listener to the form for adding a new recipe
    const form = document.getElementById('addRecipeForm');
    form.addEventListener('submit', handleFormSubmit);
  });
  
  async function fetchRecipes() {
    try {
      const response = await fetch('/recipes');
      const recipes = await response.json();
      renderRecipes(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }
  
  function renderRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';
    
    recipes.forEach(recipe => {
      const li = document.createElement('li');
      li.textContent = `${recipe.name} - ${recipe.category}`;
      recipeList.appendChild(li);
    });
  }
  
  async function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const category = formData.get('category');
    
    try {
      const response = await fetch('/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, category })
      });
      
      if (response.ok) {
        fetchRecipes();
        event.target.reset();
      } else {
        console.error('Failed to add recipe');
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  }
  