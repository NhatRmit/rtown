const express = require('express')
const router = express.Router()
const {getPosts, editComment, searchPost, getMyPosts, filterTrendingPost, createPost, editPost, upvotePost, removeupvotePost, downvotePost, deletePost, createComment, deleteComment, getPostById, createEvent, getCommentById, checkOut, getCommunityPosts, createCommunityPost} = require('../../controllers/postController')

const {auth} = require('../../middlewares/authMiddleware')

router.get('/', getPosts)

router.get('/postCommunity/:community_id', getCommunityPosts)

router.get('/myPosts', auth, getMyPosts)

router.get('/filter', filterTrendingPost)

router.get('/search', searchPost)

router.get('/:id', auth, getPostById)

router.get('/:post_id/:comment_id', auth, getCommentById)

router.post('/', auth, createPost)

router.post('/postCommunity/:community_id', auth, createCommunityPost)

router.put('/update/:post_id', auth, editPost)

router.put('/editcomment/:post_id/:comment_id', auth, editComment)

router.put('/upvote/:id', auth, upvotePost)

router.put('/removeupvote/:id', auth, removeupvotePost)

router.put('/downvote/:id', auth, downvotePost)

router.delete('/:id',auth ,deletePost)

router.post('/comment/:id', auth, createComment)

router.delete('/comment/:id/:comment_id', auth, deleteComment)

router.post('/event/:community_id', createEvent)

router.put('/event/checkout/:post_id', auth, checkOut)

module.exports = router