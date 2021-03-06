import React, { useEffect, useState } from "react";
// import Filter from '../components/Filter/Filter'
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import "./Comment.css";
import { useDispatch, useSelector, } from 'react-redux'
import EditComment from "./EditComment";
import Moment from "react-moment";
import { deleteComment, getCommentById, } from "../../actions/post";
import { loadUser } from "../../actions/auth";
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const Comment = ({ post, comment }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(false)
  const [show, setShow] = useState(false)
  const auth = useSelector(state => state.auth)



  const pullData = (data) => {
    setEdit(data)
  }

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
    navigate(`/profiles/${comment && comment.user}`)
  }



  return (
    <>
      <div className='comment-display'>
        <div onClick={onProfile} className='user'>
          <span className='user-icon'>
            <img src={comment && comment.avatar} alt="" style={{ height: "1.3rem", width: "1.3rem", borderRadius: "50%" }} />
          </span>
          <p>{comment && comment.name}</p>
        </div>
        <div className='comment-content'>
          <img src={comment.image} alt="" style={{ width: "30%" }} />
          <div>
            {
              !edit ?
                <>
                  {show ? comment.text : comment.text.substring(0, 250)}
                  <button style={{
                    alignItem: "center",
                    justifyContent: "center",
                    backgroundColor: "grey",
                    fontSize: "0.5rem",
                    color: "white",
                    borderRadius: "1rem",
                    borderStyle: "none",
                    cursor: "pointer",
                    marginLeft: "0.5rem",
                    padding: "0.3rem",
                  }} onClick={() => setShow(!show)}>
                    Show more
                  </button>
                </>
                :
                <EditComment singlePost={post} singleComment={comment} pullData={pullData} />
            }
          </div>
          <p className="comment-time">
            <Moment format='DD/MM/YYYY  HH:mm '>{comment.date}</Moment>
          </p>
        </div>
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
