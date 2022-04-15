const express = require('express')
const router = express.Router()
const {getPosts, searchPost, filterTrendingPost, createPost, editPost, upvotePost, removeupvotePost, downvotePost, deletePost, createComment, deleteComment} = require('../../controllers/postController')

const {auth} = require('../../middlewares/authMiddleware')

router.get('/', getPosts)

router.get('/search', searchPost)

router.get('/filter', filterTrendingPost)

router.post('/', auth, createPost)

router.put('/:id', editPost)

router.put('/upvote/:id', auth, upvotePost)

router.put('/removeupvote/:id', auth, removeupvotePost)

router.put('/downvote/:id', downvotePost)

router.delete('/:id', deletePost)

router.post('/comment/:id', createComment)

router.delete('/comment/:id/:comment_id', deleteComment)


module.exports = router