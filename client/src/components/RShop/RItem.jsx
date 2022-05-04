import React from "react";
import "./RItemsSection.css";
import RedeemButton from "../Buttons/RedeemButton";
import itemPic from "../Newsfeed/media/item.png";

const RItem = ({ item, myItem, isMyItem }) => {
  return (
    <>
      {
        isMyItem ?
          <div className='rItem'>
            <img src={itemPic} alt='Item' className='item-pic' />
            <p className='item-name'>{myItem && myItem.itemName}</p>
            {/* <p className='rpoints'>{myItem && myItem.Rpoint} Rpoints</p> */}
          </div> :
          <div className='rItem'>
            <img src={itemPic} alt='Item' className='item-pic' />
            <p className='item-name'>{item && item.name}</p>
            <p className='rpoints'>{item && item.Rpoint} Rpoints</p>
            <RedeemButton item={item} />
          </div>
      }
    </>
  );
};

export default RItem;
