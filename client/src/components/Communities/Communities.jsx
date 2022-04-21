import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Layout/Spinner'
import { getAllCommunities } from '../../actions/community'
import CommunitySection from '../Newsfeed/CommunitySection'

const Communities = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.community.loading)
  const communities = useSelector(state => state.community.communities)

  useEffect(() => {
    dispatch(getAllCommunities())
  }, [dispatch])

  return (
    loading ? (
      <Spinner />
    ) : (
      <div>
        <h4>List of Communities</h4>
        <div>
          {communities.map(community => (
            <CommunitySection key={community._id} community={community}/>
          )) }
        </div>
      </div>

    )

  )
}

export default Communities