const asyncHandler = require('express-async-handler')
const Profile = require('../models/profileModel')
const User = require('../models/userModel')
const Community = require('../models/communityModel')

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

const deniedCommunity = asyncHandler( async (req, res)=>{
    
})
module.exports= {
    getAllUserProfile,
    getAllCommunityRequest,
    acceptCommunity
}