const express = require('express')
const router = express.Router()
const {getPosts, searchPost, getMyPosts, filterTrendingPost, createPost, editPost, upvotePost, removeupvotePost, downvotePost, deletePost, createComment, deleteComment, getPostById} = require('../../controllers/postController')

const {auth} = require('../../middlewares/authMiddleware')

router.get('/', getPosts)

router.get('/myPosts', auth, getMyPosts)

router.get('/:id', auth, getPostById)

router.get('/search', searchPost)

router.get('/filter', filterTrendingPost)

router.post('/', auth, createPost)

router.put('/update/:post_id', auth, editPost)

router.put('/upvote/:id', auth, upvotePost)

router.put('/removeupvote/:id', auth, removeupvotePost)

router.put('/downvote/:id', downvotePost)

router.delete('/:id',auth ,deletePost)

router.post('/comment/:id', createComment)

router.delete('/comment/:id/:comment_id', deleteComment)

module.exports = router