const mongoose = require('mongoose');

const mydataSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  birthdate: String
});

const Mydata = mongoose.model('Mydata', mydataSchema);

module.exports = Mydata;
