import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProfileById } from '../../actions/profile'
import Spinner from '../Layout/Spinner'
import PostsSection from '../Post/PostsSection'
import RItem from "../../components/RShop/RItem";
import RedeemedButton from "../Buttons/RedeemedButton";
import { getUserPosts } from "../../actions/post";

const ProfileMain = ({ profile, loading }) => {
    const posts = useSelector(state => state.post.posts)
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
        // dispatch(getMyPosts())
        dispatch(getUserPosts(userId))
    }
    useEffect(() => {
        // dispatch(getMyPosts())
        dispatch(getUserPosts(userId))
        dispatch(getProfileById(userId))
    }, [dispatch, userId])

    return (
        <>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <>
                    <div className='rItems-section'>
                        <div className='rshop-wrapper' style={{width: "90%", marginLeft: "0"}}>
                            <div id="tabs-profile" className='tabs-container'>
                                <div className='bloc-tabs'>
                                    <button
                                        className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                                        onClick={onMyPosts}>
                                        Posts
                                    </button>
                                    {
                                        auth._id === userId ?
                                            <button
                                                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                                                onClick={() => toggleTab(2)}>
                                                My Items
                                            </button>
                                            :
                                            <></>
                                    }

                                </div>

                                <div className='content-tabs' style={{margin: "0"}}>
                                    <div className={toggleState === 1 ? "content  active-content" : "content"}>
                                        {
                                            posts.map(post =>
                                                post.user._id === userId &&
                                                <div key={post._id}>
                                                    <PostsSection post={post} />
                                                </div>
                                            )
                                        }
                                    </div>

                                    <div
                                        className={
                                            toggleState === 2 ? "content  active-content" : "content"
                                        }>
                                        {
                                            profile && profile.itemList.map((myItem) =>
                                                <div key={myItem._id} className='displayedItems'>
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