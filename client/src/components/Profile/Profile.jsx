import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearProfile, getProfile, getProfileById } from '../../actions/profile'
import Layout from '../Layout'
import ProfileMain from './ProfileMain'
import ProfileSidebar from './ProfileSidebar'
import './Profile.css'
import { getMyCommunities } from '../../actions/community'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile.profile)
    const loading = useSelector(state => state.profile.loading)
    const communities = useSelector(state => state.community.communities)
    const { userId } = useParams()
        useEffect(() => {
            dispatch(getProfileById(userId))
            dispatch(getMyCommunities())
        }, [dispatch, userId])

    return (
        <Layout header footer>
            <div className='profile-container'>
                <div className='profile-left-container'>
                    <ProfileMain loading={loading} profile={profile} communities={communities} />
                </div>
                <div className='profile-right-container'>
                    <ProfileSidebar loading={loading} profile={profile} communities={communities}/>
                </div>
            </div>
        </Layout>
    )
}

export default Profile