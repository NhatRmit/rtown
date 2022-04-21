// import React from 'react'
// import { Link } from 'react-router-dom'

// const CommunityItem = ({ community }) => {
//     console.log(community.communityId.communityName)
//     return (
//         <div>
//             <p>123</p>
//             <p>123</p>
//             <p>123</p>
//             <p></p>
//             <Link to={`/community/${community.communityId._id}`}>
//                 <img className="round-img" src={community.communityId.avatar} alt="commAvatar" />
//             </Link>
//             <h4>{community.communityId.communityName}</h4>
//         </div>
//     )
// }

// export default CommunityItem

import './CommunityItem.css'
import { Link } from "react-router-dom";



const CommunityItem = ({ community }) => {

    return (
        <div className="community-item-container">
            <div className='community-item-joined-community'>
                <span className='community-item-community' key={community.communityId._id}>
                    {/* <Link to='/'> <img src={require('./media/' + community.img + '.jpg')} alt="Community logo" className={community.title} /></Link> */}
                    <Link to='/' className={community.title}>{community.communityId.communityName}</Link>
                </span>
            </div>
        </div>
    )
}

export default CommunityItem