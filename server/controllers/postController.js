const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel')
const User = require('../models/userModel')
const Profile = require('../models/profileModel')
const mongoose = require('mongoose')

const checkWord = (text) => {
    const blackList = ["stupid", "fucking", "shit", "bitch"]
    for (let i = 0; i < blackList.length; i++) {
        text = text.replace(blackList[i], "****")
    }
    return text
}

const getPosts = asyncHandler(async (req, res) => {
    const query = [{ path: 'profile' }, { path: 'community' }, { path: 'user' }]
    try {
        const posts = await Post.find().sort({ date: -1 }).populate(query)
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

const searchPost = asyncHandler(async (req, res) => {
    const { search } = req.query;
    try {
        const post = await Post.find({
            $or: [{ "text": { $regex: search, $options: 'i' } }]
        })
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

const getPostById = asyncHandler(async (req, res) => {
    const query = [{ path: 'profile' }, { path: 'community' }, { path: 'user' }]

    try {
        const post = await Post.findById(req.params.post_id).populate(query)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

const getCommentById = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        const comment = post.comments.find(
            (comment) => comment.id === req.params.comment_id
        )
        res.status(200).json(comment)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

const filterPost = asyncHandler(async (req, res) => {
    const { filter } = req.query;
    let posts;
    try {
        if (filter === 'top') {
            posts = await Post.find().sort({ upvotesCount: -1 }).populate('community')
        }
        else if (filter === 'trending') {
            posts = await Post.find().sort({ commentsCount: -1 }).populate('community')
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

const createPost = asyncHandler(async (req, res) => {
    try {
        if (req.file === undefined) return res.send("you must select a file.");
        const imgUrl = `http://localhost:8000/api/images/${req.file.filename}`;
        const profile = await Profile.findOne({ user: req.user.id })

        const newPost = new Post({
            text: checkWord(req.body.text),
            user: req.user.id,
            profile: profile._id,
            image: imgUrl,
        })

        const post = await newPost.save()

        res.status(200).json(post)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

const createCommunityPost = asyncHandler(async (req, res) => {
    try {
        if (req.file === undefined) return res.send("you must select a file.");
        const imgUrl = `http://localhost:8000/api/images/${req.file.filename}`;
        const profile = await Profile.findOne({ user: req.user.id })
        const newPost = new Post({
            text: req.body.text,
            user: req.user.id,
            community: req.params.community_id,
            profile: profile._id,
            image: imgUrl,
        })

        const post = await newPost.save()
        res.status(200).json(post)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

const getCommunityPosts = asyncHandler(async (req, res) => {
    const communityId = mongoose.Types.ObjectId(req.params.community_id)
    const query = [{ path: 'profile' }, { path: 'community' }, { path: 'user' }]

    try {
        const posts = await Post.find({ community: communityId }).sort({ date: -1 }).populate(query)
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

const createEvent = asyncHandler(async (req, res) => {
    try {
        if (req.file === undefined) return res.send("you must select a file.");
        const imgUrl = `http://localhost:8000/api/images/${req.file.filename}`;
        const profile = await Profile.findOne({ user: req.user.id })

        const newEvent = new Post({
            text: req.body.text,
            endTime: req.body.endTime,
            Rpoint: req.body.Rpoint,
            user: req.user.id,
            community: req.params.community_id,
            profile: profile._id,
            image: imgUrl,
        })

        const event = await newEvent.save()
        res.status(200).json(event)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

const checkOut = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.post_id);
    const profile = await Profile.findOne({ user: req.user.id })
    try {
        if (post.checkouts.filter(checkout => checkout.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already checked out' })
        }

        post.checkouts.unshift({ user: req.user.id });
        profile.Rpoint += post.Rpoint

        await post.save();
        await profile.save()

        res.json(post);
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

const editPost = asyncHandler(async (req, res) => {
    const postFields = {}
    const { text } = req.body
    // postFields.user = req.user.id
    if (text) postFields.text = text
    if (req.file) postFields.image = `http://localhost:8000/api/images/${req.file.filename}`

    try {
        let post = await Post.findOne({ _id: req.params.post_id })
        if (post) {

            post = await Post.findOneAndUpdate(
                { _id: req.params.post_id },
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

const upvotePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (post.upvotes.filter(upvote => upvote.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already upvoted' })
        }

        post.upvotes.unshift({ user: req.user.id });
        post.upvotesCount++
        await post.save();

        res.json(post.upvotes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

const removeupvotePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (post.upvotes.filter(upvote => upvote.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post have not yet been upvoted' })
        }

        const removeIndex = post.upvotes.map(upvote => upvote.user.toString()).indexOf(req.user.id);

        post.upvotes.splice(removeIndex, 1);
        post.upvotesCount--

        await post.save();

        res.json(post.upvotes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

const downvotePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (post.downvotes.filter(downvote => downvote.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already downvoted' })
        }

        post.downvotes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.downvotes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

const deletePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
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
    try {
        if (req.file === undefined) return res.send("you must select a file.");
        const imgUrl = `http://localhost:8000/api/images/${req.file.filename}`;
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.post_id);
        const profile = await Profile.findOne({ user: req.user._id })

        const newComment = {
            text: checkWord(req.body.text),
            name: user.usernameOrEmail,
            avatar: profile.avatar,
            user: req.user.id,
            profile: profile._id,
            image: imgUrl,
        };

        post.comments.unshift(newComment);
        post.commentsCount++;

        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

const editComment = asyncHandler(async (req, res) => {
    let postFound = await Post.findOne({ _id: req.params.post_id })
    let commentIndex = await postFound.comments.find(comment => comment.id === req.params.comment_id)

    const commentFields = {}
    if (req.file)
        commentFields.image = `http://localhost:8000/api/images/${req.file.filename}`
    else
        commentFields.image = commentIndex.image


    try {
        await Post.findOneAndUpdate(
            { 'comments._id': req.params.comment_id },
            {
                $set: {
                    'comments.$.image': commentFields.image,
                    'comments.$.text': req.body.text,
                }
            },
        )

        const post = await Post.findOne({ 'comments._id': req.params.comment_id })

        return res.status(200).json(post.comments)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

const deleteComment = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id)

        const comment = post.comments.find(
            (comment) => comment.id === req.params.comment_id
        )

        if (!comment) {
            res.status(404).json({ msg: 'Comment does not exist' })
        }

        post.comments = post.comments.filter(
            ({ id }) => id !== req.params.comment_id
        )

        post.commentsCount--

        await post.save();

        return res.json(post.comments);

    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

const getMyPosts = asyncHandler(async (req, res) => {
    const query = [{ path: 'profile' }, { path: 'community' }, { path: 'user' }]

    try {
        const posts = await Post.find({ user: req.user.id }).sort({ date: -1 }).populate(query)
        res.status(200).json(posts)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

const post = {
    getPosts,
    getMyPosts,
    searchPost,
    filterPost,
    createPost,
    editPost,
    upvotePost,
    downvotePost,
    deletePost,
    createComment,
    deleteComment,
    removeupvotePost,
    getPostById,
    editComment,
    createEvent,
    getCommentById,
    checkOut,
    createCommunityPost,
    getCommunityPosts
}

module.exports = { post } 