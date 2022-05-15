import React from "react";
import "./RItemsSection.css";
import RedeemButton from "../Buttons/RedeemButton";

const RItem = ({ item, myItem, isMyItem }) => {
  return (
    <>
      {
        isMyItem ?
          <div className='rItem'>
            <p className='item-name'>{myItem && myItem.itemName}</p>
            <img src={myItem.item.image} alt="" className="item-pic"/>
          </div> :
          <div className='rItem'>
            <img src={item.image} alt="" className="item-pic"/>
            <p className='item-name'>{item && item.name}</p>
            <p className='rpoints'>{item && item.Rpoint} Rpoints</p>
            <RedeemButton item={item} />
          </div>
      }
    </>
  );
};

export default RItem;
