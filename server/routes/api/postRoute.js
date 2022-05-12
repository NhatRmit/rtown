const express = require('express')
const router = express.Router()
const {
    post
} = require('../../controllers/postController')

const { auth } = require('../../middlewares/authMiddleware')
const upload = require('../../middlewares/uploadMiddleware')

router.post('/', upload.single("file"), auth, post.createPost)

router.get('/', auth, post.getPosts)
router.get('/filter', auth, post.filterPost)
router.get('/search', auth, post.searchPost)
router.get('/myPosts', auth, post.getMyPosts)
router.get('/:post_id', auth, post.getPostById)

router.put('/update/:post_id', upload.single("file"), auth, post.editPost)
router.put('/upvote/:post_id', auth, post.upvotePost)
router.put('/removeupvote/:post_id', auth, post.removeupvotePost)
router.put('/downvote/:post_id', auth, post.downvotePost)

router.delete('/:post_id', auth, post.deletePost)

router.post('/postCommunity/:community_id', upload.single("file"), auth, post.createCommunityPost)
router.get('/postCommunity/:community_id', auth, post.getCommunityPosts)

router.post('/comment/:post_id', upload.single("file"), auth, post.createComment)
router.get('/comment/:post_id/:comment_id', auth, post.getCommentById)
router.put('/comment/edit/:post_id/:comment_id', upload.single('file'), auth, post.editComment)
router.delete('/comment/:post_id/:comment_id', auth, post.deleteComment)

router.post('/event/:community_id', upload.single("file"), auth, post.createEvent)
router.put('/event/checkin/:post_id', auth, post.checkIn)
router.put('/event/checkout/:post_id', auth, post.checkOut)

module.exports = router