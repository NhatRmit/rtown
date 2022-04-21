import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../actions/profile'
import Layout from '../Layout'
import ProfileMain from './ProfileMain'
import ProfileSidebar from './ProfileSidebar'
import './Profile.css'
import { getMyCommunities } from '../../actions/community'

const Profile = () => {
    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile.profile)
    const loading = useSelector(state => state.profile.loading)
    const communities = useSelector(state => state.community.communities)

    useEffect(() => {
        dispatch(getProfile())
        dispatch(getMyCommunities())
    }, [dispatch])

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
                    <ProfileMain loading={loading} profile={profile} communities={communities}/>
                </div>
                <div className='profile-right-container'>
                    <ProfileSidebar loading={loading} profile={profile} communities={communities}/>
                </div>
            </div>
        </Layout>
    )
}

export default Profile