const MyData = require('../models/mydataschema');
const Course = require('../models/course');
const Survey = require("../models/surveySchema");

// User management
exports.addUser = async (req, res) => {
    try {
        const user = new MyData(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.editUser = async (req, res) => {
    try {
        const user = await MyData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await MyData.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Course management
exports.addCourse = async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.editCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.addQuestion = async (req, res) => {
    try {
        const question = new Survey(req.body);
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.editQuestion = async (req, res) => {
    try {
        const question = await Survey.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        await Survey.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
