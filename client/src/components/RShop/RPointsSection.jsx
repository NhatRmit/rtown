import React from "react";
import "./RPointsSection.css";

const RPointsSection = ({ Rpoint }) => {
  return (
    <>
      <div className='rPoints-section'>
        <p>RPoints</p>
        <h2>{Rpoint}</h2>
      </div>
    </>
  );
};

export default RPointsSection;
