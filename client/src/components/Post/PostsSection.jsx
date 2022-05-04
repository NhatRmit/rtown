import "./PostsSection.css";
import { BiUpvote, BiDownvote, BiUserCircle } from 'react-icons/bi'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { MdReportGmailerrorred } from 'react-icons/md'
import { IconContext } from 'react-icons/lib'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Moment from 'react-moment'
import { useEffect, useState } from 'react'
import { deletePost, clearPost, getPostById, addUpvote, addDownvote, removeUpvote, } from '../../actions/post'
import EditPost from '../Posts/EditPost'
import { getProfileById } from '../../actions/profile'
import Comment from '../Comment/Comment'
import CommentForm from "../../post/CommentForm";

const PostsSection = ({ post }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const profiles = useSelector(state => state.profile.profiles)

  const [edit, setEdit] = useState(false)

  const onEdit = e => {
    e.preventDefault()
    setEdit(true)
    // navigate(`/posts/${post._id}`)
    // dispatch(getPostById(post._id))
    dispatch(clearPost())
  }
  const onDelete = (e) => {
    e.preventDefault()
    dispatch(deletePost(post._id))
  }
  const onProfile = (e) => {
    e.preventDefault()
    navigate(`/profiles/${post.user}`)
  }
  const onUpvote = (e) => {
    e.preventDefault()
    e.target.style.color = 'blue'
    dispatch(addUpvote(post._id))
  }
  const unUpvote = (e) => {
    e.preventDefault()
    e.target.style.color = 'red'
    dispatch(removeUpvote(post._id))
  }

  const handleUpvote = (e) => {
    e.preventDefault()
    post.upvotes.length === 0 ? onUpvote(e) : unUpvote(e)
  }
  const handleDownvote = (e) => {
    e.preventDefault()
    post.upvotes.length === 1 ? unUpvote(e) : unUpvote(e)
  }

  return (
    <>
      <div className='post-container'>
        <div className='vote-container'>
          <span className='upvote-icon' onClick={handleUpvote}>
            {/*CHANGE ICONS FOR ME */}
            <IconContext.Provider value={{ color: "#676767", size: "1.5em" }}>
              <BiUpvote />
            </IconContext.Provider>
          </span>
          <p>{post.upvotes.length}</p>
          <span className='downvote-icon' onClick={handleDownvote}>
            {/*CHANGE ICONS FOR ME */}
            <IconContext.Provider value={{ color: "#676767", size: "1.5em" }}>
              <BiDownvote />
            </IconContext.Provider>
          </span>
        </div>

        <div className='content-container'>
          <div className='content-section-header'>
            {/*CHANGE ICONS FOR ME */}
            <span className="users-icon" onClick={onProfile}>
              <label htmlFor='username'>
                <IconContext.Provider value={{ color: "#676767", size: "1.5em" }}>
                  <FaUserCircle />
                </IconContext.Provider>
              </label>
              <p id='username' className='username'>
                {post.name && post.name}
              </p>
            </span>

            <p className='uploaded-time'>
              <Moment format='DD/MM/YYYY'>
                {post.date && post.date}
              </Moment>
            </p>
          </div>

          <div className='post-content'>
            <p>
              {
                !edit ? post.text :
                  <EditPost singlePost={post} />
              }
            </p>
          </div>
          <div className='content-section-footer'>
            <div className="content-left-footer">
              {/*Report icon*/}
              <span className='icon'>
                <Link to='/'>
                  <label htmlFor='report'>
                    <IconContext.Provider value={{ color: "#676767", size: "1.5em" }}>
                      <MdReportGmailerrorred />
                    </IconContext.Provider>
                  </label>
                </Link>
                <p id='report' className='icon-label'>
                  Report
                </p>
              </span>
            </div>

            <div className="content-right-footer">
              {/*Edit post icon*/}
              {
                auth._id === post.user &&
                <span className='icon' onClick={onEdit}>
                  <label htmlFor='edit-post'>
                    <IconContext.Provider value={{ color: "#676767", size: "1.5em" }}>
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
                auth._id === post.user &&
                <span className='icon' onClick={onDelete}>
                  <label htmlFor='delete-post'>
                    <IconContext.Provider value={{ color: "#676767", size: "1.5em" }}>
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
        </div>
      </div >
      <div className="comment-page-container">
        <div className="comment-section">
          {
            post.comments.map(comment =>
              <Comment post={post} comment={comment} />
            )
          }
          <CommentForm postId={post._id} />
        </div>

      </div>

    </>

  );
};

export default PostsSection;
