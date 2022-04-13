const express = require('express');
const cors = require("cors");
const app = express();
const corsOptions = {
    origin: "http://localhost:8000"
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to RTown!" });
});

const res = require('express/lib/response');
const dotenv = require('dotenv').config();
const connectDB = require('./configs/database');
const bcrypt = require('bcrypt');
const { compileETag } = require('express/lib/utils');

// open Mongoose connection to MongoDB database
connectDB();


// app.use('/api/users', require('./routes/api/userRoute'));
// app.use('/api/posts', require('./routes/api/postRoute'));
// app.use('/api/auth', require('./routes/api/authRoute'));
// app.use('/api/profile', require('./routes/api/profileRoute'));
require('./routes/api/authRoute')(app);
require('./routes/api/userRoute')(app);


// set port, listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));


