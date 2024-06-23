  const mongoose = require('mongoose');

  const CourseSchema = new mongoose.Schema({
    courseId: { type: Number, required: true },
    courseName: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    pictureLink: { type: String },
    instructorName: { type: String }
  });

  module.exports = mongoose.model('Course', CourseSchema, 'courses');
