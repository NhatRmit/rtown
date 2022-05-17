import React from 'react'
import './Profile.css'

const ProfileAvatar = ({ profile }) => {
  return (
    <div className='profile-avatar-container'>
      <img src={profile && profile.avatar} alt="profileavatar" style={{width: "8rem"}}/>
    </div>
  )
}

export default ProfileAvatar