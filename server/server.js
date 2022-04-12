const express = require('express');
const res = require('express/lib/response');
const dotenv = require('dotenv').config();
const connectDB = require('./configs/database');
const bcrypt = require('bcrypt');
const { compileETag } = require('express/lib/utils');

connectDB();

const users = []
const app = express();

app.use(express.json())

app.get('/users', (req,res) => {
  res.json(users);
})

app.post('/users', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hasedPassword = await bcrypt.hash(req.body.password, salt)
    console.log(salt)
    console.log(hasedPassword)
    const user = {name: req.body.name, password: hasedPassword}
    users.push(user)

    await console.log("Hrererererereererer", users);
    res.status(201).send()
  }
  catch {
    res.status(500).send()
  }
})

app.post('/login', async (req,res) => {
  await console.log("Hrererererereererer", users);

  const user = users.find(user => user.name === req.body.name)

  if (user === null) {
    return res.status(400).send('Cannot find user')
  }

  try {
    if (await bcrypt.compare(res.body.password, user.password)) {
      res.send('Successfully log in')
    } else {
      res.send('Failed to log in')
    }
  }
  catch {
    res.status(500).send()
  }

})



app.use('/api/users', require('./routes/api/userRoute'));
app.use('/api/posts', require('./routes/api/postRoute'));
app.use('/api/auth', require('./routes/api/authRoute'));
app.use('/api/profile', require('./routes/api/profileRoute'));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
//routes
// app.use('api/users', require('./routes/api/users'));
// app.use('api/users', require('./routes/api/posts'));


