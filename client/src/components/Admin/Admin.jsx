import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Admin.css";
import AddAdmin from "./AddAdmin";
import AdminProfile from "./AdminProfile";
import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";

import EditPost from '../Post/EditPost'
import { clearPost, getPosts, deletePost } from '../../actions/post'
import { IconContext } from 'react-icons/lib'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
const Admin = () => {
  const [toggleState, setToggleState] = useState(1);
  const dispatch = useDispatch()
  const posts = useSelector(state => state.post.posts)

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  const toggleTab = (index) => {
    setToggleState(index);
  };


  const [edit, setEdit] = useState(false)
  const pullData = (data) => {
    setEdit(data)
  }
  const onEdit = e => {
    e.preventDefault()
    setEdit(true)
    dispatch(clearPost())
  }

  const onDelete = (e) => {
    e.preventDefault()
    dispatch(deletePost(posts._id))
  }






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
                <div className='addAdmin-section'>
                  <table className="table">
                    <tr>
                      <th>Text Content</th>
                      <th>Images</th>

                      <th>EDIT</th>
                      <th>DELETE</th>
                    </tr>

                    {
                      posts.map(post =>
                        <tr key={post._id}>
                          <td>
                            {
                              !edit ? post.text :
                                <EditPost singlePost={post} pullData={pullData} />
                            }
                          </td>
                          <td><img src={post.image} alt="" /></td>

                          <td>
                            <span className='icon' onClick={onEdit}>
                              <label htmlFor='edit-post'>
                                <IconContext.Provider value={{ color: "#676767", size: "1.5em" }}>
                                  <AiFillEdit />
                                </IconContext.Provider>
                              </label>
                              <p id='edit-post' className='icon-label'>
                                Edit
                              </p>
                            </span>
                          </td>
                          <td>
                            <span className='icon' onClick={onDelete}>
                              <label htmlFor='delete-post'>
                                <IconContext.Provider value={{ color: "#676767", size: "1.5em" }}>
                                  <AiFillDelete />
                                </IconContext.Provider>
                              </label>
                              <p id='delete-post' className='icon-label'>
                                Delete
                              </p>
                            </span></td>
                        </tr>
                      )
                    }
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
