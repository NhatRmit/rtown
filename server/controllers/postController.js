const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel')
const User = require('../models/userModel')
const Community = require('../models/communityModel')
const Profile = require('../models/profileModel')
const mongoose = require('mongoose')

const checkWord =(text) =>{
    const blackList = ["stupid","fucking","shit","bitch"]
    for (let i = 0; i< blackList.length; i++){
        text= text.replace(blackList[i], "****")
    }

    return text
}

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
            $or: [{ "text": { $regex: search, $options: 'i' } }]
        })
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

const getPostById = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
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

const filterTrendingPost = asyncHandler(async (req, res) => {
    const { filter } = req.query;
    let posts;
    try {

        if (filter === 'top') {
            posts = await Post.find().sort({ upvotesCount: -1 })
        }
        else if (filter === 'trending') {
            posts = await Post.find().sort({ commentsCount: -1 })

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
            text: checkWord(req.body.text),
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

const createCommunityPost = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        // const community = await Community.findOne({ _id: req.params.community_id })
        const newPost = new Post({
            text: req.body.text,
            name: user.usernameOrEmail,
            user: req.user.id,
            community: req.params.community_id,
        })

        const post = await newPost.save()
        res.json(post)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

const getCommunityPosts = asyncHandler(async (req, res) => {
    const communityId = mongoose.Types.ObjectId(req.params.community_id)
    try {
        const posts = await Post.find({ community: communityId }).sort({ date: -1 });
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

const createEvent = asyncHandler(async (req, res) => {
    try {
        const community = await Community.findById(req.params.community_id)
        const newEvent = new Post({
            text: req.body.text,
            Rpoint: req.body.Rpoint,
            community: community,
        })

        const event = await newEvent.save()
        res.json(event)

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
    postFields.user = req.user.id
    if (text) postFields.text = text

    try {
        let post = await Post.findOne({ _id: req.params.post_id })
        if (post) {
            //UPDATE
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

// UPVOTE POST 
const upvotePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

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
        post.upvotesCount--

        await post.save();

        res.json(post.upvotes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})
// Down vote
const downvotePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

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


//Delete Post
const deletePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

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


//Create Comment
const createComment = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
        const profile = await Profile.findOne({user: req.user.id})
        const newComment = {
            text: checkWord(req.body.text),
            name: user.usernameOrEmail,
            avatar: profile.avatar,
            user: req.user.id
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
//Edit Comment
const editComment = asyncHandler(async (req, res) => {
    const update = (array, index, newValue) => {
        array[index] = newValue
    }
    const comment = (array, index) => {
        return array[index]
    }
    try {
        let post = await Post.findOne({ _id: req.params.post_id })
        const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.comment_id);

        update(post.comments, removeIndex, req.body)
 
        comment(post.comments, removeIndex)

        await post.save()

        return res.status(200).json(comment(post.comments, removeIndex))
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})
// Delete Comment
const deleteComment = asyncHandler(async (req, res) => {
    try {
        //get the post
        const post = await Post.findById(req.params.id)

        //get the comment from post
        const comment = post.comments.find(
            (comment) => comment.id === req.params.comment_id
        )

        //check if comment exist
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
    try {
        const posts = await Post.find({ user: req.user.id }).sort({ date: -1 })
        res.status(200).json(posts)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = {
    getPosts, getMyPosts, searchPost, filterTrendingPost, createPost, editPost, upvotePost, downvotePost, deletePost,
    createComment, deleteComment, removeupvotePost, getPostById, editComment, createEvent, getCommentById, checkOut, createCommunityPost, getCommunityPosts
}