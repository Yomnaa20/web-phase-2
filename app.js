const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const Mydata = require("./models/mydataschema");
const mydataschema = require("./models/userSchema");
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const path = require("path");
const adminRoutes = require("./routes/admin");
const saltRounds = 10;
const Course = require("./models/course");
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const flash = require('connect-flash');
const Survey = require("./models/surveySchema");
const Mydataa =require("./models/surveySchema");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('./passport-config')(passport);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user || null;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
app.get("/recentlyadded", async (req, res) => {
  try {
      const courses = await Course.find().sort({ createdAt: -1 }).limit(10); // Fetch recently added courses
      res.render("recentlyadded", { courses });
  } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).send('Internal Server Error');
  }
});
app.get("/", (req, res) => {
  res.render("newheader", { mytitle: "header" });
});
app.get("/search", async (req, res) => {
  const searchQuery = req.query.query;
  console.log("Search query received: ", searchQuery); // Log the search query for debugging
  try {
      const courses = await Course.find({ courseName: { $regex: searchQuery, $options: "i" } });
      res.render("recentlyadded", { courses });
  } catch (error) {
      console.error('Error searching courses:', error);
      res.status(500).send('Internal Server Error');
  }
});

app.use('/Downloads', express.static(path.join(__dirname, 'Downloads')));
app.get('/video', (req, res) => {
  const filePath = path.join(__dirname, 'Downloads', 'invideo-ai-1080%20Unlock%20Your%20Potential%20with%20Our%20Courses!%202024-06-22%20(1).mp4');
  res.sendFile(filePath);
});
app.get("/signup", (req, res) => {
  res.render("signup", { mytitle: "Sign Up" });
});
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

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) { 
      return next(err); 
    }
    if (!user) { 
      req.flash('error_msg', 'Invalid email or password');
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) { 
        return next(err); 
      }
      req.session.userId = user._id; // Set the session userId
      return res.redirect('/newheader');
    });
  })(req, res, next);
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
});
app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  res.render('dashboard', { userId: req.session.userId });
});


