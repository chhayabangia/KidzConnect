require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json()); 
app.use(bodyParser.json());

// Basic route
app.get('/', (req, res) => {
  res.send('KidzConnect API');
});

app.use(routes);

app.listen(PORT, () => console.log("Server running on port 3000"));
