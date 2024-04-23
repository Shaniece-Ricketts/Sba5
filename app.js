const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const loggingMiddleware = require('./middleware/loggingMiddleware');
const authenticationMiddleware = require('./middleware/authenticationMiddleware');
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
const commentsRouter = require('./routes/comments');

const app = express();

// Sample data for Jamaican recipes
const recipes = [
  { id: 1, name: 'Jerk Chicken', category: 'Main Course', image: '/images/jerk-chicken.jpeg' },
  { id: 2, name: 'Ackee and Saltfish', category: 'Main Course', image: '/images/ackee-saltfish.jpeg' },
  { id: 3, name: 'Curry Goat', category: 'Main Course', image: '/images/curry-goat.jpeg' },
  { id: 4, name: 'Escovitch Fish', category: 'Main Course', image: '/images/escovitch-fish.jpeg' },
  { id: 5, name: 'Jamaican Patties', category: 'Appetizer', image: '/images/jamaican-patties.jpeg' },
  { id: 6, name: 'Rice and Peas', category: 'Side Dish', image: '/images/rice-peas.jpeg' },
  { id: 7, name: 'Jamaican Rum Cake', category: 'Dessert', image: '/images/jamaican-rum-cake.jpeg' }
];

// Middleware
app.use(bodyParser.json());
app.use(loggingMiddleware);
app.use(authenticationMiddleware);

// Serve static files
app.use(express.static('public'));
app.use('/images', express.static('images')); // For images

// Routes
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);
app.use('/comments', commentsRouter);

// Set view engine and directory
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('views', path.join(__dirname, 'views'));

// Render view with sample data
app.get('/', (req, res) => {
  res.render('index', { recipes });
});

// Render form for adding a new recipe
app.get('/recipes/new', (req, res) => {
    res.render('newRecipe');
  });
  
// Handle form submission to add a new recipe
app.post('/recipes', (req, res) => {
  const { name, category } = req.body;
  if (!name || !category) {
    return res.status(400).send('Name and category are required');
  }

  const newRecipe = {
    id: recipes.length + 1, // Generate a new ID
    name,
    category
  };

  // Add the new recipe to the list
  recipes.push(newRecipe);

  // Redirect back to the home page after adding the recipe
  res.redirect('/');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
