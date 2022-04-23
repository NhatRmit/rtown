import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import Moment from 'react-moment'
import {
    deleteComment,
    editComment
} from '../actions/post'

const CommentItem = ({ post, comment }) => {
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const onDelete = (e) => {
        e.preventDefault()
        dispatch(deleteComment(post._id, comment._id))
    }

    return (
        post.comments.map(comment => (
            <div>
                <div>{post.name}</div>
                <p>{comment.text}</p>
                <p>Posted on <Moment format='DD/MM/YYYY  HH:mm '>{comment.date}</Moment></p>
                <button onClick={(e) => {
                    e.preventDefault()
                    dispatch(deleteComment(post._id, comment._id))
                }}
                    type='button'>Delete</button>
                <button ></button>
            </div>
        ))

    )
}



export default CommentItem