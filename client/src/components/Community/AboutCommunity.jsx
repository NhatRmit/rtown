import "./AboutCommunity.css";
import { Link, useNavigate } from "react-router-dom";
import CreateEvent from "../Buttons/CreateEventButton"
import LeaveCommunity from "../Buttons/LeaveButton"
import EditCommunity from "../Buttons/EditButton"
import JoinCommunity from "../Buttons/JoinButton"
import { useDispatch, useSelector } from "react-redux";
import { getCommunityById, joinCommunity, leaveCommunity } from '../../actions/community'
import { useEffect, useState } from "react";
import { loadUser } from "../../actions/auth";
import { getProfileById } from "../../actions/profile";

const AboutCommunity = ({ community_id, community }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const [isJoined, setIsJoined] = useState('false')

  const auth = useSelector(state => state.auth._id)
  
  const onEdit = e => {
    e.preventDefault()
    navigate(`/communities/edit/${community_id}`)
  }

  const onLeave = e => {
    e.preventDefault()
    // setIsJoined(localStorage.setItem('isJoined', false))
    dispatch(leaveCommunity(community_id, navigate))
  }

  const onJoin = e => {
    e.preventDefault()
    // setIsJoined(localStorage.setItem('isJoined', true))
    dispatch(joinCommunity(community_id, auth, navigate))
  }

  const onCreateEvent = e => {
    e.preventDefault()
    navigate(`/communities/event-request`)
  }


  useEffect(() => {
    // setIsJoined(localStorage.getItem('isJoined'))
    dispatch(loadUser())
    dispatch(getCommunityById(community_id))

  }, [dispatch, community_id])

  const user = useSelector(state => state.auth)
  const memberIndex = community && community.members
    .map(item => item.memberId)
    .indexOf(user._id)

  console.log(memberIndex)

  // const community = useSelector(state => state.community.community)
  return (
    <div className='about-container'>
      <h1 className='title'>{community && community.communityName}</h1>
      <p className='description'>
        {community && community.description}
      </p>
      <div className="buttons">
        {
          community &&
          community.members.map(
            member => member.memberId === auth ?
              <div onClick={onCreateEvent}><CreateEvent /></div> :
              <></>
          )
        }
        {
          community && community.user === auth ? <div onClick={onEdit}><EditCommunity /></div> : <></>
        }
        {
          community && community.members && community.members.length === 0 ?
            <div onClick={onJoin}><JoinCommunity /></div> :
            memberIndex !== -1 ?
              <div onClick={onLeave}><LeaveCommunity /></div> :
              <div onClick={onJoin}><JoinCommunity /></div>
        }

      </div>
    </div >
  );
};

export default AboutCommunity;