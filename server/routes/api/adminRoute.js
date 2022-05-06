const express = require('express')
const router = express.Router()
const {auth} = require('../../middlewares/authMiddleware')
const {
    getAllUserProfile,
    getAllCommunityRequest,
    acceptCommunity,
    deleteCommunity,
    editMemberProfile
} = require('../../controllers/adminController')

router.get('/getAllUserProfile', auth, getAllUserProfile)
router.get('/getAllCommunitiesRequest', auth, getAllCommunityRequest)
router.put('/communityAccept/:community_id', auth, acceptCommunity)
router.delete('/deleteCommunity/:community_id', auth, deleteCommunity)
router.put('/editMemberProfile/:user_id', auth, editMemberProfile)

module.exports = router