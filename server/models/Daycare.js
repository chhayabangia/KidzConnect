const mongoose = require("mongoose");

const daycareSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  capacity: Number,
});

module.exports = mongoose.model("Daycare", daycareSchema);
