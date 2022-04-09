import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../actions/post'
const PostItem = ({ addLike, removeLike, post: {text, name, avatar, user, likes, comments, date } }) => {
  return (
    <div>
      <div>
        <p className=''>{text}</p>
        <p className='post-date'> Posted on <Moment format='DD/MM/YYYY'>{date}</Moment></p>
        <button type='button' className='btn btn-light' onClick={e => addLike(_id)}>
          <i className='fas fa-thumps-up'></i>
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button type='button' className='btn btn-light' onClick={e => removeLike(_id)}>
          <i className='fas fa-thumps-down'></i>
        </button>

        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{' '}{comments.length > 0 && (<span className='comment-count'>{comments.length}</span>)}
        </Link>
        
        <button type='button' className='btn btn-danger' onClick={e => deletePost(_id)}>
            <i className='fas fa-times' />
        </button>

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
export default connect(mapStateToProps, { addLike, removeLike })(PostItem)