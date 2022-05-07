import React, { useEffect } from 'react'
import Spinner from '../Layout/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import CommunitySection from '../Community/CommunitySection'
import ProfileAvatar from './ProfileAvatar'
import { getMyCommunities } from '../../actions/community'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'
const ProfileSidebar = ({ profile, loading, communities }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onCreate = e => {
        e.preventDefault()
        navigate('/communities/community-request')
    }
    const { userId } = useParams()

    useEffect(() => {
        dispatch(getMyCommunities(userId))
    }, [dispatch, userId])

    return (
        <>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <>
                    <ProfileAvatar profile={profile}/>
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
                            <CommunitySection key={community._id} community={community} />
                        )
                    }
                    )}
                </>
            )}
        </>
    )

}

export default ProfileSidebar