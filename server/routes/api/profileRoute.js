const express = require('express')
const router = express.Router()
const { auth } = require('../../middlewares/authMiddleware')
const { profile } = require('../../controllers/profileController')


router.post('/', auth, profile.createProfile)

router.get('/', auth, profile.getAllProfiles)
router.get('/myProfile', auth, profile.getProfile)
router.get('/:user_id', auth, profile.getUserProfile)

router.put('/update', auth, profile.updateProfile)
router.put('/join/:community_id', auth, profile.joinCommunity)
router.put('/leave/:community_id', auth, profile.leaveCommunity)

module.exports = router