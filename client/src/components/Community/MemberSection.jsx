import "./MemberList.css";
import { BsFillChatDotsFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";

const MemberSection = ({ community }) => {
  const navigate = useNavigate()
  return (
    <div className='member-container'>
      <h1 className='title'>Members</h1>
      <div className="member-list">
        {community && community.members && community.members.map((member) => (
          <div
            onClick={
              e => {
                e.preventDefault()
                navigate(`/profiles/${member.memberId}`)
              }}
            key={member.memberId} className='member'>
            <span className='user-icon'>
              {/*CHANGE ICON FOR ME*/}
              <IconContext.Provider value={{ color: "#676767", size: "1em" }}>
                <BsFillChatDotsFill />
              </IconContext.Provider>
            </span>
            <div className='link'>
              <p>{member.memberName}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MemberSection;
