const Profile = require('../models/profileModel')
const Post = require('../models/postModel')
const User = require('../models/userModel')
const Community = require('../models/communityModel')
const asyncHandler = require('express-async-handler')

const getProfile = asyncHandler(async (req, res) => {
    try {
        const profile = await Profile
            .findOne({ user: req.user.id }).populate('itemList.item')

        if (!profile) {
            res.status(400).json({ mgs: 'Profile not Found' })
        }

        res.status(200).json(profile)

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const getUserProfile = asyncHandler(async (req, res) => {
    try {
        const profile = await Profile
            .findOne({ user: req.params.user_id }).populate('itemList.item')

        if (!profile) {
            res.status(400).json({ msg: 'Profile Not Found' })
        }

        res.status(200).json(profile)

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const getAllProfiles = asyncHandler(async (req, res) => {
    try {
        const profiles = await Profile
            .find().populate('itemList.item')

        res.status(200).json(profiles)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const createProfile = asyncHandler(async (req, res) => {
    const { bio } = req.body

    const profileFields = {}

    profileFields.user = req.user.id
    if (bio) profileFields.bio = bio

    let profile = await Profile.findOne({ user: req.user.id })
    try {
        profile = new Profile(profileFields)
        await profile.save()

        res.status(200).json(profile)

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })

    }
})

const updateProfile = asyncHandler(async (req, res) => {
    const { bio } = req.body

    const profileFields = {}
    if (bio) profileFields.bio = bio

    profileFields.user = req.user.id

    let profile = await Profile.findOne({ user: req.user.id })
    try {
        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            )
        }

        return res.status(200).json(profile)

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const joinCommunity = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id })
    const user = await User.findOne({ _id: req.user.id })
    const community = await Community.findById(req.params.community_id)

    let isAlreadyJoined = true

    if (profile.community.length < 1) {
        isAlreadyJoined = true
    } else if (profile.community.length >= 1) {
        profile.community.find(comm => {
            if (comm.communityId.toString() === req.params.community_id) {
                isAlreadyJoined = false
            }
        })
    }

    if (!isAlreadyJoined) {
        return res.status(400).json({ msg: 'Already Joined' })
    }

    try {
        profile.community.unshift({
            communityId: req.params.community_id,
            // communityName: community.communityName
        })
        community.members.unshift({
            memberId: req.user.id,
            // memberName: user.usernameOrEmail
        })

        await profile.save()
        await community.save()

        res.json(profile.community)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const leaveCommunity = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id })
    const community = await Community.findById(req.params.community_id)

    let isNoneToDelete = true

    if (profile.community.length < 1) {
        return res.json({ msg: 'No community to leave' })
    } else {
        profile.community.find(comm => {
            if (comm.communityId.toString() === req.params.community_id) {
                isNoneToDelete = false
            }
        })
    }

    console.log(isNoneToDelete)

    if (isNoneToDelete) {
        return res.status(400).json({ msg: 'Already leave the community' })
    }

    try {
        const removeProfileIndex = profile.community
            .map(item => item.communityId)
            .indexOf(req.params.community_id)

        const removeCommunityIndex = community.members
            .map(item => item.memberId)
            .indexOf(req.user.id)

        profile.community.splice(removeProfileIndex, 1)
        community.members.splice(removeCommunityIndex, 1)

        await profile.save()
        await community.save()

        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const increaseRpoint = asyncHandler(async (req, res) => {
    // const profile = await Profile.findOne({ user: req.params.profile_id })
    const post = await Post.findOne({ _id: req.params.post_id })
    let profile
    try {
        post.checkouts.map(checkout =>
            profile = Profile.findOne({ user: checkout.user }),
            profile.Rpoint += post.Rpoint,
            await profile.save()
        )
        res.status(200).json(post)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})




module.exports = {
    getUserProfile,
    getProfile,
    getAllProfiles,
    createProfile,
    updateProfile,
    joinCommunity,
    leaveCommunity,
    increaseRpoint,

}