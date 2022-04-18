const express = require('express')
const router = express.Router()
const {auth} = require('../../middlewares/authMiddleware')
const {
    getAllCommunity,
    getCommunityById,
    createCommunity,
    updateCommunity,
    deleteCommunity,

} = require('../../controllers/communityController')

router.get('/', getAllCommunity)

router.get('/:community_id', auth, getCommunityById)

router.post('/', auth, createCommunity)

router.put('/update', auth, updateCommunity)

router.delete('/:community_id', auth, deleteCommunity)


module.exports = router