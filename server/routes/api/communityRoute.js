const express = require('express')
const router = express.Router()
const { auth } = require('../../middlewares/authMiddleware')
const {
    getAllCommunity,
    getCommunityById,
    createCommunity,
    updateCommunity,
    deleteCommunity,
    getMyCommunities,
    getCommunityMember,
    createCommunityRequest
} = require('../../controllers/communityController')

router.get('/', getAllCommunity)

router.post('/', auth, createCommunity)

router.get('/myCommunities/:user_id', auth, getMyCommunities)

router.get('/member/:community_id', auth, getCommunityMember)

router.get('/:community_id', auth, getCommunityById)

router.put('/update', auth, updateCommunity)

router.post('/requestCreateCommunity', auth, createCommunityRequest)

router.delete('/:community_id', auth, deleteCommunity)


module.exports = router