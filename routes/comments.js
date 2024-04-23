const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const commentsFilePath = path.join(__dirname, '..', 'data', 'comments.json');

// GET all comments
router.get('/', (req, res) => {
  const comments = JSON.parse(fs.readFileSync(commentsFilePath, 'utf8'));
  res.json(comments);
});

// POST a new comment
router.post('/', (req, res) => {
  const newComment = req.body;
  const comments = JSON.parse(fs.readFileSync(commentsFilePath, 'utf8'));
  comments.push(newComment);
  fs.writeFileSync(commentsFilePath, JSON.stringify(comments, null, 2));
  res.status(201).json(newComment);
});

// PUT/UPDATE a comment by ID
router.put('/:commentId', (req, res) => {
  const commentId = req.params.commentId;
  const updatedComment = req.body;
  const comments = JSON.parse(fs.readFileSync(commentsFilePath, 'utf8'));
  const index = comments.findIndex(comment => comment.id === commentId);
  if (index !== -1) {
    comments[index] = { ...comments[index], ...updatedComment };
    fs.writeFileSync(commentsFilePath, JSON.stringify(comments, null, 2));
    res.json(comments[index]);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

// DELETE a comment by ID
router.delete('/:commentId', (req, res) => {
  const commentId = req.params.commentId;
  const comments = JSON.parse(fs.readFileSync(commentsFilePath, 'utf8'));
  const index = comments.findIndex(comment => comment.id === commentId);
  if (index !== -1) {
    const deletedComment = comments.splice(index, 1)[0];
    fs.writeFileSync(commentsFilePath, JSON.stringify(comments, null, 2));
    res.json(deletedComment);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

module.exports = router;
