import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, getMyPosts } from '../../actions/post'
import Spinner from '../Layout/Spinner'
import PostItem from '../Posts/PostItem'
import Posts from '../Posts/Posts'

const ProfileMain = ({ profile, loading }) => {
    const posts = useSelector(state => state.post.posts)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getMyPosts())
    }, [dispatch])

    return (
        <div>
            {profile === null || loading ? (
                <Spinner />
            ) : (

                <div>
                    <p>123</p>
                    <p>123</p>
                    <p>123</p>
                    <p>List of Post</p>
                    {posts.map(post =>
                        <PostItem post={post} />
                    )}
                </div>
            )}
        </div>
    )
}

export default ProfileMain