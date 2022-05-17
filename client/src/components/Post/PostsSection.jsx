import "./PostsSection.css";
import { BiUpvote, BiDownvote } from 'react-icons/bi'
import { BsPatchCheckFill } from 'react-icons/bs'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { MdReportGmailerrorred } from 'react-icons/md'
import { IconContext } from 'react-icons/lib'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Moment from 'react-moment'
import { useEffect, useState } from 'react'
import { deletePost, clearPost, addUpvote, removeUpvote, checkIn, checkOut } from '../../actions/post'
import EditPost from './EditPost'
import Comment from '../Comment/Comment'
import CommentForm from '../Comment/CommentForm'

const PostsSection = ({ post }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [edit, setEdit] = useState(false)

  const pullData = (data) => {
    setEdit(data)
  }

  const onEdit = e => {
    e.preventDefault()
    setEdit(true)
    dispatch(clearPost())
  }
  const onDelete = (e) => {
    e.preventDefault()
    dispatch(deletePost(post._id))
  }
  const onProfile = (e) => {
    e.preventDefault()
    navigate(`/profiles/${post.user._id}`)
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

  const onCheckout = e => {
    e.preventDefault()
    dispatch(checkOut(post._id, auth._id, navigate))
  }

  const checkInIndex = post && post.checkouts
    .map(item => item.user)
    .indexOf(auth._id)

  const checkoutIndex = profile && profile.checkouts
    .map(item => item.event)
    .indexOf(post._id)

  let memberIndex
  memberIndex = post.community && post.community.members
    .map(item => item.memberId)
    .indexOf(auth._id)

  const [time, setTime] = useState(null)

  useEffect(() => {
    let timer = setInterval(() => {
      let count = 0
      count++
      setTime(new Date())
      if (count === 10) {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    }
  }, [])

  return (
    <div>
      <div className='post-container'>
        <div className='vote-container'>
          <span className='upvote-icon' onClick={handleUpvote}>
            <IconContext.Provider value={{ color: "#676767", size: "1.5em" }}>
              <BiUpvote />
            </IconContext.Provider>
          </span>
          <p>{post.upvotes.length}</p>
          <span className='downvote-icon' onClick={handleDownvote}>
            <IconContext.Provider value={{ color: "#676767", size: "1.5em" }}>
              <BiDownvote />
            </IconContext.Provider>
          </span>
        </div>

        <div className='content-container'>
          <div className='content-section-header'>
            <div className="content-left-header">
              <span className="users-icon" onClick={onProfile}>
                <label htmlFor='username'>
                  {
                    (post.profile && post.profile.avatar) === undefined ?
                      <IconContext.Provider value={{ color: "#676767", size: "1.5em" }}>
                        <FaUserCircle />
                      </IconContext.Provider> :
                      <img src={post.profile && post.profile.avatar} alt="" style={{ width: "2rem", borderRadius: "50%" }} />
                  }
                </label>
                <p id='username' className='username'>
                  {post && post.user.usernameOrEmail}
                </p>
              </span>

              <p className='uploaded-time'>
                <Moment format='DD/MM/YYYY'>
                  {post.date && post.date}
                </Moment>
              </p>
            </div>
            {
              (post && post.Rpoint !== 0) && (post.endTime && (new Date(post.endTime)) <= time) ?
                <div className="content-right-header">
                  {
                    (checkoutIndex === -1) ?
                      <button className="checkout" onClick={onCheckout}>Check Out</button>
                      :
                      <IconContext.Provider value={{ color: "#000054", size: "1.5em" }}>
                        <BsPatchCheckFill />
                      </IconContext.Provider>
                  }
                </div> : <></>
            }
          </div>
          <div className='post-content'>
            <img src={post.image} alt="" style={{ width: "30%" }} />
            <div>
              {
                !edit ? post.text :
                  <EditPost singlePost={post} pullData={pullData}/>
              }
            </div>
          </div>
          <div className='content-section-footer'>
            <div className="content-left-footer">
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
              {
                auth._id === post.user._id &&
                <>
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
                </>
              }
            </div>
          </div>
        </div>
      </div >
      <div className="comment-page-container">
        <div className="comment-section">
          {
            post.comments.map(comment =>
              <Comment key={comment._id} post={post} comment={comment} />
            )
          }
          {
            (memberIndex !== -1) ?
              <CommentForm postId={post._id} /> : <p>Join the community to Comment</p>
          }

        </div>

      </div>

    </div>

  );
};

export default PostsSection;
