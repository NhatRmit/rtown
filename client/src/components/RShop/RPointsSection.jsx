import React from "react";
import "./RPointsSection.css";

const RPointsSection = ({ Rpoint }) => {
  return (
    <>
      <div className='rPoints-section'>
        <p>Current R-Points</p>
        <h2>{Rpoint}</h2>
      </div>
    </>
  );
};

export default RPointsSection;
