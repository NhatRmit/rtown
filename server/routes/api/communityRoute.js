const express = require('express')
const router = express.Router()
const { auth } = require('../../middlewares/authMiddleware')
const upload = require('../../middlewares/uploadMiddleware')

const {
    community
} = require('../../controllers/communityController')


router.post('/', upload.single("file"), auth, community.createCommunity)

router.get('/', auth, community.getAllCommunity)
router.get('/myCommunities/:user_id', auth, community.getMyCommunities)
router.get('/member/:community_id', auth, community.getCommunityMember)
router.get('/:community_id', auth, community.getCommunityById)

router.put('/update', auth, community.updateCommunity)

router.delete('/:community_id', auth, community.deleteCommunity)


module.exports = router