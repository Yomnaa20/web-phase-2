const mongoose = require('mongoose');


const mydataSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthdate: { type: String, required: true }
});

const Mydata = mongoose.model('Mydata', mydataSchema);

module.exports = Mydata;
