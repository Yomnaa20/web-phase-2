const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const Survey = require("./models/surveySchema");
const Mydata =require("./models/surveySchema");
const adminRoutes = require("./routes/admin"); 


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.render("admin");
});


app.get("/surveypage", (req, res)=> {
  Mydata.find().then((questions)=>{res.render("surveypage",{questions});
  }).catch((err)=> {console.log(err);
    
  });
  
  });

app.get("/adminsurvey", async (req, res) => {
  try {
    const surveys = await Survey.find({});
    res.render("adminsurvey", { mytitle: "Survey", surveyList: surveys });
  } catch (err) {
    console.error('Error fetching surveys:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.post("/add-question", async (req, res) => {
  try {
    const newQues = new Survey({ quesId: req.body.quesId, question: req.body.question });
    await newQues.save();
    res.status(200).json({ message: 'Question added successfully', data: newQues });
  } catch (err) {
    console.error('Error adding question:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.put("/edit-question/:id", async (req, res) => {
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

app.delete("/delete-question/:id", async (req, res) => {
  try {
    await Survey.findOneAndDelete({ quesId: req.params.id, question: req.body.question });
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.use('/admin', adminRoutes);

mongoose.connect(
  "mongodb+srv://yomna:202206689@cluster0.x2ndewr.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});