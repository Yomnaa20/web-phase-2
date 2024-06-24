const express = require('express');
const router = express.Router();
const mydataschema = require('../models/userSchema');
const course = require('../models/course');
const Survey = require("../models/surveySchema");
const Mydata =require("../models/surveySchema");
// Admin Dashboard
router.get('/', (req, res) => {
    res.render('admin');
});

// User Management
router.get('/usersmanagement', async (req, res) => {
    try {
        const users = await mydataschema.find();
        res.render('usersmanagement', { users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Add User
router.post('/add-user', async (req, res) => {
    try {
        const user = new mydataschema(req.body);
        await user.save();
        res.status(200).json({ message: 'User added successfully', data: user });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Edit User
router.put('/edit-user/:id', async (req, res) => {
    try {
        const user = await mydataschema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete User
router.delete('/delete-user/:id', async (req, res) => {
    try {
        await mydataschema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Course Management
router.get('/coursesmanagement', async (req, res) => {
    try {
        const courses = await course.find();
        res.render('coursesmanagement', { courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Add Course
router.post('/add-course', async (req, res) => {
    try {
        const newCourse = new course(req.body);
        await newCourse.save();
        res.status(200).json({ message: 'Course added successfully', data: newCourse });
    } catch (err) {
        console.error('Error saving course:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Edit Course
router.put('/edit-course/:id', async (req, res) => {
    try {
        const updatedCourse = await course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete Course
router.delete('/delete-course/:id', async (req, res) => {
    try {
        await course.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/adminsurvey", async (req, res) => {
    try {
      const surveys = await Survey.find({});
      res.render("adminsurvey", { mytitle: "Survey", surveyList: surveys });
    } catch (err) {
      console.error('Error fetching surveys:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  router.post("/add-question", async (req, res) => {
    try {
      const newQues = new Survey({ quesId: req.body.quesId, question: req.body.question });
      await newQues.save();
      res.status(200).json({ message: 'Question added successfully', data: newQues });
    } catch (err) {
      console.error('Error adding question:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  router.put("/edit-question/:id", async (req, res) => {
    try {
      const updatedQuestion = await Survey.findOneAndUpdate(
        { quesId: req.params.id, question: req.body.oldQuestion },
        { quesId: req.body.quesId, question: req.body.newQuestion },
        { new: true }
      );
      res.status(200).json(updatedQuestion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.delete("/delete-question/:id", async (req, res) => {
    try {
      await Survey.findOneAndDelete({ quesId: req.params.id, question: req.body.question });
      res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get("/surveypage", (req, res)=> {
    Mydata.find().then((questions)=>{res.render("surveypage",{questions});
    }).catch((err)=> {console.log(err);
      
    });
    
    });
    
module.exports = router;
