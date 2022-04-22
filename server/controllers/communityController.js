const asyncHandler = require('express-async-handler')
const Community = require('../models/communityModel')
const User = require('../models/userModel')
const Profile = require('../models/profileModel')

const getAllCommunity = asyncHandler(async (req, res) => {
    try {
        const communities = await Community
            .aggregate([
                { "$addFields": { "membersCount": { "$size": "$members" } } },
                { "$sort": { "membersCount": -1 } }
            ])

        res.status(200).json(communities)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({msg: 'Server Error'})
    }
})

const getCommunityById = asyncHandler(async (req, res) => {
    try {
        const community = await Community.findById(req.params.community_id)

        if (!community) {
            res.status(400).json({ msg: 'Community Not Found' })
        }

        res.status(200).json(community)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({msg: 'Server Error'})
    }
})

const createCommunity = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')

        const newCommunity = new Community({
            communityName: req.body.communityName,
            description: req.body.description,
            name: user.usernameOrEmail,
            user: req.user.id
        })

        const community = await newCommunity.save()
        res.status(200).json(community)

    } catch (err) {
        console.error(err.message)
        res.status(500).json({msg: 'Server Error'})
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

    let community = await Community.findOne({user: req.user.id})
    try {
        if(community){
            community = await Community.findOneAndUpdate(
                {user: req.user.id},
                {$set: communityFields},
                {new: true}
            )
        }

        res.status(200).json(community)

    } catch (err) {
        console.error(err.message)
        res.status(500).json({msg: 'Server Error'})
    }
})

const deleteCommunity = asyncHandler(async (req, res) => {
    try {
        const community = await Community.findById(req.params.community_id)

        if(community.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User is not authorized' })
        }

        await community.remove()

        res.status(200).json({msg: 'Community Deleted'})

    } catch (err) {
        console.error(err.message)
        res.status(500).json({msg: 'Server Error'})
    }
})

const getMyCommunities = asyncHandler(async(req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id})
        res.status(200).json(profile.community)

    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Server Error'})
    }
})

const createEventCommunity = asyncHandler(async(req, res) => {
    try {
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Server Error'})
    }
})

const deleteMemberCommunity = asyncHandler(async(req, res) => {

})

module.exports = {
    getAllCommunity,
    getCommunityById,
    createCommunity,
    updateCommunity,
    deleteCommunity,
    getMyCommunities,
    createEventCommunity,
}