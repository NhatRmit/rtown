import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getPosts } from '../../actions/post'

const Posts = ({getPosts, post: { posts, loading}}) => {
    useEffect(
        () => {
            getPosts();
        }, [getPosts])

  return (
    <div>
        <div>        
            <h1 className='title'>POSTS</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Welcome to the community
            </p>
            {/* Postform */}
            <div className='posts'>
                {posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </div>
    </div>
  )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getPosts})(Posts);