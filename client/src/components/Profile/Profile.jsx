import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../actions/profile'
import { Link, useParams } from 'react-router-dom'
import Layout from '../Layout'
import ProfileMain from './ProfileMain'
import ProfileSidebar from './ProfileSidebar'
import './Profile.css'

const Profile = () => {
    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile.profile)
    const loading = useSelector(state => state.profile.loading)

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])

    return (
        <Layout header footer>
            <section>
                <div className='blank-profile'></div>

                <div className='main-container-profile'>
                    <ProfileMain loading={loading} profile={profile}/>
                </div>

                <div className='side-container-profile'>
                    <ProfileSidebar loading={loading} profile={profile}/>
                </div>

                <div className='blank-profile'></div>
            </section>
        </Layout>
    )
}

export default Profile