const express = require('express');
const dotenv = require('dotenv').config()
// const connectDB = require('./configs/database')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// connectDB();

const app = express();

app.use('/api/users', require('./routes/api/userRoute'))
app.use('/api/posts', require('./routes/api/postRoute'))
app.use('/api/auth', require('./routes/api/authRoute'))
app.use('/api/profile', require('./routes/api/profileRoute'))

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
//routes
// app.use('api/users', require('./routes/api/users'));
// app.use('api/users', require('./routes/api/posts'));


