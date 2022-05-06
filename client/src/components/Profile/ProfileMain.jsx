import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPosts } from '../../actions/post'
import { getProfile } from '../../actions/profile'
import Spinner from '../Layout/Spinner'
import PostsSection from '../Post/PostsSection'
import RItem from "../../components/RShop/RItem";
import RedeemedButton from "../Buttons/RedeemedButton";
import { getMyPosts } from "../../actions/post";

const ProfileMain = ({ profile, loading }) => {
    const posts = useSelector(state => state.post.posts)
    // const profile = useSelector(state => state.profile.profile)
    const items = useSelector(state => state.item.items)
    const auth = useSelector(state => state.auth)
    const { userId } = useParams()
    const dispatch = useDispatch()
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const onMyPosts = e => {
        e.preventDefault()
        toggleTab(1)
        dispatch(getMyPosts())
    }
    useEffect(() => {
        dispatch(getPosts())
        dispatch(getProfile())
        // dispatch(getItems())
    }, [dispatch])

    return (
        <>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <>
                    <div className='rItems-section'>
                        <div className='rshop-wrapper'>
                            <div id="tabs-profile" className='tabs-container'>
                                <div className='bloc-tabs'>
                                    <button
                                        className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                                        onClick={onMyPosts}>
                                        My Posts
                                    </button>
                                    {
                                        auth._id === profile.user ?
                                            <button
                                                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                                                onClick={() => toggleTab(2)}>
                                                My Items
                                            </button>
                                            :
                                            <></>
                                    }

                                </div>

                                <div className='content-tabs'>
                                    <div
                                        className={
                                            toggleState === 1 ? "content  active-content" : "content"
                                        }>
                                        {
                                            posts.map(post =>
                                                post.user._id === userId &&
                                                <div>
                                                    <PostsSection key={post._id} post={post} />
                                                </div>
                                            )
                                        }
                                    </div>

                                    <div
                                        className={
                                            toggleState === 2 ? "content  active-content" : "content"
                                        }>
                                        {
                                            profile && profile.itemList.map(myItem =>
                                                <div className='displayedItems'>
                                                    <RItem myItem={myItem} isMyItem={true} />
                                                    <RedeemedButton />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}

export default ProfileMain