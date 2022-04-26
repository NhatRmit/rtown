import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPosts } from '../../actions/post'
import Filter from '../Filter/Filter'
import Spinner from '../Layout/Spinner'
import PostsSection from '../Post/PostsSection'


const ProfileMain = ({ profile, loading }) => {
    const posts = useSelector(state => state.post.posts)
    const dispatch = useDispatch()
    const { userId } = useParams()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return (
        <>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <>
                    <Filter />
                    {
                        posts.map(post =>
                            post.user === userId &&
                            <PostsSection key={post._id} post={post} />)
                    }
                </>
            )
            }
        </>
    )
}

export default ProfileMain