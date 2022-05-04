import React, { useEffect, useState } from "react";
// import Filter from '../components/Filter/Filter'
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import "./Comment.css";
import { useDispatch, useSelector, } from 'react-redux'
import EditComment from "../../post/EditComment";
import Moment from "react-moment";
import { deleteComment, getCommentById } from "../../actions/post";
import { loadUser } from "../../actions/auth";
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const Comment = ({ post, comment }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(false)
  const onDelete = e => {
    e.preventDefault()
    dispatch(deleteComment(post._id, comment._id, navigate))
  }
  const onEdit = e => {
    e.preventDefault()
    setEdit(true)
    dispatch(getCommentById(post._id, comment._id))
  }

  const onProfile = (e) => {
    e.preventDefault()
    navigate(`/profiles/${comment.user}`)
  }


  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  const auth = useSelector(state => state.auth)

  return (
    <>
      <div className='comment-display'>
        <div onClick={onProfile} className='user'>
          <span className='user-icon'>
            {/*CHANGE ICON FOR ME*/}
            {/* <IconContext.Provider value={{ color: "#676767", size: "1em" }}>
              <FaUserCircle />
            </IconContext.Provider> */}
            <img src={comment && comment.avatar} alt="" style={{width: "2rem"}}/>
          </span>
          <p>{comment.name}</p>
        </div>
        <div className='comment-content'>
          <p>
            {
              !edit ? comment.text :
                <EditComment singlePost={post} singleComment={comment} />
            }
          </p>
          <p className="comment-time">
            <Moment format='DD/MM/YYYY  HH:mm '>{comment.date}</Moment>
          </p>
        </div>
        {/* <button onClick={onEdit} type='submit'>
            Edit
          </button>
          <button onClick={onDelete} type='submit'>
            Delete
          </button> */}
        <div className="content-right-footer">
          {/*Edit post icon*/}
          {
            auth._id === comment.user &&
            <span className='icon' onClick={onEdit}>
              <label htmlFor='edit-post'>
                <IconContext.Provider value={{ color: "#676767", size: "1em" }}>
                  <AiFillEdit />
                </IconContext.Provider>
              </label>
              <p id='edit-post' className='icon-label'>
                Edit
              </p>
            </span>
          }
          {/*Delete post icon*/}
          {
            auth._id === comment.user &&
            <span className='icon' onClick={onDelete}>
              <label htmlFor='delete-post'>
                <IconContext.Provider value={{ color: "#676767", size: "1em" }}>
                  <AiFillDelete />
                </IconContext.Provider>
              </label>
              <p id='delete-post' className='icon-label'>
                Delete
              </p>
            </span>
          }
        </div>
      </div>
    </>
  );
};

export default Comment;
