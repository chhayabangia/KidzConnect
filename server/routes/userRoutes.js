const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route to create a new user
router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
button;
