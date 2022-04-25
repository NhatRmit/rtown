import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getCommunityById } from '../../actions/community'
import EditCommunity from '../Form/EditCommunity'

const Community = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { community_id } = useParams()

  useEffect(() => {
    dispatch(getCommunityById(community_id))
  }, [dispatch, community_id])

  const community = useSelector(state => state.community.community)

  const onEdit = e => {
    e.preventDefault()
    navigate(`/communities/edit/${community_id}`)
  }

  return (
    <div>
      {community && community.communityName}
      <button type='submit' onClick={onEdit}>
        Edit Community
      </button>  
    </div>
  )
}

export default Community