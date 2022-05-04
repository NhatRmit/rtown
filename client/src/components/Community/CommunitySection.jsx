import "./CommunitySection.css";
import { Link, useNavigate } from "react-router-dom";
import { GrAddCircle } from "react-icons/gr";
import { IconContext } from "react-icons/lib";
import logo1 from "../Newsfeed/media/badminton-club-logo.jpg";
import logo2 from "../Newsfeed/media/fintech-club-logo.jpg";
import logo3 from "../Newsfeed/media/mass-media-club-logo.jpg";
import logo4 from "../Newsfeed/media/mobi-logo.jpg";

const CommunitySection = ({ community }) => {
  const navigate = useNavigate()
  const onClick = e => {
    e.preventDefault()
    navigate(`/communities/${community._id}`)
  }
  return (
    <div className='community-list-container'>

      <div className='joined-community'>
        <span onClick={onClick} className='community'>
          <Link to='/community'>
            {" "}
            <img src={community && community.avatar} alt='Community logo' className='community-logo' />
          </Link>
        </span>
      </div>
    </div>
  );
};

export default CommunitySection;
