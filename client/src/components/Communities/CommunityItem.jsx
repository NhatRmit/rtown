import React from 'react'
import { Link } from 'react-router-dom'

const CommunityItem = ({ community:
    avatar,
    community_id,
    communityName,
}) => {
    return (
        <div>
            <Link to={`/community/${community_id}`}>
                <img className="round-img" src={avatar} alt="commAvatar" />
                <span>{communityName}</span>
            </Link>
        </div>
    )
}

export default CommunityItem