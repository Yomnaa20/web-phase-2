const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const Mydata = require("./models/mydataschema");
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Set up session management
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Route to render the login page
app.get("/", (req, res) => {
  res.render("login", { mytitle: "Login" });
});

// Route to render the signup page
app.get("/signup", (req, res) => {
  res.render("signup", { mytitle: "Sign Up" });
});

// Route to handle signup form submission
app.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const mydata = new Mydata({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword, // Store hashed password
      birthdate: `${req.body.year}-${req.body.month}-${req.body.day}`
    });

    await mydata.save();
    console.log('Data saved successfully:', mydata);
    req.session.userId = mydata._id; // Set the session userId
    res.redirect("/dashboard");
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle login form submission
app.post("/login", async (req, res) => {
  try {
    const user = await Mydata.findOne({ email: req.body.email });
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        req.session.userId = user._id;
        res.redirect("/dashboard");
      } else {
        res.status(401).send('Invalid email or password');
      }
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to render the dashboard page
app.get("/dashboard", (req, res) => {
  if (req.session.userId) {
    res.render("dashboard", { title: "Dashboard" });
  } else {
    res.redirect("/login");
  }
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
  console.log(err);
});
