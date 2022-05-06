const asyncHandler = require('express-async-handler')
const Community = require('../models/communityModel')
const User = require('../models/userModel')
const Profile = require('../models/profileModel')

const getAllCommunity = asyncHandler(async (req, res) => {
    try {
        const communities = await Community
            .aggregate([
                { "$addFields": { "membersCount": { "$size": "$members" } } },
                { "$sort": { "membersCount": -1 } },
            ])

        await Community.populate(communities, { path: 'user' })

        res.status(200).json(communities)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const getCommunityById = asyncHandler(async (req, res) => {
    try {
        const community = await Community.findById(req.params.community_id).populate({ path: 'user' })

        if (!community) {
            res.status(400).json({ msg: 'Community Not Found' })
        }

        res.status(200).json(community)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const createCommunity = asyncHandler(async (req, res) => {
    try {
        if (req.file === undefined) return res.send("you must select a file.");
        const imgUrl = `http://localhost:8000/api/images/${req.file.filename}`;
        const user = await User.findById(req.user.id).select('-password')
        const profile = await Profile.findOne({ user: req.user.id })

        const newCommunity = new Community({
            communityName: req.body.communityName,
            description: req.body.description,
            user: req.user.id,
            avatar: imgUrl
        })

        profile.community.unshift({
            communityId: newCommunity._id,
            communityName: newCommunity.communityName
        })

        newCommunity.members.unshift({
            memberId: req.user.id,
            memberName: user.usernameOrEmail
        })

        await profile.save()
        await newCommunity.save()
        res.status(200).json(newCommunity)

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const updateCommunity = asyncHandler(async (req, res) => {

    const {
        communityName,
        description,
    } = req.body

    const communityFields = {
        communityName,
        description
    }

    communityFields.user = req.user.id

    if (communityName) communityFields.communityName = communityName
    if (description) communityFields.description = description
    if (req.file) 
        communityFields.avatar = `http://localhost:8000/api/images/${req.file.filename}`

    
    let community = await Community.findOne({ user: req.user.id })
    try {
        if (community) {
            community = await Community.findOneAndUpdate(
                { _id: req.params.community_id },
                { $set: communityFields },
            )
        }

        res.status(200).json(community)

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const deleteCommunity = asyncHandler(async (req, res) => {
    try {
        const community = await Community.findById(req.params.community_id)

        if (community.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User is not authorized' })
        }

        await community.remove()

        res.status(200).json({ msg: 'Community Deleted' })

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const getMyCommunities = asyncHandler(async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('community.communityId')
        res.status(200).json(profile.community)

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' })
    }
})

const getCommunityMember = asyncHandler(async (req, res) => {
    try {
        const community = await Community.findOne({ _id: req.params.community_id })
        // const member = community.members.find(member => member.memberId === profile.user)
        const profile = await Profile.findOne({ user: req.user.id })
        await community.members.find(member => {
            if (member.memberId === profile.user) {
                res.status(200).json(profile)
            }
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' })
    }
})

const community = {
    getAllCommunity,
    getCommunityById,
    createCommunity,
    updateCommunity,
    deleteCommunity,
    getMyCommunities,
    getCommunityMember,
}

module.exports = { community }