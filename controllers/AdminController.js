const Survey = require("../models/surveySchema");



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
