import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCommunityById } from '../../actions/community'

const CommunityItem = ({ community }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCommunityById(community.communityId))
    }, [dispatch, community.communityId])

    const comm = useSelector(state => state.community.community)
    console.log(comm.communityName)
    return (
        <div>
            <Link to={`/community/${comm._id}`}>
                <img className="round-img" src={comm.avatar} alt="commAvatar" />
            </Link>
            <p>{comm.communityName}</p>
        </div>
    )
}

export default CommunityItem