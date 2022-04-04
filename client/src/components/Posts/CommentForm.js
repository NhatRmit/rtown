import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment} from '../../actions/post'

const CommentForm = ({ postID, addComment }) => {
    const [text, setText] = useState('');

  return (
    <div class='comment-form'>
        <div class='bg-comment'>
            <h3>Leave a Comment</h3>
        </div>
        <form 
        class='comment-fomr'
        onSubmit={e => {
            e.preventDefault();
            addComment(postID ,{text});
            setText('');
        }}
        >
            <textarea 
            name="text" 
            cols="30" 
            rows="5"
            placeholder='Create a comment'
            value={text}
            onChange={ e=> setText(e.target.value)}
            required
            />
            
            <input type="submit" class='comment-btn' value='Submit' />
        </form>       
    </div>
  )
}

CommentForm.propTypes = {}

export default connect(null, { addComment }) (CommentForm);