const asyncHandler = require('express-async-handler')
const Grid = require('gridfs-stream')
const mongoose = require('mongoose')
const connectDB = require('../configs/database')

let gfs;
// // connectDB()

// // const connect = mongoose.connection
// // mongoose.connection.on
mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo)
    gfs.collection('photos')
})

const uploadImage = asyncHandler(async (req, res) => {
    try {
        if (req.file === undefined)
            return res.status(400).send('You must select a file')
        return res.status(200).send(`http://localhost:8000/api/images/${req.file.filename}`)
    } catch (error) {
        res.status(400).send('Error')
    }
})

const getImage = asyncHandler(async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename })
        const readStream = gfs.createReadStream(file.filename)
        readStream.pipe(res)
    } catch (err) {
        res.status(404).send('Not Found!')
    }
})

const deleteImage = asyncHandler(async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename })
        res.status(200).send('Success')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error Occured')
    }
})

const getImages = asyncHandler(async(req, res) => {
    try {
        const images = await gfs.files.find()
        res.status(200).send(images)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error Occured')
    }
})

module.exports = {
    uploadImage,
    getImage,
    deleteImage,
    getImages,
}