import React, { Fragment} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect} from 'react-redux'
import Moment from 'react-moment'
import { deleteComment,
         editComment } from '../actions/post'

const CommentItem = ({
    postId,
    comment: {_id, text, name, avatar, user, date},
    auth,
    deleteComment
}) => {
  return (
      <div>
          <div>
              <Link to= {`/profile/${user}`} >
                  <img
                   src={avatar}
                    alt="" 
                  />
                  <h4>{name}</h4>
              </Link>
          </div>
          <div>
              <p>{text}</p>
              <p>Posted on <Moment format='YYYY/MM/DD'>{date}</Moment></p>
              {!auth.loading && user === auth.user._id && (
                  <div>
                    <button onClick={e => deleteComment(postId, _id)} type= 'button' > Delete icon</button>
                    <button onClick={e => editComment(postIdm, _id)} type='button' >Edit icon</button>
                  </div>

              )}
              
          </div>

      </div> 
  )
}

CommentItem.propTypes = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapSateToProps = state => ({
    auth: state.auth
})

export default connect(mapSateToProps, { deleteComment }) (CommentItem)