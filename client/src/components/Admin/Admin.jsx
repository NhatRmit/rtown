import React from "react";
import "./Admin.css";
import AddAdmin from "./AddAdmin";
import AdminItem from "./AdminItem";
import AdminProfile from "./AdminProfile";
import AdminCommunityRequest from "./AdminCommunityRequest"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllCommunityRequest } from "../../actions/admin"
import { getItems } from "../../actions/item"
import ItemForm from "../Item/ItemForm"
const Admin = () => {
  const [toggleState, setToggleState] = useState(1);
  const dispatch = useDispatch();
  const comunities = useSelector(state => state.community.communities)
  const items = useSelector(state => state.item.items)


  useEffect(() => {
    dispatch(getItems());
    dispatch(adminGetAllCommunityRequest());
  }, [dispatch])

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
                    : "item-tabs"
                }
                onClick={() => toggleTab(3)}>
                Item Dashboard
              </button>
              <button
                className={
                  toggleState === 4
                    ? "admin-tabs admin-active-tabs"
                    : "item-tabs"
                }
                onClick={() => toggleTab(4)}>
                Community Request List
              </button>
              <button
                className={
                  toggleState === 5
                    ? "admin-tabs admin-active-tabs"
                    : "item-tabs"
                }
                onClick={() => toggleTab(3)}>
                Community List
              </button>
              <button
                className={
                  toggleState === 6
                    ? "admin-tabs admin-active-tabs"
                    : "item-tabs"
                }
                onClick={() => toggleTab(3)}>
                Edit User Profile
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
                  <ItemForm />
                  <table className="table">
                    <tr>
                      <th>Item</th>
                      <th>Rpoint</th>
                      <th>Image</th>
                      <th>EDIT</th>
                      <th>DELETE</th>
                    </tr>
                    {
                      items.map(item => <AdminItem item={item} />)
                    }
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
                    <tr>
                      <th>Community Name</th>
                      <th>Community Description</th>
                      <th>ACCEPT</th>
                      <th>DELETE</th>
                    </tr>

                    {comunities.map(community =>

                      <AdminCommunityRequest community={community} />

                    )}
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
