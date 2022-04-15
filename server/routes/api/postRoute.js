const express = require('express')
const router = express.Router()
const {getPosts, searchPost, filterTrendingPost, createPost, editPost, upvotePost, downvotePost, deletePost, createComment, deleteComment} = require('../../controllers/postController')

const {auth} = require('../../middlewares/authMiddleware')

router.get('/', getPosts)

router.get('/search', searchPost)

router.get('/filter', filterTrendingPost)

router.post('/', auth, createPost)

router.put('/update/:id', auth, editPost)

router.put('/upvote/:id', auth, upvotePost)

router.put('/downvote/:id', downvotePost)

router.delete('/:id',auth, deletePost)

router.post('/comment/:id', createComment)

router.delete('/comment/:id/:comment_id', deleteComment)

//router.put('/', auth, editPost)
module.exports = router