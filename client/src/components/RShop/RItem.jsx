import React from "react";
import "./RItemsSection.css";

import itemPic from "../Newsfeed/media/item.png";

const RItem = () => {
  return (
    <>
      <div className='rItem'>
        <img src={itemPic} alt='Item' className='item-pic' />
        <p className='item-name'>Item 1</p>
        <p className='rpoints'>500 R-Points</p>
      </div>
    </>
  );
};

export default RItem;
