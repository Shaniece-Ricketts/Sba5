const express = require('express');
const bodyParser = require('body-parser');
const loggingMiddleware = require('./middleware/loggingMiddleware');
const authenticationMiddleware = require('./middleware/authenticationMiddleware');
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
const commentsRouter = require('./routes/comments');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(loggingMiddleware);
app.use(authenticationMiddleware);

// Serve static files
app.use(express.static('public'));

// Routes
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);
app.use('/comments', commentsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Render view
app.get('/', (req, res) => {
  // Sample Jamaican recipes
  const recipes = [
    { id: 1, name: 'Jerk Chicken', category: 'Main Course' },
    { id: 2, name: 'Ackee and Saltfish', category: 'Main Course' },
    { id: 3, name: 'Curry Goat', category: 'Main Course' },
    { id: 4, name: 'Escovitch Fish', category: 'Main Course' },
    { id: 5, name: 'Jamaican Patties', category: 'Appetizer' },
    { id: 6, name: 'Rice and Peas', category: 'Side Dish' },
    { id: 7, name: 'Jamaican Rum Cake', category: 'Dessert' } // Jamaican dessert
  ];
  res.render('index', { recipes });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
