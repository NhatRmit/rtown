import React from "react";
import {useState} from "react";
import "./Newsfeed.css";
import PostsSection from "../Post/PostsSection";
import CommentSection from "../Comment/CommentSection";

const Newsfeed = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <div className='newsfeed-section'>
        <div className='newsfeed-wrapper'>
          <div className='newsfeed-tabs-container'>
            <div className='newsfeed-bloc-tabs'>
              <button
                className={toggleState === 1 ? "newsfeed-tabs newsfeed-active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}>
                New
              </button>
              <button
                className={toggleState === 2 ? "newsfeed-tabs newsfeed-active-tabs" : "newsfeed-tabs"}
                onClick={() => toggleTab(2)}>
                Trending
              </button>
              <button
                className={toggleState === 3 ? "newsfeed-tabs newsfeed-active-tabs" : "newsfeed-tabs"}
                onClick={() => toggleTab(3)}>
                Top
              </button>
            </div>

            <div className='newsfeed-content-tabs'>
              <div
                className={
                  toggleState === 1 ? "newsfeed-content  newsfeed-active-content" : "newsfeed-content"
                }>
                <PostsSection />
                <CommentSection />
              </div>

              <div
                className={
                  toggleState === 2 ? "newsfeed-content  newsfeed-active-content" : "newsfeed-content"
                }>
                <PostsSection />
                <CommentSection />
              </div>

              <div
                className={
                  toggleState === 3 ? "newsfeed-content  newsfeed-active-content" : "newsfeed-content"
                }>
                <PostsSection />
                <CommentSection />
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newsfeed;
