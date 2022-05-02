const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const connectDB = require('./configs/database');


// IMAGE Import 
// const upload = require("./routes/upload");
// const Grid = require("gridfs-stream");
// const mongoose = require("mongoose");
//connect to database
connectDB();

// middleware
app.use(express.json());

app.use('/api/users', require('./routes/api/userRoute'))
app.use('/api/posts', require('./routes/api/postRoute'))
app.use('/api/auth', require('./routes/api/authRoute'))
app.use('/api/profiles', require('./routes/api/profileRoute'))
app.use('/api/communities', require('./routes/api/communityRoute'))
app.use('/api/images', require('./routes/api/imageRoute'))


// IMAGE



// app.use("/api/file", upload);

// // media routes
// app.get("/api/file/:filename", async (req, res) => {
//     try {
//         const file = await gfs.files.findOne({ filename: req.params.filename });
//         const readStream = gfs.createReadStream(file.filename);
//         readStream.pipe(res);
//     } catch (error) {
//         res.send("not found");
//     }
// });


// app.delete("/api/file/:filename", async (req, res) => {
//     try {
//         await gfs.files.deleteOne({ filename: req.params.filename });
//         res.send("success");
//     } catch (error) {
//         console.log(error);
//         res.send("An error occured.");
//     }
// });



// set port, listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));


