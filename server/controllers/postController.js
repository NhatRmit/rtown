const asyncHandler = require('express-async-handler')


const getPosts = asyncHandler(async(req, res) => {
    res.status(200).json("get post")
})

const createPost = asyncHandler(async(req, res) => {
    res.status(200).json("create post")
})

const editPost = asyncHandler(async(req, res) => {
    res.status(200).json("create post")
})

const upvotePost = asyncHandler(async(req, res) => {
    res.status(200).json("upvote post")
})

const downvotePost = asyncHandler(async(req, res) => {
    res.status(200).json("downvote post")
})

const deletePost = asyncHandler(async(req, res) => {
    res.status(200).json("delete post")
})

const createComment = asyncHandler(async(req, res) => {
    res.status(200).json("create comment")
})

const deleteComment = asyncHandler(async(req, res) => {
    res.status(200).json("delete comment")
})

module.exports = {
    getPosts, createPost, editPost, upvotePost, downvotePost, deletePost,
    createComment, deleteComment,
}