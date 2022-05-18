import "./MemberList.css";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { kickMember } from '../../actions/community'


const MemberSection = ({ community, member, isLeader }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth._id)
  const onKick = e => {
    e.preventDefault()
    dispatch(kickMember(community._id, member.memberId))
  }
  const onProfile = e => {
    e.preventDefault()
    navigate(`/profiles/${member.memberId}`)
  }
  return (
    <>
      {!isLeader ?
        <>
          {
            community.user._id === auth ?
              <span onClick={onKick}>
                <IconContext.Provider value={{ color: "#676767", size: "1em" }}>
                  <AiFillCloseCircle />
                </IconContext.Provider>
              </span> : <></>
          }
          < div onClick={onProfile} className='member'>
            <span className='user-icon'>
              <img src={member.avatar} style={{ width: "1.5rem", height: "1.5rem", borderRadius: "50%" }} alt="" />
            </span>
            <div className='link'>
              <p>{member.memberName}</p>
            </div>
          </div>
        </> :
        <div onClick={onProfile} className='member'>
          <span className='user-icon'>
            <img src={member.avatar} style={{ width: "1.5rem", height: "1.5rem", borderRadius: "50%" }} alt="" />
          </span>
          <div className='link'>
            <p>{member.memberName}</p>
          </div>
        </div>
      }
    </>
  );
};

export default MemberSection;
