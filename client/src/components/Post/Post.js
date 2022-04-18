import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../Layout/Spinner'
import PostItem from '../PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import { Fragment, useEffect } from 'react'
import { getPost } from '../../actions/post'

const Post = ({ getPost, post: { post, loading } }) => {
    const {id} = useParams()
    useEffect(() => {
        getPost(id);
    }, [getPost, id]); 

    return loading || post === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link to='/posts' className='btn'>
                Back To Post
            </Link>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div>
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </div>

        </Fragment>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    getPost: PropTypes.func.isRequired,
    post: state.post
})

export default connect(
    mapStateToProps,
    { getPost }
)(Post);