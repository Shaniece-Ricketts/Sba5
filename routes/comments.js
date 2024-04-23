// comments.js

const express = require('express');
const router = express.Router();

// Sample data for comments
let comments = [
  { id: 1, recipeId: 1, text: 'This jerk chicken recipe is amazing!' },
  { id: 2, recipeId: 1, text: 'Best jerk chicken I ever had!' },
  { id: 3, recipeId: 2, text: 'Ackee and saltfish is my favorite dish!' },
  { id: 4, recipeId: 3, text: 'Curry goat is delicious, but spicy!' },
];

// GET all comments for a specific recipe
router.get('/:recipeId', (req, res) => {
  const { recipeId } = req.params;
  const recipeComments = comments.filter(comment => comment.recipeId === parseInt(recipeId));
  res.json(recipeComments);
});

// POST a new comment for a specific recipe
router.post('/', (req, res) => {
  const { recipeId, text } = req.body;
  if (!recipeId || !text) {
    return res.status(400).json({ error: 'Recipe ID and text are required' });
  }

  const newComment = {
    id: comments.length + 1,
    recipeId: parseInt(recipeId),
    text
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

// DELETE a comment
router.delete('/:commentId', (req, res) => {
  const { commentId } = req.params;
  const index = comments.findIndex(comment => comment.id === parseInt(commentId));
  if (index === -1) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  comments.splice(index, 1);
  res.sendStatus(204);
});

module.exports = router;
