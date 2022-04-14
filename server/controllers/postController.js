const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')
const User = require('../models/userModel')
const getPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find().sort({ _id: -1 });

        res.status(200).json( posts )
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

const searchPost = asyncHandler(async (req, res) => {
    const { search } = req.query;
    try {
        const post = await Post.find({
            $or: [{ "title": { $regex: search, $options: 'i' } }]
        })
        res.status(200).json( post )
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

const filterTrendingPost = asyncHandler(async (req, res) => {
    const { filter } = req.query;
    let posts;
    try {
        if (filter === 'top') {
            posts = await Post.find().sort({ upvotes: -1 });
        } else if (filter === 'trending') {
            posts = await Post.aggregate([
                {"$addFields": { "commentsCount": { $size: "$comments" } }},
                {"$sort" : { "commentsCount": -1 }}
            ])
        }
        res.status(200).json( posts )
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

const createPost = asyncHandler(async (req, res) => { 
    if(!req.isEmpty()){
        return res.status(400).json("Created Error")
    }
    
    try {
        const user = await User.findById(req.params.id).select('-password')
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save()
        res.json(post)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

const editPost = asyncHandler(async (req, res) => {
    res.status(200).json("create post")
})

const upvotePost = asyncHandler(async (req, res) => {
    res.status(200).json("upvote post")
})

const downvotePost = asyncHandler(async (req, res) => {
    res.status(200).json("downvote post")
})

const deletePost = asyncHandler(async (req, res) => {
    res.status(200).json("delete post")
})

const createComment = asyncHandler(async (req, res) => {
    res.status(200).json("create comment")
})

const deleteComment = asyncHandler(async (req, res) => {
    try {
        //get the post
        const post = await Post.findById(req.params.id)  

        //get the comment from post
        const comment = post.comments.find(
            (comment)=>{comment.id === req.params.comment_id}
        )

        //check if comment exist
        if(!comment){
            res.status(404).json({msg: 'Comment does not exist'})
        }

        post.comments = post.comments.filter(
            ({id}) => {id !== req.params.comment_id}
        )

        await post.save();

        return res.json(post.comments);

    } catch (error) {
        res.status(404).json({msg: error.message})
    }
})

module.exports = {
    getPosts, searchPost, filterTrendingPost, createPost, editPost, upvotePost, downvotePost, deletePost,
    createComment, deleteComment,
}