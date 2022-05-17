const express = require('express')
const router = express.Router()
const { auth } = require('../../middlewares/authMiddleware')
const upload = require('../../middlewares/uploadMiddleware')
const {
    getAllUserProfile,
    getAllCommunityRequest,
    acceptCommunity,
    getPosts,
    deletePost,
    editPost,
    deleteCommunity,
    editCommunity,
    getAllAcceptedCommunity
} = require('../../controllers/adminController')

router.get('/getAllUserProfile', auth, getAllUserProfile)
router.get('/getAllCommunitiesRequest', auth, getAllCommunityRequest)
router.get('/getAllAcceptedCommunity', auth, getAllAcceptedCommunity)

router.put('/communityAccept/:community_id', auth, acceptCommunity)
router.delete('/deleteCommunity/:community_id', auth, deleteCommunity)
router.put('/editCommunity/:community_id', upload.single("file"), auth, editCommunity)

router.get('/getAllPosts', auth, getPosts)
router.delete('/:id', auth, deletePost)
router.put('/update/:post_id', upload.single("file"), auth, editPost)

module.exports = router