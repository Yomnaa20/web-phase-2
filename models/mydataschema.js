// ./models/mydataschema.js
const mongoose = require('mongoose');

const mydataSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  day: Number,
  month: Number,
  year: Number
});

const Mydata = mongoose.model('Mydata', mydataSchema);

module.exports = Mydata;