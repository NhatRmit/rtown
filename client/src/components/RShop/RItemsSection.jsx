import React from "react";
import {useState} from "react";
import "./RItemsSection.css";
import RItem from "./RItem";
import RedeemButton from "../Buttons/RedeemButton";
import RedeemedButton from "../Buttons/RedeemedButton";

const RItemsSection = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <div className='rItems-section'>
       
        <div className='rshop-wrapper'>
          <div className='tabs-container'>
            <div className='bloc-tabs'>
              <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}>
                R-Items
              </button>
              <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}>
                Redeemed Items
              </button>
            </div>

            <div className='content-tabs'>
              <div
                className={
                  toggleState === 1 ? "content  active-content" : "content"
                }>
                <div className='displayedItems'>
                  <RItem />
                  <RedeemButton />
                </div>
                <div className='displayedItems'>
                  <RItem />
                  <RedeemButton />
                </div>
              </div>

              <div
                className={
                  toggleState === 2 ? "content  active-content" : "content"
                }>
                <div className='displayedItems'>
                  <RItem />
                  <RedeemedButton />
                </div>
                <div className='displayedItems'>
                  <RItem />
                  <RedeemedButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RItemsSection;
