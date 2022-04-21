import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPosts } from '../../actions/post'
import Spinner from '../Layout/Spinner'
import PostsSection from '../Newsfeed/PostsSection'
import Header from './Header'


const ProfileMain = ({ profile, loading }) => {
    const posts = useSelector(state => state.post.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMyPosts())
    }, [dispatch])

    return (
        <>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <>
                    <Header />
                    {
                        posts.map(post =>
                            <PostsSection key={post._id} post={post} />)
                    }
                </>
            )
            }
        </>
    )
}

export default ProfileMain