import "./CommunitySection.css";
import { useNavigate, useMatch } from "react-router-dom";

const CommunitySection = ({ community }) => {
  const navigate = useNavigate()
  const newsfeed = useMatch('/newsfeed')

  const onClick = e => {
    e.preventDefault()
    newsfeed ? navigate(`/communities/${community._id}`) : navigate(`/communities/${community.communityId._id}`)
  }
  return (
    newsfeed ?
      <div className='community-list-container' >
        <div className='joined-community' >
          <span onClick={onClick} className='community'>
            <img src={community && community.avatar} alt='Community logo' className='community-logo' />
          </span>
        </div>
      </div>
      :
      <div className="community-item-container">
        <div onClick={onClick} className='community-item-joined-community'>
          <span className='community-item-community'>
            {" "}
            <img src={community.communityId && community.communityId.avatar} alt='Community logo' className='community-logo' />
          </span>
        </div>
      </div>
  );
};

export default CommunitySection;
