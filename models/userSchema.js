const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  courseName: String,
  purchaseDate: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  userId: Number,
  firstname: String,
  lastname: String,
  email: String,
  birthdate: String,
  purchasesHistory: [purchaseSchema], 
  coursesInProgress: [String]
});

module.exports = mongoose.model("mydatas", userSchema);
