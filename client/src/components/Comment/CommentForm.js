import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addComment } from "../../actions/post";
import { BsFillCloudUploadFill } from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [text, setText] = useState('');
  const [uploadFile, setUploadFile] = useState(null)
  const [reset, setReset] = useState(true)
  const [tempFile, setTempFile] = useState("")

  const onChange = e => (
    setText(e.target.value)
  )
  const onChangeImage = e => {
    setUploadFile(e.target.files[0])
    setTempFile(e.target.files[0].name)
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
        <span>
          <label>
            {
              reset &&
              <input onChange={onChangeImage} id="img-input" type="file" style={{
                visibility: "hidden",
                position: "absolute"
              }} />
            }
            <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
              <BsFillCloudUploadFill />
            </IconContext.Provider>
            {tempFile}
          </label>
        </span >
        <textarea
          name="text"
          cols="120"
          rows="1"
          placeholder='Create a comment'
          value={text}
          onChange={onChange}
        />
        {/* <>
          {
            reset &&
            <input onChange={onChangeImage} id="img-input" type="file" style={{
              visibility: "hidden",
            }} />
          }
          <IconContext.Provider value={{ color: '#676767', size: '2em' }}>
            <BsFillCloudUploadFill />
          </IconContext.Provider>
          {tempFile}
        </> */}

        {/* {
          reset &&
            <input type="file" name="uploadFile" onChange={onChangeImage} />
        } */}

        <button onClick={onCreate} className='post-btn'>Comment</button>
      </form>
    </>
  )
}
export default CommentForm