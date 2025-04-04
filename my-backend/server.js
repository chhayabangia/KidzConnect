const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // For parsing JSON

mongoose.connect("mongodb://localhost:27017/mydaycare", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

app.listen(3000, () => console.log("Server running on port 3000"));
