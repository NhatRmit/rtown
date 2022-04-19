import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCommunityById } from '../../actions/community'
import { getProfile } from '../../actions/profile'

const CommunityItem = ({ community }) => {
    console.log(community.communityId.communityName)
    return (
        <div>
            <p>123</p>
            <p>123</p>
            <p>123</p>
            <p></p>
            <Link to={`/community/${community.communityId._id}`}>
                <img className="round-img" src={community.communityId.avatar} alt="commAvatar" />
            </Link>
            <h4>{community.communityId.communityName}</h4>
        </div>
    )
}

export default CommunityItem