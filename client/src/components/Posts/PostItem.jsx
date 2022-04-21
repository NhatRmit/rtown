// import React from 'react'
// import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
// import Moment from 'react-moment'
// import { connect } from 'react-redux'
// import { addLike, removeLike, deletePost } from '../../actions/post'
// const PostItem = ({ addLike, removeLike, post: {auth, _id, text, name, avatar, user, likes, comments, date } }) => {
//   return (
//     <div>
//       <div>
//         <p className=''>{text}</p>
//         <p className='post-date'> Posted on <Moment format='DD/MM/YYYY'>{date}</Moment></p>
//         <button type='button' className='btn btn-light' onClick={e => addLike(_id)}>
//           <i className='fa fa-thumps-up'></i>
//           {/* <span>{likes.length > 0 && <span>{likes.length}</span>}</span> */}
//         </button>
//         <button type='button' className='btn btn-light' onClick={e => removeLike(_id)}>
//           <i className='fa fa-thumps-down'></i>
//         </button>

//         <Link to={`/post/${_id}`} className="btn btn-primary">
//           Discussion{' '}{comments.length > 0 && (<span className='comment-count'>{comments.length}</span>)}
//         </Link>
//         <button type='button' className='btn btn-danger' onClick={e => deletePost(_id)}>
//             <i className='fa fa-times' />
//         </button>

//         <Link to={`/posts/${_id}`}>
//           <h1>EDIT</h1>
//         </Link>

//       </div>
//     </div>
//   )
// }
// PostItem.propTypes = {
//   post: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired,
//   addLike: PropTypes.func.isRequired,
//   removeLike: PropTypes.func.isRequired,
//   deletePost: PropTypes.func.isRequired
// }

// const mapStateToProps = state => ({
//   auth: state.auth
// })
// export default connect(mapStateToProps, { addLike, removeLike, deletePost})(PostItem)

import './PostItem.css'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { BiUpvote } from 'react-icons/bi'
import { BiDownvote } from 'react-icons/bi'
import { IconContext } from 'react-icons/lib'
import { Link } from "react-router-dom"
import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect, useDispatch } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../actions/post'
const PostItem = ({ addLike, removeLike, post: { auth, _id, text, name, avatar, user, likes, comments, date } }) => {
  const dispatch = useDispatch()
  const onDelete = (e) => {
    e.preventDefault()
    dispatch(deletePost(_id))
  }
  return (
    <div>
      <div>
        <p className=''>{text}</p>
        <p className='post-date'> Posted on <Moment format='DD/MM/YYYY'>{date}</Moment></p>
        <button type='button' className='btn btn-light' onClick={e => addLike(_id)}>
          <i className='fa fa-thumps-up'></i>
        </button>
        <button type='button' className='btn btn-light' onClick={e => removeLike(_id)}>
          <i className='fa fa-thumps-down'></i>
        </button>

        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{' '}{comments.length > 0 && (<span className='comment-count'>{comments.length}</span>)}
        </Link>
        <button type='button' className='btn btn-danger' onClick={onDelete}>
          <i className='fa fa-times' />Delete
        </button>

        <Link to={`/posts/${_id}`} className="btn btn-primary">
          <h1>Edit</h1>
        </Link>
      </div>
    </div>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)