import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom' 
import { addComment } from '../actions/post'
import './CommentForm.css'



const CommentForm = ({ postId, addComment}) => {
  const navigate = useNavigate()
  const [text, setText] = useState('');
  const onChange = e => (
    setText(e.target.value)
  )

  return (
    <div className='comment-background'>
        <div className='comment-form'>
            <h3 className='comment-title'>Comment</h3>
        </div>
        <form
          onSubmit={ e=> {
              e.preventDefault();
              addComment(postId, { text }, navigate);
              setText('');
          }} 
        >
            <textarea
            className='comment-textarea' 
            name="comment textarea"  
            cols="120" 
            rows="5"
            placeholder='  Create a comment'
            value={ text}
            onChange ={ onChange }
            />
            <input type='submit' value='Send' className='comment-btn'/>
        </form>
    </div>
  )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect(null, { addComment}) (CommentForm);