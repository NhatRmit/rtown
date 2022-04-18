// import React, { useState } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { addComment } from '../actions/post'
// import './CommentForm.css'


// const CommentForm = ({ addComment }) => {
//   const [text, setText] = useState('');

//   return (
//     <div className='comment-background'>
//       <div className='comment-form'>
//         <h3 className='comment-title'>Comment</h3>
//       </div>
//       <form
//         onSubmit={e => {
//           e.preventDefault();
//           //   addComment(postId, { text });
//           setText('');
//         }}
//       >
//         <textarea
//           className='comment-textarea'
//           name="comment textarea"
//           cols="120"
//           rows="5"
//           placeholder='  Create a comment'
//           value={text}
//           onChange={e => setText(e.target.value)}
//         />
//         <input type='submit' value='Send' className='comment-btn' />
//       </form>
//     </div>
//   )
// }

// CommentForm.propTypes = {
//   addComment: PropTypes.func.isRequired
// }

// export default connect(null, { addComment })(CommentForm);