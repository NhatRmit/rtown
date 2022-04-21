
import './CommunitySection.css'
import { Link } from "react-router-dom";


const CommunitySection = ({ community: communityName, avatar }) => {
    return (
        <div className="community-container">
            <div className='joined-community'>
                <span className='community'>
                    <Link to='/'> <img src="" alt="Community logo" className="community-logo" /></Link>
                </span>
            </div>
        </div>
    )
}

export default CommunitySection