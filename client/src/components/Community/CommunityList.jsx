import "./CommunityList.css";
import {Link} from "react-router-dom";
import {BsFillChatDotsFill} from "react-icons/bs";
import {IconContext} from "react-icons/lib";
import logo1 from "../Newsfeed/media/badminton-club-logo.jpg";
import logo2 from "../Newsfeed/media/fintech-club-logo.jpg";
import logo3 from "../Newsfeed/media/mass-media-club-logo.jpg";
import logo4 from "../Newsfeed/media/mobi-logo.jpg";

const CommunityList = () => {
  return (
    <div className='community-list-container'>
      <h1 className='title'>Community</h1>
      <div className='create-community-section'>
        <Link to='/community-request'>
          <span className='create-icon'>
            {/*CHANGE ICON FOR ME*/}
            <IconContext.Provider value={{color: "#C0BFBF", size: "2em"}}>
              <BsFillChatDotsFill />
            </IconContext.Provider>
          </span>
        </Link>
        <Link to='/community-request' className='link'>
          <p>Create community</p>
        </Link>
      </div>
      <div className='joined-community'>
        <span className='community'>
          <Link to='/community'>
            {" "}
            <img src={logo1} alt='Community logo' className='community-logo' />
          </Link>
        </span>
        <span className='community'>
          <Link to='/community'>
            {" "}
            <img src={logo2} alt='Community logo' className='community-logo' />
          </Link>
        </span>
        <span className='community'>
          <Link to='/community'>
            {" "}
            <img src={logo3} alt='Community logo' className='community-logo' />
          </Link>
        </span>
        <span className='community'>
          <Link to='/community'>
            {" "}
            <img src={logo4} alt='Community logo' className='community-logo' />
          </Link>
        </span>
      </div>
    </div>
  );
};

export default CommunityList;
