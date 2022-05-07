const express = require('express')
const router = express.Router()
const {auth} = require('../../middlewares/authMiddleware')
const {
    getAllUserProfile,
    getAllCommunityRequest,
    acceptCommunity,
    getPosts,
    deletePost,
    editPost,
    deleteCommunity,
    editMemberProfile,
    editCommunity
} = require('../../controllers/adminController')

router.get('/getAllUserProfile', auth, getAllUserProfile)
router.get('/getAllCommunitiesRequest', auth, getAllCommunityRequest)
router.put('/communityAccept/:community_id', auth, acceptCommunity)
router.delete('/deleteCommunity/:community_id', auth, deleteCommunity)
router.put('/editMemberProfile/:user_id', auth, editMemberProfile)
router.put('/editCommunity/:community_id', auth, editCommunity)

router.get('/getAllPosts', auth, getPosts)
router.delete('/:id', auth, deletePost)
router.put('/update/:post_id', auth, editPost)

module.exports = router