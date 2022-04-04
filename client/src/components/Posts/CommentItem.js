import React, { Fragment} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteComment } from '../../actions/post'



const CommentItem = ({
    postID,
    comment:  { _id, text, name, avatar, user, date },
    auth,
    deleteComment
}) => (
    <div>
        <div>
            <Link to {`.../profile/${user}`} >
                <img src={avatar} alt="" />
                <h4>{name}</h4>
            </Link>
        </div>
        <div>
            <p>
                {text}
            </p>
            <p class='post-date'> Posted on <Moment format='YYYY/MM/DD'>{date}</Moment> </p>
            {!auth.loading && user === auth.user._id && (
                <button onClick={e => deleteComment(postID, _id)} type="button">
                        Delete
                </button>
            )}
        </div>
    </div>
)

CommentItem.propTypes = {
    postID: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequiredr,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteComment}) (CommentItem)