const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const daycareRoutes = require('./routes/daycareRoutes');

const app = express();
app.use(express.json()); 
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/mydaycare", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', daycareRoutes);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

app.listen(3000, () => console.log("Server running on port 3000"));
