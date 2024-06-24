const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    quesId: { type: Number, required: true},
    question: { type: String, required: true }
}, { collection: 'questions' });

module.exports = mongoose.model('Survey', surveySchema);
