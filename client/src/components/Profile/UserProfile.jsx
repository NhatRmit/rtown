// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { loadUser } from '../../actions/auth'
// import { getProfileById } from '../../actions/profile'
// import Sp

// const UserProfile = () => {
//   const dispatch = useDispatch()
//   const auth = useSelector(state => state.auth)
//   const profile = useSelector(state => state.profile.profile)

//   useEffect(() => {
//     dispatch(loadUser())
//     dispatch(getProfileById(auth._id))
//   }, [dispatch, auth._id])

//   return (
//     <div>{}</div>
//   )
// }

// export default UserProfile

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, getProfileById } from '../../actions/profile'
import Layout from '../Layout'
import ProfileMain from './ProfileMain'
import ProfileSidebar from './ProfileSidebar'
import './Profile.css'
import { getMyCommunities } from '../../actions/community'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const profile = useSelector(state => state.profile.profile)
  const loading = useSelector(state => state.profile.loading)
  const communities = useSelector(state => state.community.communities)
  useEffect(() => {
    dispatch(getProfileById(userId))
  }, [dispatch, userId])

  return (
    <Layout header footer>
      {/* <section>
                <div className='blank-profile'></div>

                <div className='main-container-profile'>
                    <ProfileMain loading={loading} profile={profile} />
                </div>

                <div className='side-container-profile'>
                    <ProfileSidebar loading={loading} profile={profile} />
                </div>

                <div className='blank-profile'></div>
            </section> */}
      <div className='profile-container'>
        <div className='profile-left-container'>
          <ProfileMain loading={loading} profile={profile} communities={communities} />
        </div>
        <div className='profile-right-container'>
          <ProfileSidebar loading={loading} profile={profile} communities={communities} />
        </div>
      </div>
    </Layout>
  )
}

export default UserProfile