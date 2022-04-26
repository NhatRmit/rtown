import React, { useState } from "react";
// import Filter from '../components/Filter/Filter'
import Comment from "./Comment";
import "./Comment";
import { useNavigate } from "react-router-dom";
import { addComment } from "../../actions/post";

const CommentSection = ({ post, comment }) => {
  return (
    <>
      <div className='comment-page-container'>
        <Comment post={post} comment={comment} />
      </div>
    </>
  );
};

export default CommentSection;
