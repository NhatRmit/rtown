const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./configs/database');
const cors = require('cors')

const app = express();
app.use(cors())
//connect to database
connectDB();

// middleware
app.use(express.json());

app.use('/api/users', require('./routes/api/userRoute'))
app.use('/api/posts', require('./routes/api/postRoute'))
app.use('/api/auth', require('./routes/api/authRoute'))
app.use('/api/profiles', require('./routes/api/profileRoute'))
app.use('/api/communities', require('./routes/api/communityRoute'))
app.use('/api/items', require('./routes/api/itemRoute'))
app.use('/api/messengers', require('./routes/api/messengerRoute'))
app.use('/api/images', require('./routes/api/imageRoute'))


//////////////////////////TEST
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/messenger', require('./routes/api/authRoute'));
app.use('/api/messenger', require('./routes/api/messengerRoute'));

// set port, listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));