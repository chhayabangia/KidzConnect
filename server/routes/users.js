const express = require('express');
const router = express.Router();

// GET all users
router.get('/', (req, res) => {
  res.json({ message: 'GET all users' });
});

// GET user by ID
router.get('/:id', (req, res) => {
  res.json({ message: `GET user with ID ${req.params.id}` });
});

// POST new user
router.post('/', (req, res) => {
  res.json({ message: 'POST new user', data: req.body });
});

// PUT update user
router.put('/:id', (req, res) => {
  res.json({ message: `PUT update user with ID ${req.params.id}`, data: req.body });
});

// DELETE user
router.delete('/:id', (req, res) => {
  res.json({ message: `DELETE user with ID ${req.params.id}` });
});

module.exports = router;
