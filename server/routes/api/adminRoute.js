const express = require('express')
const router = express.Router()
const {auth} = require('../../middlewares/authMiddleware')
const {
    getAllUserProfile,
    getAllCommunityRequest,
    acceptCommunity
} = require('../../controllers/adminController')

router.get('/getAllUserProfile', auth, getAllUserProfile)
router.get('/getAllCommunitiesRequest', auth, getAllCommunityRequest)
router.put('/communityAccept/:community_id', auth, acceptCommunity)

module.exports = router