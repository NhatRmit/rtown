import "./MemberList.css";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { kickMember } from '../../actions/community'

const MemberSection = ({ community, member }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onKick = e => {
    e.preventDefault()
    dispatch(kickMember(community._id, member.memberId))
  }


  return (
    <>
      <span onClick={onKick}>
        <IconContext.Provider value={{ color: "#676767", size: "1em" }}>
          <AiFillCloseCircle />
        </IconContext.Provider>
      </span>
      <div
        onClick={
          e => {
            e.preventDefault()
            navigate(`/profiles/${member.memberId}`)
          }}
         className='member'>
        <span className='user-icon'>
          <IconContext.Provider value={{ color: "#676767", size: "1em" }}>
            <BsFillChatDotsFill />
          </IconContext.Provider>
        </span>
        <div className='link'>
          <p>{member.memberName}</p>
        </div>

      </div>
    </>
  );
};

export default MemberSection;
