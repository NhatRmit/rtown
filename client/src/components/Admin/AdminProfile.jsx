import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../actions/profile";
import "./Admin.css";

const AdminProfile = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const profile = useSelector(state => state.profile.profile)

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  return (
    <div className='adminProfile-section'>
      <img src={profile && profile.avatar} alt="" className="admin-pic" />
      <div className='admin-profile'>
        <p className='adminInfo-label'>Full Name</p>
        <p className="adminInfo">{auth.usernameOrEmail}</p>

        <p className='adminInfo-label'>Email</p>
        <p className="adminInfo">{auth.email}</p>
      </div>
    </div>
  );
};

export default AdminProfile;
