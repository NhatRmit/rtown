import "./AboutCommunity.css";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import CreateEvent from "../Buttons/CreateEventButton"
import LeaveCommunity from "../Buttons/LeaveButton"
import JoinCommunity from "../Buttons/JoinButton"
import { useDispatch, useSelector } from "react-redux";
import { getCommunityById, joinCommunity, leaveCommunity, clearCommunityData, deleteCommunity } from '../../actions/community'
import { deletePost } from "../../actions/post"
import { useEffect } from "react";
import { loadUser } from "../../actions/auth";
import EditCommunity from "../Buttons/EditCommunityButton"
import { AiFillSetting } from "react-icons/ai"
import { IconContext } from 'react-icons/lib'



const AboutCommunity = ({ community_id, community }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth._id)
  const posts = useSelector(state => state.post.posts)

  const [expand, setExpand] = useState(false)

  const onTrigger = e => {
    setExpand(!expand)
  }

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
    dispatch(joinCommunity(community_id, auth, navigate))
  }

  const onCreateEvent = e => {
    e.preventDefault()
    navigate(`/communities/event-request/${community_id}`)
  }

  const onDelete = e => {
    e.preventDefault()
    posts.forEach(
      post => dispatch(deletePost(post._id, false))
    )
    community.members.forEach(
      member => dispatch(clearCommunityData(community._id, member.memberId))
    )
    dispatch(deleteCommunity(community._id, navigate))
  }

  useEffect(() => {
    dispatch(loadUser())
    dispatch(getCommunityById(community_id))

  }, [dispatch, community_id])

  const user = useSelector(state => state.auth)
  const memberIndex = community && community.members
    .map(item => item.memberId)
    .indexOf(user._id)

  return (
    <div className='about-container'>

      <h1 className='title'>
        {community && community.communityName}
        <span onClick={onTrigger}>
          <label>
            <IconContext.Provider value={{ color: '#676767', size: '1.2em' }}>
              <AiFillSetting style={{ cursor: "pointer" }} />
            </IconContext.Provider>
          </label>
        </span>
      </h1>

      <img src={community && community.avatar} alt="" style={{ width: "auto" }} />
      <br />
      <div className="buttons">
        {expand && <>
          {
            community && community.user._id === auth &&
            <div onClick={onCreateEvent}>
              <CreateEvent />
            </div>
          }
          {
            community && community.user._id === auth && <div onClick={onEdit}><EditCommunity /></div>
          }
          {
              memberIndex !== -1 ?
                <div onClick={onLeave}><LeaveCommunity /></div> :
                <></>
          }
          {
            community && community.user._id === auth && <div onClick={onDelete}>
              <button className="createEvent-btn">
                DELETE
              </button></div>
          }
        </>}
        {
          community && community.members.length === 0 ?
            <div onClick={onJoin}><JoinCommunity /></div> :
            memberIndex !== -1 ?
              <></> :
              <div onClick={onJoin}><JoinCommunity /></div>
        }

      </div>
    </div >
  );
};

export default AboutCommunity;