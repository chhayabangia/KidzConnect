const db = require()
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('../client/dist'))
// Basic route
app.get('/', (req, res) => {
  res.send('KidzConnect API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// Routes
const userRoutes = require('./routes/api/userRoutes');



const userRoutes = require('./routes/users');
app.use('/users', userRoutes); 