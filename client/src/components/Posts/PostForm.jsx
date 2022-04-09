import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'
const PostForm = ({addPost}) => {
    const [text, setText] = useState('')
  return (
    <div className='post-form'>
        <div>
            <h1>Add Post</h1>
        </div>
        <form className="form" onSubmit={e => {e.preventDefault
        addPost({text})
        setText('')
        }}>
            <textarea
            name='text'
            cols="30"
            rows="5"
            placeholder="Create a post"
            onChange={e => setText(e.target.value)}
            required
            ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
            
        </form>
    </div>
  )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null, {addPost})(PostForm)