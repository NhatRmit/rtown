import React from "react";
import { useState } from "react";
import "./Admin.css";
import AddAdmin from "./AddAdmin";
import AdminItem from "./AdminItem";
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
                    : "item-tabs"
                }
                onClick={() => toggleTab(3)}>
                Item Dashboard
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
                <AdminItem />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
