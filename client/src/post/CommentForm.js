import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import Filter from '../components/Filter/Filter'
import { useNavigate } from "react-router-dom";
import { uploadCommentImage } from "../actions/image";
// import { addComment } from "../../actions/post";
import { addComment } from "../actions/post";
import Comment from "../components/Comment/Comment";

const CommentForm = ({ postId, post, comment }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [text, setText] = useState('');
  const [uploadFile, setUploadFile] = useState(null)
  const onChange = e => (
    setText(e.target.value)
  )
  const onChangeImage = e => {
    setUploadFile(e.target.files[0])
  }

  const onCreate = e => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("file", uploadFile);
    formdata.append("text", text);
    dispatch(addComment(postId, formdata, navigate))
  }


  return (
    <>
      <form className="comment-textarea" onSubmit={onCreate}>
        <textarea
          name="text"
          cols="120"
          rows="3"
          placeholder='Create a comment'
          value={text}
          onChange={onChange}
        />
        <input type="file" onChange={onChangeImage} />
        <button type='submit' className='post-btn'>Comment</button>
      </form>
    </>
  )
}
export default CommentForm