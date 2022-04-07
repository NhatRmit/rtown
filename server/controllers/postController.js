const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { validate } = require('../models/postModel');
const Post = require('../models/postModel')

const getPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find().sort({ _id: -1 });

        res.status(200).json({ posts })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

const searchPost = asyncHandler(async (req, res) => {
    const { search } = req.query;
    try {
        const post = await Post.find({
            $or: [{ "title": { $regex: search, $options: 'i' } }]
        })
        res.status(200).json({ post })
    } catch (error) {
        res.status(404).json({ message: error.message })
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
        res.status(200).json({ posts })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

const createPost = asyncHandler(async (req, res) => {
    res.status(200).json("create post")
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
    [
        auth,
        [
            check ('text', 'Text is required')
            .not()
            .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json( { errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            };

            post.comments.unshift(newComment);

            await post.save();

            res.json(post.comments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
});

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
        res.status(404).json({message: error.message})
    }
})

module.exports = {
    getPosts, searchPost, filterTrendingPost, createPost, editPost, upvotePost, downvotePost, deletePost,
    createComment, deleteComment,
}