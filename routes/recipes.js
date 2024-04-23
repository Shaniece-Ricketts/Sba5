const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const recipesFilePath = path.join(__dirname, '..', 'data', 'recipes.json');

// GET all recipes
router.get('/', (req, res) => {
  const recipes = JSON.parse(fs.readFileSync(recipesFilePath, 'utf8'));
  res.json(recipes);
});

// POST a new recipe
router.post('/', (req, res) => {
  const newRecipe = req.body;
  const recipes = JSON.parse(fs.readFileSync(recipesFilePath, 'utf8'));
  recipes.push(newRecipe);
  fs.writeFileSync(recipesFilePath, JSON.stringify(recipes, null, 2));
  res.status(201).json(newRecipe);
});

// PUT/UPDATE a recipe by ID
router.put('/:recipeId', (req, res) => {
  const recipeId = req.params.recipeId;
  const updatedRecipe = req.body;
  const recipes = JSON.parse(fs.readFileSync(recipesFilePath, 'utf8'));
  const index = recipes.findIndex(recipe => recipe.id === recipeId);
  if (index !== -1) {
    recipes[index] = { ...recipes[index], ...updatedRecipe };
    fs.writeFileSync(recipesFilePath, JSON.stringify(recipes, null, 2));
    res.json(recipes[index]);
  } else {
    res.status(404).json({ error: 'Recipe not found' });
  }
});

// DELETE a recipe by ID
router.delete('/:recipeId', (req, res) => {
  const recipeId = req.params.recipeId;
  const recipes = JSON.parse(fs.readFileSync(recipesFilePath, 'utf8'));
  const index = recipes.findIndex(recipe => recipe.id === recipeId);
  if (index !== -1) {
    const deletedRecipe = recipes.splice(index, 1)[0];
    fs.writeFileSync(recipesFilePath, JSON.stringify(recipes, null, 2));
    res.json(deletedRecipe);
  } else {
    res.status(404).json({ error: 'Recipe not found' });
  }
});

module.exports = router;
