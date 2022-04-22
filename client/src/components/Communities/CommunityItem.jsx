import './CommunityItem.css'
import { Link, useNavigate } from "react-router-dom";

const CommunityItem = ({ community }) => {
    const navigate = useNavigate()
    const onClick = e => {
        e.preventDefault()
        navigate(`/communities/${community.communityId}`)
    }
    return (
        <div className="community-item-container">
            <div onClick={onClick}className='community-item-joined-community'>
                <span className='community-item-community'>
                    {/* <Link to='/'> <img src={require('./media/' + community.img + '.jpg')} alt="Community logo" className={community.title} /></Link> */}
                    {/* <Link to='/'>{community.communityName}</Link> */}
                </span>
            </div>
        </div>
    )
}

export default CommunityItem