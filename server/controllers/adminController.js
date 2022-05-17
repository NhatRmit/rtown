const asyncHandler = require('express-async-handler')
const Profile = require('../models/profileModel')
const User = require('../models/userModel')
const Community = require('../models/communityModel')
const Post = require('../models/postModel')

// PROFILE
const getAllUserProfile = asyncHandler(async (req, res) => {
    try {
        const profile = await Profile
            .find()

        res.status(200).json(profile)

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

// COMMUNITY 
const getAllCommunityRequest = asyncHandler(async (req, res) => {
    try {
        const communitiesRequest = await Community.find({
            requested: false,
        })

        res.status(200).json(communitiesRequest)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const getAllAcceptedCommunity = asyncHandler(async (req, res) => {
    try {
        const communitiesRequest = await Community.find({
            requested: true,
        })

        res.status(200).json(communitiesRequest)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const editCommunity = asyncHandler(async (req, res) => {
    const {
        communityName,
        description,
    } = req.body

    const communityFields = {
        communityName,
        description
    }
    // communityFields._id = req.params.community_id
    if (communityName) communityFields.communityName = communityName
    if (description) communityFields.description = description
    if (req.file)
        communityFields.avatar = `http://localhost:8000/api/images/${req.file.filename}`

    let communityEdit = await Community.findById(req.params.community_id)
    try {
        if (communityEdit) {
            communityEdit = await Community.findOneAndUpdate(
                { _id: req.params.community_id },
                { $set: communityFields },
            )
            res.status(200).json(communityEdit)
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const acceptCommunity = asyncHandler(async (req, res) => {
    try {

        let communityAccept = await Community.findById(req.params.community_id)
        let profile = await Profile.findOne({ user: communityAccept.user })
        if (communityAccept) {
            communityAccept = await Community.findOneAndUpdate(
                { _id: req.params.community_id },
                { requested: true }
            )
        }
        profile.community.unshift({
            communityId: communityAccept._id,
            communityName: communityAccept.communityName
        })

        communityAccept.members.unshift({
            memberId: communityAccept.user,
            memberName: communityAccept.name
        })

        await profile.save()
        await communityAccept.save()

        res.status(200).json(communityAccept)

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }

})

const deleteCommunity = asyncHandler(async (req, res) => {
    try {
        const community = await Community.findById(req.params.community_id)
        await community.remove()
        

        res.status(200).json({ msg: 'Community Deleted' })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

//POSTS
const getPosts = asyncHandler(async (req, res) => {
    const query = [{ path: 'profile' }, { path: 'community' }]
    try {
        const posts = await Post.find().sort({ date: -1 }).populate(query)
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

//Edit Post
const editPost = asyncHandler(async (req, res) => {
    const postFields = {}
    const { text } = req.body
    if (text) postFields.text = text
    if (req.file)
        communityFields.image = `http://localhost:8000/api/images/${req.file.filename}`

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

module.exports = {
    getAllUserProfile,
    getAllCommunityRequest,
    acceptCommunity,
    deletePost,
    editPost,
    getPosts,
    deleteCommunity,
    editCommunity,
    getAllAcceptedCommunity,
}