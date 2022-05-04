import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./RItemsSection.css";
import RItem from "./RItem";
import RedeemButton from "../Buttons/RedeemButton";
import RedeemedButton from "../Buttons/RedeemedButton";
import { getMyPosts } from "../../actions/post";

const RItemsSection = ({ items, myItems }) => {
  const dispatch = useDispatch()
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const onMyPosts = e => {
    e.preventDefault()
    toggleTab(1)
    dispatch(getMyPosts())
  }

  return (
    <>
      <div className='rItems-section'>
        <div className='rshop-wrapper'>
          <div className='tabs-container'>
            <div className='bloc-tabs'>
              <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={onMyPosts}>
                My Posts
              </button>
              <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}>
                My Items
              </button>
            </div>

            <div className='content-tabs'>
              <div
                className={
                  toggleState === 1 ? "content  active-content" : "content"
                }>
                {
                  items && items.map(item =>
                    <div className='displayedItems'>
                      <RItem item={item} isMyItem={false}/>
                      <RedeemButton item={item}/>
                    </div>
                  )
                }
              </div>

              <div
                className={
                  toggleState === 2 ? "content  active-content" : "content"
                }>
                {
                  myItems && myItems.map(myItem =>
                    <div className='displayedItems'>
                      <RItem myItem={myItem} isMyItem={true}/>
                      <RedeemedButton />
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RItemsSection;