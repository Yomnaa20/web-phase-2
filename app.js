const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const Mydata = require("./models/mydataschema");

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Route to render the signup page
app.get("/", (req, res) => {
  res.render("signup", { mytitle: "Sign Up" });
});

// Route to handle form submission
app.post("/submit", (req, res) => {
  console.log('Received data:', req.body); // Log received data

  const mydata = new Mydata(req.body);

  mydata.save()
    .then(() => {
      console.log('Data saved successfully:', mydata); // Log saved data
      res.redirect("/index.html");
    })
    .catch((err) => {
      console.error('Error saving data:', err);
      res.status(500).send('Internal Server Error');
    });
});

// Route to render the "done" page
app.get("/index.html", (req, res) => {
  res.send("<h1>  done </h1>");
});

// Connect to MongoDB
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
