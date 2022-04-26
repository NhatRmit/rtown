import './CreatePost.css'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'
import { useState } from 'react'
import { addPost } from '../../actions/post'
import { useDispatch, useSelector } from 'react-redux'

const CreatePost = () => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')

    const onSubmit = e => {
        e.preventDefault()
        dispatch(addPost({ text }))
        setText('')
    }

    const onChange = e => {
        setText(e.target.value)
    }

    return (
        <>
            <h1 className="title">Create post</h1>
            <form onSubmit={onSubmit} className="textarea-container">
                <textarea
                    name='text'
                    cols="30"
                    rows="5"
                    value={text}
                    placeholder="Create a post"
                    onChange={onChange}
                    required
                ></textarea>
                <div className='upload-section'>
                    <div className='upload-icons'>
                        <span className='image-upload'>
                            {/*CHANGE ICON FOR ME*/}
                            <label htmlFor='img-input'>
                                <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                    <BsFillChatDotsFill />
                                </IconContext.Provider>
                            </label>
                            <input id="img-input" type="file" />
                        </span>
                        <span className='file-upload'>
                            {/*CHANGE ICON FOR ME*/}
                            <label htmlFor='file-input'>
                                <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                    <BsFillChatDotsFill />
                                </IconContext.Provider>
                            </label>
                            <input id="file-input" type="file" />
                        </span>
                    </div>
                    <button type="submit">Post</button>
                </div>
            </form>
        </>
    )
}

export default CreatePost