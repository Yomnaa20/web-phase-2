const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const adminRoutes = require("./routes/admin"); // Import admin routes

app.use(bodyParser.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

const mydataschema = require("./models/userSchema");
const course = require("./models/course");
const userSchema = require("./models/userSchema");

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get("/", (req, res) => {
    res.render("admin");
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

app.get("/coursesmanagement", async (req, res) => {
    try {
        const courses = await course.find();
        res.render("coursesmanagement", { courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Use admin routes
app.use('/admin', adminRoutes);

mongoose
  .connect(
    "mongodb+srv://yomna:202206689@cluster0.x2ndewr.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/add-user", (req, res) => {
  console.log('Received data:', req.body); // Log received data

  const user = new userSchema(req.body);

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
    const user = await userSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/delete-user/:id", async (req, res) => {
  try {
    await userSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/add-course", (req, res) => {
  console.log('Received data:', req.body); // Log received data

  const newCourse = new course(req.body);

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
    const updatedCourse = await course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/delete-course/:id", async (req, res) => {
  try {
    await course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
