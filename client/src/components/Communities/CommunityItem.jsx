import './CommunityItem.css'
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommunityById } from '../../actions/community';


const CommunityItem = ({ community }) => {
    return (
        <div className="community-item-container">
            <div className='community-item-joined-community'>
                <span className='community-item-community'>
                    {/* <Link to='/'> <img src={require('./media/' + community.img + '.jpg')} alt="Community logo" className={community.title} /></Link> */}
                    <Link to='/'>{community.communityName}</Link>
                </span>
            </div>
        </div>
    )
}

export default CommunityItem