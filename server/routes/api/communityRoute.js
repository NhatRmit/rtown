const express = require('express')
const router = express.Router()
const { auth } = require('../../middlewares/authMiddleware')
const upload = require('../../middlewares/upload')

const {
    getAllCommunity,
    getCommunityById,
    createCommunity,
    updateCommunity,
    deleteCommunity,
    getMyCommunities,
    getCommunityMember,
} = require('../../controllers/communityController')

router.get('/', getAllCommunity)

router.post('/', upload.single("file"), auth, createCommunity)

router.get('/myCommunities/:user_id', auth, getMyCommunities)

router.get('/member/:community_id', auth, getCommunityMember)

router.get('/:community_id', auth, getCommunityById)

router.put('/update', auth, updateCommunity)

router.delete('/:community_id', auth, deleteCommunity)


module.exports = router