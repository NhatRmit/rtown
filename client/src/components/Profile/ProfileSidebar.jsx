import React from 'react'
import Spinner from '../Layout/Spinner'
import { useSelector } from 'react-redux'
import CommunityItem from '../Communities/CommunityItem'

const ProfileSidebar = ({ profile, loading }) => {
    const communities = useSelector(state => state.community.communities)
    return (
        <div>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <div>
                    {communities.map(
                        community => community.members.map(
                            member => member.memberId === profile._id.toString() ? (
                                <CommunityItem key={community._id} community={community}/>
                            ) : (
                                <h4>You have not posted anything yet</h4>
                            )
                        )
                    )}
                </div>
            )
            }
        </div>)
}

export default ProfileSidebar