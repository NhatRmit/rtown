import React from "react";
import { useState } from "react";
import "./Admin.css";
import AdminItem from "./AdminItem";
import AdminProfile from "./AdminProfile";
import AdminCommunityRequest from "./AdminCommunityRequest"
import AdminCommunityList from "./AdminCommunityList"
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../actions/item"
import ItemForm from "../Item/ItemForm"
import { adminGetAllCommunityRequest, adminGetAllAccepted } from "../../actions/admin"
import { getPosts } from '../../actions/post'
import AdminPost from "./AdminPost";

const Admin = () => {
  const [toggleState, setToggleState] = useState(1);
  const dispatch = useDispatch();
  const comunities = useSelector(state => state.community.communities)
  const items = useSelector(state => state.item.items)
  const posts = useSelector(state => state.post.posts)

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
                Profile
              </button>
              <button
                className={
                  toggleState === 2 ? "admin-tabs admin-active-tabs" : "tabs"
                }
                onClick={() => {
                  toggleTab(2)
                  dispatch(getPosts())
                }}>
                Post
              </button>
              <button
                className={
                  toggleState === 3
                    ? "admin-tabs admin-active-tabs"
                    : "item-tabs"
                }
                onClick={() => {
                  toggleTab(3)
                  dispatch(getItems())
                }}>
                Item
              </button>
              <button
                className={
                  toggleState === 4
                    ? "admin-tabs admin-active-tabs"
                    : "item-tabs"
                }
                onClick={() => {
                  toggleTab(4)
                  dispatch(adminGetAllCommunityRequest())
                }}>
                Community Request
              </button>
              <button
                className={
                  toggleState === 5
                    ? "admin-tabs admin-active-tabs"
                    : "item-tabs"
                }
                onClick={() => {
                  toggleTab(5)
                  dispatch(adminGetAllAccepted());
                }}>
                Community
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
                <div className='addAdmin-section'>
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Content</th>
                        <th>Image</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                      </tr>
                      {
                        posts.map(post => <AdminPost key={post._id} post={post} />)
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                className={
                  toggleState === 3
                    ? "admin-content  admin-active-content"
                    : "admin-content"
                }>                
                <ItemForm />
                <div className='addAdmin-section'>
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Item</th>
                        <th>Rpoint</th>
                        <th>Image</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                      </tr>
                      {
                        items && items.map(item => <AdminItem key={item._id} item={item} />)
                      }
                    </tbody>

                  </table>
                </div>
              </div>
              <div
                className={
                  toggleState === 4
                    ? "admin-content  admin-active-content"
                    : "admin-content"
                }>
                <div className='addAdmin-section'>
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Community Name</th>
                        <th>Community Description</th>
                        <th>Community Image</th>
                        <th>ACCEPT</th>
                        <th>DELETE</th>
                      </tr>
                      {comunities.map(community =>
                        <AdminCommunityRequest key={community._id} community={community} />
                      )}
                    </tbody>

                  </table>
                </div>
              </div>

              <div
                className={
                  toggleState === 5
                    ? "admin-content  admin-active-content"
                    : "admin-content"
                }>
                <div className='addAdmin-section'>
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Community Name</th>
                        <th>Community Description</th>
                        <th>Community Image</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                      </tr>
                      {comunities.map(community =>
                        <AdminCommunityList key={community._id} community={community} />
                      )}
                    </tbody>
                  </table>
                </div>
              </div >
            </div >
          </div >
        </div >
      </div >
    </>
  );
};

export default Admin;
