import React, { useEffect } from 'react'
import Spinner from '../Layout/Spinner'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import CommunitySection from '../Community/CommunitySection'
import ProfileAvatar from './ProfileAvatar'
import { getMyCommunities } from '../../actions/community'

const ProfileSidebar = ({ profile, loading, communities }) => {
    const dispatch = useDispatch()
    const { userId } = useParams()

    useEffect(() => {
        dispatch(getMyCommunities(userId))
    }, [dispatch, userId])

    return (
        profile === null || loading ?
            <Spinner />
            :
            <>
                <ProfileAvatar profile={profile} />
                {communities.map(community => {
                    return <CommunitySection key={community._id} community={community} />
                }
                )}
            </>
    )

}

export default ProfileSidebar