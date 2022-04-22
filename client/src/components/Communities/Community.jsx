import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCommunityById } from '../../actions/community'

const Community = () => {
  const dispatch = useDispatch()
  const { community_id } = useParams()

  useEffect(() => {
    dispatch(getCommunityById(community_id))
  }, [dispatch, community_id])

  const community = useSelector(state => state.community.community)

  return (
    <div>{community && community.communityName}</div>
  )
}

export default Community