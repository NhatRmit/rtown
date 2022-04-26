import React from "react";
// import Filter from '../components/Filter/Filter'
import {Link} from "react-router-dom";
import {FaUserCircle} from "react-icons/fa";
import {IconContext} from "react-icons/lib";
import "./Comment.css";

const Comment = () => {
  return (
    <>
      <div className='comment-section'>
        <div className='comment-display'>
          <div className='user'>
            <Link to='/profile'>
              <span className='user-icon'>
                {/*CHANGE ICON FOR ME*/}
                <IconContext.Provider value={{color: "#676767", size: "1em"}}>
                  <FaUserCircle />
                </IconContext.Provider>
              </span>
            </Link>
            <Link to='/profile' className='link'>
              <p>Username</p>
            </Link>
          </div>
          <div className='comment-content'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.
            </p>
            <p className="comment-time">Posted 1 minute ago</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
