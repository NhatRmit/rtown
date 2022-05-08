import React from "react";
import {useState} from "react";
import "./Admin.css";
import AddAdmin from "./AddAdmin";
import AdminProfile from "./AdminProfile";
import PostsSection from "../Post/PostsSection";
const Admin = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <div className='admin-section'>
        <div className='admin-wrapper'>
          <div className='admin-tabs-container'>
            <div className='admin-bloc-tabs'>
              <button
                className={
                  toggleState === 1 ? "admin-tabs admin-active-tabs" : "tabs"
                }
                onClick={() => toggleTab(1)}>
                Admin Profile
              </button>
              <button
                className={
                  toggleState === 2
                    ? "admin-tabs admin-active-tabs"
                    : "newsfeed-tabs"
                }
                onClick={() => toggleTab(2)}>
                Add Admin Profile
              </button>
              <button
                className={
                  toggleState === 3
                    ? "admin-tabs admin-active-tabs"
                    : "newsfeed-tabs"
                }
                onClick={() => toggleTab(3)}>
                Posts
              </button>
            </div>

            <div className='admin-content-tabs'>
              <div
                className={
                  toggleState === 1
                    ? "admin-content  admin-active-content"
                    : "admin-content"
                }>
                <AdminProfile />
              </div>

              <div
                className={
                  toggleState === 2
                    ? "admin-content  admin-active-content"
                    : "admin-content"
                }>
                <AddAdmin />
              </div>
              <div
                className={
                  toggleState === 3
                    ? "admin-content  admin-active-content"
                    : "admin-content"
                }>
                <PostsSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
