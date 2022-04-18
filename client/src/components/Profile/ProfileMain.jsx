import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../actions/post'
import Spinner from '../Layout/Spinner'
import PostItem from '../Posts/PostItem'
import Posts from '../Posts/Posts'

const ProfileMain = ({ profile, loading }) => {
    const posts = useSelector(state => state.post.posts)

    return (
        <div>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <div>
                    <p>{profile.description}</p>
                    {posts.map(post => post.user === profile.user ? (
                        // <PostItem key={post._id} post={post}/>
                        <h4>lalala</h4>
                    ) : (
                        <h4>You have not posted anything yet</h4>
                    ))}
                </div>
            )
            }
        </div>
    )
}

export default ProfileMain