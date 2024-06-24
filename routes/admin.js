const express = require('express');
const router = express.Router();
const Survey = require("../models/surveySchema");
const Mydata =require("../models/surveySchema");

// Admin Dashboard
router.get('/', (req, res) => {
    res.render('admin');
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
