const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const connectDB = require('./configs/database');

//connect to database
connectDB();

// middleware
app.use(express.json());

app.use('/api/users', require('./routes/api/userRoute'))
app.use('/api/posts', require('./routes/api/postRoute'))
app.use('/api/auth', require('./routes/api/authRoute'))
app.use('/api/profiles', require('./routes/api/profileRoute'))
app.use('/api/communities', require('./routes/api/communityRoute'))

// set port, listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));


