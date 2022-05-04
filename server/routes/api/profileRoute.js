const express = require('express')
const router = express.Router()
const {auth} = require('../../middlewares/authMiddleware')
const { 
    getUserProfile, 
    getProfile, 
    getAllProfiles, 
    createProfile,
    updateProfile, 
    joinCommunity, 
    leaveCommunity,
    increaseRpoint,

} = require('../../controllers/profileController')

router.get('/myProfile', auth, getProfile)

router.get('/:user_id', auth, getUserProfile)

router.get('/', getAllProfiles)

router.post('/', auth, createProfile)

router.put('/update', auth, updateProfile)

router.put('/join/:community_id', auth, joinCommunity)

router.put('/leave/:community_id', auth, leaveCommunity)

router.put('/rpoint/increase/:profile_id/:post_id', increaseRpoint)

// router.put('/rpoint/buy/:item_id', auth, buyItem)

// router.put('/rpoint/used/:item_id', auth, usedItem)

module.exports = router