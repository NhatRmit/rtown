import React, { Fragment, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect, useDispatch} from 'react-redux'
import Moment from 'react-moment'
import { clearPost, deleteComment,
         editComment, 
         getCommentById} from '../actions/post'
import EditComment from './EditComment'

const CommentItem = ({ post }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)




    return (
        post.comments.map(comment =>(
        <div>     
            <div>{post.name}</div>
            <p>{comment.text}</p>
            <p>Posted on <Moment format='DD/MM/YYYY  HH:mm '>{comment.date}</Moment></p> 
            <button onClick={(e) => 
            {
                e.preventDefault()
                dispatch(deleteComment(post._id, comment._id, navigate))
            }} 
            type='submit'>
                Delete
            </button>
            <div className='comment-content'>
                        <div>
                            {
                                !edit ? comment.text :
                                    <EditComment singlePost={post} singleComment ={comment._id}/>
                            }
                        </div>
            </div>
            <button onClick={(e) =>
            {
                e.preventDefault()
                dispatch(editComment(post._id, comment._id, navigate))                
            }} 
            type='submit'>
                Edit Comment
            </button>
        </div>  
        ))
    )
}



export default CommentItem