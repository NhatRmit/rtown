const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel')
const User = require('../models/userModel')
const getPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.status(200).json(posts)
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
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

const getPostById = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
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
            posts = await Post.aggregate([
                { "$addFields": { "upvotesCount": { $size: "$upvotes" } } },
                { "$sort": { "upvotesCount": -1 } }
            ])
        } else if (filter === 'trending') {
            posts = await Post.aggregate([
                { "$addFields": { "commentsCount": { $size: "$comments" } } },
                { "$sort": { "commentsCount": -1 } }
            ])
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

const createPost = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        const newPost = new Post({
            text: req.body.text,
            name: user.usernameOrEmail,
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
    const postFields = {}
    const { text } = req.body
    postFields.user = req.user.id
    if (text) postFields.text = text

    try {
        let post = await Post.findOne({ user: req.user.id })
        if (post) {
            //UPDATE
            post = await Post.findOneAndUpdate(
                { user: req.user.id },
                { $set: postFields },
                { new: true }
            )
            return res.json(post)
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// UPVOTE POST 
const upvotePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.upvotes.filter(upvote => upvote.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already upvoted' })
        }

        post.upvotes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.upvotes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

// REMOVE UPVOTE POST
const removeupvotePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.upvotes.filter(upvote => upvote.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post have not yet been upvoted' })
        }

        // Get remove index
        const removeIndex = post.upvotes.map(upvote => upvote.user.toString()).indexOf(req.user.id);

        post.upvotes.splice(removeIndex, 1);

        await post.save();

        res.json(post.upvotes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

const downvotePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.downvotes.filter(downvote => downvote.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already downvoted' })
        }

        post.downvotes.unshift({ user: req.user.id });


        await post.save();

        res.json(post.downvotes)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})



const deletePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'User not authorized' })
        }

        await post.remove();

        res.json({ msg: 'Post removed' })
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});



const createComment = asyncHandler(async (req, res) => {
    [
        auth,
        [
            check('text', 'Text is required')
                .not()
                .isEmpty()
        ]
    ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            try {
                const user = await User.findById(req.user.id).select('-password');
                const post = await Post.findById(req.params.id);

                const newComment = {
                    text: req.body.text,
                    name: user.usernameOrEmail,
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
            (comment) => { comment.id === req.params.comment_id }
        )

        //check if comment exist
        if (!comment) {
            res.status(404).json({ msg: 'Comment does not exist' })
        }

        post.comments = post.comments.filter(
            ({ id }) => { id !== req.params.comment_id }
        )

        await post.save();

        return res.json(post.comments);

    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

const getMyPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find({user: req.user.id}).sort({ date: -1 })
        res.status(200).json(posts)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = {
    getPosts, searchPost, filterTrendingPost, createPost, editPost, upvotePost, downvotePost, deletePost,
    createComment, deleteComment, removeupvotePost, getPostById
}