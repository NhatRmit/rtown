const express = require('express')
const router = express.Router()
const {getPosts, editComment, searchPost, getMyPosts, filterTrendingPost, createPost, editPost, upvotePost, removeupvotePost, downvotePost, deletePost, createComment, deleteComment, getPostById} = require('../../controllers/postController')

const {auth} = require('../../middlewares/authMiddleware')

router.get('/', getPosts)

router.get('/myPosts', auth, getMyPosts)

router.get('/:id', auth, getPostById)

router.get('/search', searchPost)

router.get('/filter', filterTrendingPost)

router.post('/', auth, createPost)

router.put('/update/:post_id', auth, editPost)

router.put('/editcomment/:id', auth, editComment)

router.put('/upvote/:id', auth, upvotePost)

router.put('/removeupvote/:id', auth, removeupvotePost)

router.put('/downvote/:id', auth, downvotePost)

router.delete('/:id',auth ,deletePost)

router.post('/comment/:id', auth, createComment)

router.delete('/comment/:id/:comment_id', deleteComment)

module.exports = router