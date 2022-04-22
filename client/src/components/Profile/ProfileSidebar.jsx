import React, { useEffect } from 'react'
import Spinner from '../Layout/Spinner'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CommunityItem from '../Communities/CommunityItem'
import ProfileAvatar from './ProfileAvatar'
import { getCommunityById, getMyCommunities } from '../../actions/community'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'
const ProfileSidebar = ({ profile, loading, communities }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onCreate = e => {
        e.preventDefault()
        navigate('/communities/community-request')
    }

    useEffect(() => {
        dispatch(getMyCommunities())
    }, [dispatch])

    console.log(communities)

    return (
        <>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <>
                    <ProfileAvatar />
                    <div className="community-item-container">
                        <div onClick={onCreate} className="community-item-create-community">
                            <span className='create-icon'>
                                <IconContext.Provider value={{ color: '#C0BFBF', size: '2em' }}>
                                    <BsFillChatDotsFill />
                                </IconContext.Provider>
                            </span>
                            <p>Create community</p>
                        </div>
                    </div>
                    {communities.map(community => {
                        return (
                            <CommunityItem key={community._id} community={community} />
                        )
                    }
                    )}
                </>
            )}
        </>
    )

}

export default ProfileSidebar