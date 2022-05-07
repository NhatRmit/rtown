import React from "react";
import "./Admin.css";

const AdminProfile = () => {
  return (
    <>
      <div className='adminProfile-section'>
        <div className='admin-pic'></div>
        <div class='admin-profile'>
          <p className='adminInfo-label'>Full Name</p>
          <p className="adminInfo">ABC</p>

          <p className='adminInfo-label'>Email</p>
          <p className="adminInfo">ABC123@gmail.com</p>

          <p className='adminInfo-label'>Phone Number</p>
          <p className="adminInfo">09090909090</p>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
