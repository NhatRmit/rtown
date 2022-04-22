
import './CommunitySection.css'
import { Link, useNavigate } from "react-router-dom";


const CommunitySection = ({ community }) => {
    const navigate = useNavigate()
    const onClick = e => {
        e.preventDefault()
        navigate(`/communities/${community._id}`)
    }
    return (
        <div className="community-container">
            <div onClick={onClick} className='joined-community'>
                <span className='community'>
                    
                </span>
            </div>
        </div>
    )
}

export default CommunitySection