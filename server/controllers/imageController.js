const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose')
const Grid = require('gridfs-stream');
const Profile = require('../models/profileModel');
const Community = require('../models/communityModel');
const Post = require('../models/postModel');


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

const selectProfileImage = asyncHandler( async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:8000/api/images/${req.file.filename}`;
    let profile = await Profile.findOne({user: req.user.id})
    try {
        if(profile){
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: {avatar:imgUrl}},
                {new: true}
            )
        }

        res.status(200).json(profile)

    } catch (err) {
        console.error(err.message)
        res.status(500).json({msg: 'Server Error'})
    }
});

const selectCommunityImage = asyncHandler( async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:8000/api/images/${req.file.filename}`;
    let community = await Community.findOne({_id: req.params.communityId})
    try {
        if(community){
            community = await Community.findOneAndUpdate(
                {_id: req.params.communityId},
                {$set: {avatar:imgUrl}},
                {new: true}
            )
        }
        await community.save()
        res.status(200).json(community)

    } catch (err) {
        console.error(err.message)
        res.status(500).json({msg: 'Server Error'})
    }

})

const selectPostImage = asyncHandler( async (req, res)=>{
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:8000/api/images/${req.file.filename}`;
    let post = await Post.findOne({_id: req.params.postId})
    try {
        if(post){
            post = await Post.findOneAndUpdate(
                {_id: req.params.postId},
                {$set: {image:imgUrl}},
                {new: true}
            )
        }
        await post.save()
        res.status(200).json(post)

    } catch (err) {
        console.error(err.message)
        res.status(500).json({msg: 'Server Error'})
    }
})

// const selectCommentImage = asyncHandler( async (req, res)=> {
//     if (req.file === undefined) return res.send("you must select a file.");
//     const imgUrl = `http://localhost:8000/api/images/${req.file.filename}`;
//     let comment = await Post.findOne({_id: req.post})
//     try {
//         if(comment){
//             comment = await Post.findOneAndUpdate(
//                 {_id: req.post.comment.commentId},
//                 {$set: {image:imgUrl}},
//                 {new: true}
//             )
//         }
//         await comment.save()
//         res.status(200).json(comment)

//     } catch (err) {
//         console.error(err.message)
//         res.status(500).json({msg: 'Server Error'})
//     }
// })

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
    selectProfileImage,
    selectCommunityImage,
    selectPostImage,

} 
