import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from '../post/PostItem'
import CommentForm from './CommentForm'
import { getPosts } from '../actions/post'
import { Fragment, useEffect } from 'react'

const Post = ({ getPosts, post: {post, loading }, match }) => {
    useEffect(() => {
        getPosts(match.params.id);
    }, [getPosts]);

    return loading || post === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link to='/posts' className='btn'>
                Back To Post
            </Link>
            <PostItem post ={ post} showActions ={false} />
            <CommentForm postId = {post._id} />

        </Fragment>
    )
}