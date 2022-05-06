const express = require('express')
const router = express.Router()
const {auth} = require('../../middlewares/authMiddleware')
const {
    getAllUserProfile,
    getAllCommunityRequest,
    acceptCommunity,
    getPosts,
    deletePost,
    editPost

} = require('../../controllers/adminController')

router.get('/getAllUserProfile', auth, getAllUserProfile)
router.get('/getAllCommunitiesRequest', auth, getAllCommunityRequest)
router.put('/communityAccept/:community_id', auth, acceptCommunity)

router.get('/getAllPosts', auth, getPosts)
router.delete('/:id', auth, deletePost)
router.put('/update/:post_id', auth, editPost)

module.exports = router