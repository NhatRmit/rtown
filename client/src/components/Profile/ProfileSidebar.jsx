import React, { useEffect } from 'react'
import Spinner from '../Layout/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import CommunityItem from '../Communities/CommunityItem'
import { getMyCommunities } from '../../actions/community'

const ProfileSidebar = ({ profile, loading }) => {
    const dispatch = useDispatch()
    const communities = useSelector(state => state.community.communities)

    useEffect(() => {
        dispatch(getMyCommunities())
    }, [dispatch])
    console.log(communities)

    return (
        <div>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <div>
                    {/* {communities.map(
                        community => community.members.map(
                            member => member.memberId === profile._id.toString() ? (
                                <CommunityItem key={community._id} community={community}/>
                            ) : (
                                <h4>You have not posted anything yet</h4>
                            )
                        )
                    )} */}
                    {profile === null || loading ? (
                        <Spinner />
                    ) : (
                        <div>
                            {communities.map(community =>
                                <CommunityItem community={community} />
                            )}
                        </div>
                    )}
                </div>
            )
            }
        </div>)
}

export default ProfileSidebar