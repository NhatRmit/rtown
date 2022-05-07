import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, post, comment }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [text, setText] = useState('');
  const [uploadFile, setUploadFile] = useState(null)
  const [reset, setReset] = useState(true)
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
    setText('')
    setReset(false)
  }

  useEffect(() => {
    !reset && setReset(true)
  }, [reset])
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
        <img src={`http://localhost:8000/api/images/${uploadFile}`} alt="" />
        {
          reset &&
            <input type="file" name="uploadFile" onChange={onChangeImage} />
        }
        <button onClick={onCreate} className='post-btn'>Comment</button>
      </form>
    </>
  )
}
export default CommentForm