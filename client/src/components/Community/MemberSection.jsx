import "./MemberList.css";
import { Link } from "react-router-dom";
import { BsFillChatDotsFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";

const MemberSection = ({ community }) => {

  return (
    <div className='member-container'>
      <h1 className='title'>Members</h1>
      {/*I WILL USE MAP LATER*/}
      <div className="member-list">
        <div className='member'>
          <Link to='/profile'>
            <span className='user-icon'>
              {/*CHANGE ICON FOR ME*/}
              <IconContext.Provider value={{ color: "#676767", size: "1em" }}>
                <BsFillChatDotsFill />
              </IconContext.Provider>
            </span>
          </Link>
          <Link to='/profile' className='link'>
            <p>{(community && community.name) || 'Admin'}</p>
          </Link>
        </div>
      </div>
      <div className="member-list">
        {community && community.members && community.members.map((member) => (
          <div key={member.memberId} className='member'>
            <Link to='/profile'>
              <span className='user-icon'>
                {/*CHANGE ICON FOR ME*/}
                <IconContext.Provider value={{ color: "#676767", size: "1em" }}>
                  <BsFillChatDotsFill />
                </IconContext.Provider>
              </span>
            </Link>
            <Link to='/profile' className='link'>
              <p>{member.memberName}</p>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MemberSection;
