const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')

const conn = mongoose.connection;
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

const getImage = asyncHandler(async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("not found");
    }
});

const selectImage = asyncHandler(async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:8000/api/images/${req.file.filename}`;
    return res.send(imgUrl);
});

const getFilename = asyncHandler(async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        res.send(file)
    } catch (error) {
        res.send("not found");
    }
})

const getImgURL = asyncHandler(async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        res.send(`http://localhost:8000/api/images/${file.filename}`)
    } catch (error) {
        res.send("not found");
    }
})

const deleteImage = asyncHandler(async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});

module.exports = {
    getImage,
    selectImage,
    deleteImage,
    getFilename,
    getImgURL,
} 
