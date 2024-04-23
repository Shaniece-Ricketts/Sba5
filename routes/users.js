const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

// GET all users
router.get('/', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  res.json(users);
});

// POST a new user
router.post('/', (req, res) => {
  const newUser = req.body;
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  res.status(201).json(newUser);
});

// PUT/UPDATE a user by ID
router.put('/:userId', (req, res) => {
  const userId = req.params.userId;
  const updatedUser = req.body;
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  const index = users.findIndex(user => user.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    res.json(users[index]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// DELETE a user by ID
router.delete('/:userId', (req, res) => {
  const userId = req.params.userId;
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  const index = users.findIndex(user => user.id === userId);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    res.json(deletedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

module.exports = router;
