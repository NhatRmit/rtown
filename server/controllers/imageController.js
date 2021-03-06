const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose')
const Grid = require('gridfs-stream');
const Profile = require('../models/profileModel');

const checkWord =(text) =>{
    const blackList = ["stupid","fucking","shit","bitch"]
    for (let i = 0; i< blackList.length; i++){
        text= text.replace(blackList[i], "****")
    }

    return text
}
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
    const imgUrl = `http://34.124.147.121:8000/api/images/${req.file.filename}`;
    return res.send(imgUrl);
})

const selectProfileImage = asyncHandler(async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://34.124.147.121:8000/api/images/${req.file.filename}`;
    let profile = await Profile.findOne({ user: req.user.id })
    try {
        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: { avatar: imgUrl } },
                { new: true }
            )
        }

        res.status(200).json(profile)

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
});

const deleteImage = asyncHandler(async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});

const image = {
    getImage,
    selectImage,
    deleteImage,
    selectProfileImage,
}

module.exports = { image } 
