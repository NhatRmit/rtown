import "./PostsSection.css";
import { BiUpvote, BiDownvote, BiRightArrow } from 'react-icons/bi'
import { BsPatchCheckFill } from 'react-icons/bs'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { TiLockClosedOutline } from 'react-icons/ti'
import { FaUserCircle } from 'react-icons/fa'
import { MdReportGmailerrorred } from 'react-icons/md'
import { IconContext } from 'react-icons/lib'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useMatch } from 'react-router-dom'
import Moment from 'react-moment'
import { useEffect, useState, useRef } from 'react'
import { getPosts, deletePost, clearPost, addUpvote, removeUpvote, checkIn, checkOut } from '../../actions/post'
import EditPost from './EditPost'
import Comment from '../Comment/Comment'
import CommentForm from '../Comment/CommentForm'

const PostsSection = ({ post, isEvent }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [edit, setEdit] = useState(false)
  const [show, setShow] = useState(false)
  const profile = useSelector(state => state.profile.profile)

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
  const onCommunity = e => {
    e.preventDefault()
    navigate(`/communities/${post.community._id}`)
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

  const onCheckin = e => {
    e.preventDefault()
    dispatch(checkIn(post._id, auth._id, navigate))
  }

  const onCheckout = e => {
    e.preventDefault()
    dispatch(checkOut(post._id, auth._id, navigate))
    alert("successfully check out")
  }

  const checkinIndex = post && post.checkouts
    .map(item => item.user)
    .indexOf(auth._id)

  const checkoutIndex = profile && profile.checkouts
    .map(item => item.event)
    .indexOf(post._id)

  const memberIndex = post.community && post.community.members
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
      <div className={isEvent ? 'event-container' : 'post-container'}>
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
            {post.community !== null ?
              <>
                <div className="content-left-header">
                  <span className="users-icon" onClick={onCommunity}>
                    <label htmlFor='username'>
                      <img src={post.community && post.community.avatar} alt="" style={{ height: "2.5rem", width: "2.5rem", borderRadius: "50%" }} />
                    </label>
                    <p id='username' className='username'>
                      {post.community && post.community.communityName}
                    </p>
                  </span>
                  <span className="users-icon">
                    <IconContext.Provider value={{ color: "#676767", size: "1em" }}>
                      <BiRightArrow />
                    </IconContext.Provider>
                  </span>
                  <span className="users-icon" onClick={onProfile}>
                    <label htmlFor='username'>
                      {
                        (post.profile && post.profile.avatar) === undefined ?
                          <IconContext.Provider value={{ color: "#676767", size: "2em" }}>
                            <FaUserCircle />
                          </IconContext.Provider> :
                          <img src={post.profile && post.profile.avatar} alt="" style={{ height: "1.5rem", width: "1.5rem", borderRadius: "50%" }} />
                      }
                    </label>
                    <p id='username' className='username'>
                      {post && post.user.usernameOrEmail}
                    </p>
                    <p className='uploaded-time'>
                      <Moment format='DD/MM/YYYY'>
                        {post.date && post.date}
                      </Moment>
                    </p>
                  </span>
                  {post.Rpoint !== 0 &&
                    <h3 className="rpoint" style={{ cursor: "default", margin: "0.8rem 0rem" }}>
                      <span style={{
                        textShadow: "3px 3px 8px var(--red)",
                      }}> {post.Rpoint} Rpoints</span>
                    </h3>
                  }
                </div>
              </>
              :
              <div className="content-left-header">
                <span className="users-icon" onClick={onProfile}>
                  <label htmlFor='username'>
                    {
                      (post.profile && post.profile.avatar) === undefined ?
                        <IconContext.Provider value={{ color: "#676767", size: "2em" }}>
                          <FaUserCircle />
                        </IconContext.Provider> :
                        <img src={post.profile && post.profile.avatar} alt="" style={{ height: "2.5rem", width: "2.5rem", borderRadius: "50%" }} />
                    }
                  </label>
                  <p id='username' className='username'>
                    {post && post.user.usernameOrEmail}
                  </p>
                  <p className='uploaded-time'>
                    <Moment format='DD/MM/YYYY'>
                      {post.date && post.date}
                    </Moment>
                  </p>
                </span>

              </div>}
            {post.Rpoint !== 0 ?
              ((post.startTime && (new Date(post.startTime)) <= time) ?
                <div className="content-right-header">
                  {
                    ((Math.floor(time - new Date(post.startTime)) / 1000) < 60000000) ?
                      (checkinIndex === -1) ?
                        <button
                          style={{
                            alignItem: "center",
                            justifyContent: "center",
                            backgroundColor: "var(--red)",
                            color: "white",
                            borderRadius: "5px",
                            borderStyle: "none",
                            cursor: "pointer",
                            display: "inline-flex",
                            marginLeft: "0.5rem",
                            padding: "0.75rem",
                          }}
                          className="checkout" onClick={onCheckin}>Check In</button>
                        :
                        <p>Check in successfully!</p>
                      :
                      (post.endTime && (new Date(post.endTime)) <= time) ?
                        <>
                          {
                            ((Math.floor(time - new Date(post.endTime)) / 1000) < 60) ?
                              (checkinIndex !== -1 && checkoutIndex === -1) ?
                                <button
                                  style={{
                                    alignItem: "center",
                                    justifyContent: "center",
                                    backgroundColor: "var(--navy)",
                                    color: "white",
                                    borderRadius: "5px",
                                    borderStyle: "none",
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    marginLeft: "0.5rem",
                                    padding: "0.75rem",
                                  }}
                                  className="checkout" onClick={onCheckout}>Check Out</button>
                                :
                                <IconContext.Provider value={{ color: "#000054", size: "1.5em" }}>
                                  <BsPatchCheckFill />
                                </IconContext.Provider> :
                              checkoutIndex !== -1 ?
                                <IconContext.Provider value={{ color: "#000054", size: "1.5em" }}>
                                  <BsPatchCheckFill />
                                </IconContext.Provider> :
                                <IconContext.Provider value={{ color: "#000054", size: "1.5em" }}>
                                  <TiLockClosedOutline />
                                </IconContext.Provider>
                          }
                        </> : <></>
                  }
                </div> : <></>)
              : <></>
            }
          </div>
          <div className='post-content'>
            <img src={post.image} alt="" style={{ width: "30%" }} />
            <div>
              {!edit ?
                <>
                  {show ? post.text : post.text.substring(0, 250)}
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
                <EditPost singlePost={post} pullData={pullData} />
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
          <div className="comment-page-container">
            <div className="comment-section">
              {
                (memberIndex !== -1) ?
                  <CommentForm postId={post._id} /> : <p>Join the community to Comment</p>
              }
              {
                post.comments.map(comment =>
                  <Comment key={comment._id} post={post} comment={comment} />
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default PostsSection;
