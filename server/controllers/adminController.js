const asyncHandler = require('express-async-handler')
const Profile = require('../models/profileModel')
const User = require('../models/userModel')
const Community = require('../models/communityModel')
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

const editMemberProfile = asyncHandler(async (req, res)=>{
    const {
        bio,
        Rpoint,
        avatar,
        // itemList,
        // community,
        admin
    } = req.body
    const profileFields = {
        bio,
        Rpoint,
        avatar,
        // itemList,
        // community,
        admin
    }
    profileFields.user = req.user.id
    if (bio) profileFields.bio = bio
    if (Rpoint) profileFields.Rpoint = Rpoint
    if (avatar) profileFields.avatar = avatar
    // if (itemList) profileFields.itemList = itemList
    // if (community) profileFields.community = community
    if (admin) profileFields.admin = admin
    let editMemberprofile = await Profile.findOne(req.params._id)
    try {  
        if(editMemberprofile){
           editMemberprofile = await Profile.findOneAndUpdate(
               {user: req.user.id},
               {$set: profileFields},
               {new: true}
           ) 
        }
        res.status(200).json(editMemberprofile)
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

const editCommunity = asyncHandler(async (req, res) =>{
    const {
        communityName,
        description,
    } = req.body

    const communityFields = {
        communityName,
        description
    }
    communityFields._id = req.params.community_id
    if (communityName) communityFields.communityName = communityName
    if (description) communityFields.description = description

    let communityEdit = await Community.findById(req.params.community_id)
    try {
        if(communityEdit) {
            communityEdit = await Community.findOneAndUpdate(
                { _id: req.params.community_id },
                { $set: communityFields },
                { new: true }
            ) 
        }
        res.status(200).json(communityEdit)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
} )

const acceptCommunity = asyncHandler(async (req, res) => {
    try {
    
        let communityAccept = await Community.findById(req.params.community_id)
        let profile = await Profile.findOne({user: communityAccept.user})
        if (communityAccept) {
            communityAccept = await Community.findOneAndUpdate(
                {_id: req.params.community_id},
                {requested: true}
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

const deleteCommunity = asyncHandler( async (req, res)=>{
    try {
        const community = await Community.findById(req.params.community_id)

        await community.remove()

        res.status(200).json({ msg: 'Community Deleted' })

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

module.exports= {
    getAllUserProfile,
    getAllCommunityRequest,
    acceptCommunity,
    deleteCommunity,
    editMemberProfile,
    editCommunity
}