app.get("/Admin", (req, res) => {
  res.render("Admin");
});
app.get("/newheader", (req, res) => {
  res.render("newheader", { mytitle: "header" });
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

app.get("/usersmanagement", async (req, res) => {
  try {
    const users = await mydataschema.find();
    res.render("usersmanagement", { users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/adminsurvey", (req, res) => {
  res.render("adminsurvey");
});
app.use('/admin', adminRoutes);
app.get("/maincourses", (req, res) => {
  res.render("maincourses");
});
app.get("/business", (req, res) => {
  res.render("business");
});
app.get("/design", (req, res) => {
  res.render("design");
});
app.get("/development", (req, res) => {
  res.render("development");
});
app.get("/IT", (req, res) => {
  res.render("IT");
});
app.get("/marketing", (req, res) => {
  res.render("marketing");
});
app.get("/webdev", (req, res) => {
  res.render("webdev");
});
app.get("/mobdev", (req, res) => {
  res.render("mobdev");
});
app.get("/gamedev", (req, res) => {
  res.render("gamedev");
});
app.get("/entreprenuership", (req, res) => {
  res.render("entreprenuership");
});
app.get("/sales", (req, res) => {
  res.render("sales");
});
app.get("/Management", (req, res) => {
  res.render("Management");
});
app.get("/network", (req, res) => {
  res.render("network");
});
app.get("/Hardware", (req, res) => {
  res.render("Hardware");
});
app.get("/Operatingsystem", (req, res) => {
  res.render("Operatingsystem");
});
app.get("/webdes", (req, res) => {
  res.render("webdes");
});
app.get("/graphicdes", (req, res) => {
  res.render("graphicdes");
});
app.get("/Gamedes", (req, res) => {
  res.render("Gamedes");
});
app.get("/DigitalMarketing", (req, res) => {
  res.render("DigitalMarketing");
});
app.get("/Branding", (req, res) => {
  res.render("Branding");
});
app.get("/PR", (req, res) => {
  res.render("PR");
});
app.get("/newcart", (req, res) => {
  res.render("newcart");
});
app.get("/usersmanagement", (req, res) => {
  res.render("usersmanagement");
});
app.get("/coursesmanagement", async (req, res) => {
  try {
    const courses = await Course.find();
    console.log("Courses retrieved from DB: ", courses); // Log the retrieved courses
    res.render("coursesmanagement", { courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get("/adminsurvey", (req, res) => {
  res.render("adminsurvey"); 
});
app.get("/introtohtmlcourse", (req, res) => {
  res.render("introtohtmlcourse");
});
app.get("/contactus", (req, res) => {
  res.render("contactus");
});
app.get("/userprofile", (req, res) => {
  res.render("userprofile");
});
app.get("/purchasehistory", (req, res) => {
  res.render("purchasehistory");
});
app.get("/foundationsofcybersecurity", (req, res) => {
  res.render("foundationsofcybersecurity");
});
app.get("/gamelocalization", (req, res) => {
  res.render("gamelocalization");
});
app.get("/JSfundementalscourse", (req, res) => {
  res.render("JSfundementalscourse");
});
app.get("/tcandc", (req, res) => {
  res.render("tcandc");
});
app.get("/javascript", (req, res) => {
  res.render("javascript");
});
app.get("/CompleteC#UnityGameDeveloper2D", (req, res) => {
  res.render("CompleteC#UnityGameDeveloper2D");
});
app.get("/E&Bcourses", (req, res) => {
  res.render("E&Bcourses");
});
app.get("/VCbestcourse", (req, res) => {
  res.render("VCbestcourse");
});
app.get("/salespercourse", (req, res) => {
  res.render("salespercourse");
});
app.get("/valuenotpricecsourse", (req, res) => {
  res.render("valuenotpricecsourse");
});
app.get("/cheiffin", (req, res) => {
  res.render("cheiffin");
});
app.get("/foundationsofnetworks", (req, res) => {
  res.render("foundationsofnetworks");
});
app.get("/IntrotoOperatingSystems", (req, res) => {
  res.render("IntrotoOperatingSystems");
});
app.get("/OperatingSystemCrashCourse", (req, res) => {
  res.render("OperatingSystemCrashCourse");
});
app.get("/HowtobuildaPC", (req, res) => {
  res.render("HowtobuildaPC");
});
app.get("/ComputerEngineering", (req, res) => {
  res.render("ComputerEngineering");
});
app.get("/designcourse1", (req, res) => {
  res.render("designcourse1");
});
app.get("/wordpress", (req, res) => {
  res.render("wordpress");
});
app.get("/anatomy", (req, res) => {
  res.render("anatomy");
});
app.get("/graphicdesign", (req, res) => {
  res.render("graphicdesign");
});
app.get("/3dmodeling", (req, res) => {
  res.render("3dmodeling");
});
app.get("/socialmediamarketing", (req, res) => {
  res.render("socialmediamarketing");
});
app.get("/checkout", (req, res) => {
  res.render("checkout");
});
app.get("/businessprogress", (req, res) => {
  res.render("businessprogress");
});
app.get("/networksprogress", (req, res) => {
  res.render("networksprogress");
});
app.get("/socialprogress", (req, res) => {
  res.render("socialprogress");
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

app.post("/add-user", (req, res) => {
  console.log('Received data:', req.body); // Log received data

  const user = new mydataschema(req.body);

  user.save()
    .then(() => {
      console.log('Data saved successfully:', user); // Log saved data
      res.status(200).json({ message: 'User added successfully', data: user });
    })
    .catch((err) => {
      console.error('Error saving data:', err);
      res.status(500).send('Internal Server Error');
    });
});

app.put("/edit-user/:id", async (req, res) => {
  try {
    const user = await mydataschema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/delete-user/:id", async (req, res) => {
  try {
    await mydataschema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/add-course", (req, res) => {
  console.log('Received data:', req.body); // Log received data

  const newCourse = new Course(req.body);

  newCourse.save()
    .then(() => {
      console.log('Data saved successfully:', newCourse); // Log saved data
      res.status(200).json({ message: 'Course added successfully', data: newCourse });
    })
    .catch((err) => {
      console.error('Error saving data:', err);
      res.status(500).send('Internal Server Error');
    });
});

app.put("/edit-course/:id", async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/delete-course/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



app.get("/surveypage", (req, res)=> {
  Mydataa.find().then((questions)=>{res.render("surveypage",{questions});
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
