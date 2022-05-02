import React from "react";
// import Filter from '../components/Filter/Filter'
import Comment from "./Comment";
import "./Comment";

const CommentSection = () => {
  return (
    <>
      <div className='comment-page-container'>
        <div className='comment-section'>
          <h3>Comment</h3>
          <form class='comment-textarea'>
            <textarea placeholder='Write something...'></textarea>
            <button class='post-btn'>Comment</button>
          </form>
        </div>
        <Comment />
      </div>
    </>
  );
};

export default CommentSection;
