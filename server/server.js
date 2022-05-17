const express = require('express');
const connectDB = require('./configs/database');
const cors = require('cors')
const app = express();
const path = require('path');
require('dotenv').config();
connectDB();

app.use(cors())
app.use(express.json());
app.use('/api/users', require('./routes/api/userRoute'))
app.use('/api/posts', require('./routes/api/postRoute'))
app.use('/api/auth', require('./routes/api/authRoute'))
app.use('/api/profiles', require('./routes/api/profileRoute'))
app.use('/api/communities', require('./routes/api/communityRoute'))
app.use('/api/items', require('./routes/api/itemRoute'))
app.use('/api/messengers', require('./routes/api/messengerRoute'))
app.use('/api/images', require('./routes/api/imageRoute'))
app.use('/api/admins', require('./routes/api/adminRoute'))

// serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT;
app.listen(port, () => console.log(`Server started on port ${port}`));