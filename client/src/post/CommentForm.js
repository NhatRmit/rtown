// import React, {useState} from 'react'
// import PropTypes from 'prop-types'
// import { connect} from 'react-redux'
// import { useNavigate, useParams } from 'react-router-dom' 
// import { addComment } from '../actions/post'
// import './CommentForm.css'



// const CommentForm = ({ postId, addComment}) => {
//   const navigate = useNavigate()
//   const [text, setText] = useState('');
//   const onChange = e => (
//     setText(e.target.value)
//   )

//   return (
//     <div className='comment-background'>
//         <div className='comment-form'>
//             <h3 className='comment-title'>Comment</h3>
//         </div>
//         <form
//           onSubmit={ e=> {
//               e.preventDefault();
//               addComment(postId, { text }, navigate);
//               setText('');
//           }} 
//         >
//             <textarea
//             className='comment-textarea' 
//             name="comment textarea"  
//             cols="120" 
//             rows="5"
//             placeholder='  Create a comment'
//             value={ text}
//             onChange ={ onChange }
//             />
//             <input type='submit' value='Send' className='comment-btn'/>
//         </form>
//     </div>
//   )
// }

// CommentForm.propTypes = {
//     addComment: PropTypes.func.isRequired
// }

// export default connect(null, { addComment}) (CommentForm);

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
    dispatch(uploadCommentImage(formdata, postId))
  }


  return (
    <>
      {/* <form class='comment-textarea'>
            <textarea placeholder='Write something...'></textarea>
            <button class='post-btn'>Comment</button>
          </form> */}

      <form className="comment-textarea"
        onSubmit={onCreate}
      >
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