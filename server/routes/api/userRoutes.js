const express = require("express");
const router = express.Router();
const User = require("../../models/User");
// Alfonso's code
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// End of Alfonso's code

// Login function to authenticate a user
// Alfonso code
const login = async (req, res) => {
  const { username, password } = req.body;  // Extract username and password from request body

  // Find the user in the database by username
  const user = await User.findOne({
    where: { username },
  });

  // If user is not found, send an authentication failed response
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Compare the provided password with the stored hashed password
  const passwordIsValid = await bcrypt.compare(password, user.password);
  // If password is invalid, send an authentication failed response
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.json({ token });  // Send the token as a JSON response
};

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

// POST /login - Login a user 
// Alfonso's code
router.post('/login', login);  // Define the login route

module.exports = router;
//button;

router.get('/', (req, res) => {
  res.send('Users route');
});

module.exports = router; 