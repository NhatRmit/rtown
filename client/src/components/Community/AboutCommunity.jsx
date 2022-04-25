import "./AboutCommunity.css";
import {Link} from "react-router-dom";
import CreateEvent from "./CreateEventButton"
import LeaveCommunity from "./LeaveButton"
import EditCommunity from "./EditButton"

const AboutCommunity = () => {
  return (
    <div className='about-container'>
      <h1 className='title'>Community's name</h1>
      <p className='description'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla libero
        diam, facilisis non ante vestibulum, egestas commodo nisi. Donec
        elementum erat a sem sodales, ac dignissim est hendrerit. Ut fringilla
        quam vitae ligula tempor posuere. Nam ac purus nibh. Pellentesque ut
        feugiat nulla, ac venenatis felis. Curabitur facilisis aliquet turpis,
        sed convallis neque maximus non. Donec in orci sodales, suscipit enim
        id, vulputate erat. Etiam faucibus felis vitae eros tempus, a iaculis
        nisi dignissim.
      </p>
      <div className="buttons">
          <div><CreateEvent/></div>
          <div><EditCommunity/></div>
          <div><LeaveCommunity/></div>
      </div>
    </div>
  );
};

export default AboutCommunity;
