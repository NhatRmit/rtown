import "./AboutCommunity.css";
import { Link, useNavigate } from "react-router-dom";
import CreateEvent from "./CreateEventButton"
import LeaveCommunity from "./LeaveButton"
import EditCommunity from "./EditButton"
import JoinCommunity from "./JoinButton"
import { useDispatch, useSelector } from "react-redux";
import { getCommunityById, joinCommunity, leaveCommunity } from '../../actions/community'
import { useEffect, useState } from "react";
import { loadUser } from "../../actions/auth";


const AboutCommunity = ({ community_id, community }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onEdit = e => {
    e.preventDefault()
    navigate(`/communities/edit/${community_id}`)
  }

  const onLeave = e => {
    e.preventDefault()
    dispatch(leaveCommunity(community_id, navigate))
  }

  const onJoin = e => {
    e.preventDefault()
    dispatch(joinCommunity(community_id, navigate))
  }

  const onCreateEvent = e => {
    e.preventDefault()
    navigate(`/communities/event-request`)
  }

  useEffect(() => {
    dispatch(loadUser())
    dispatch(getCommunityById(community_id))
  }, [dispatch, community_id])

  const user = useSelector(state => state.auth)
  // const community = useSelector(state => state.community.community)

  return (
    <div className='about-container'>
      <h1 className='title'>{community && community.communityName}</h1>
      <p className='description'>
        {community && community.description}
      </p>
      <div className="buttons">
        <div onClick={onCreateEvent}><CreateEvent /></div>
        <div onClick={onEdit}><EditCommunity /></div>
        {
          community && community.members && community.members.length === 0 ?
            <div onClick={onJoin}><JoinCommunity /></div> :
            community && community.members && community.members.map(member =>
              member.memberId === user._id ?
                <div onClick={onLeave}><LeaveCommunity /></div> :
                <div onClick={onJoin}><JoinCommunity /></div>
            )
        }
      </div>
    </div>
  );
};

export default AboutCommunity;