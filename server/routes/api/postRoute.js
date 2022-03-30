const express = require('express')
const router = express.Router()
const {getPosts, createPost, editPost, upvotePost, downvotePost, deletePost, createComment, deleteComment} = require('../../controllers/postController')

router.get('/', getPosts)

router.post('/', createPost)

router.put('/:id', editPost)

router.put('/upvote/:id', upvotePost)

router.put('/downvote/:id', downvotePost)

router.delete('/:id', deletePost)

router.post('/comment/:id', createComment)

router.delete('/comment/:id/:comment_id', deleteComment)

module.exports = router