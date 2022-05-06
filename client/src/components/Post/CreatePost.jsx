import './CreatePost.css'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { BsFillCloudUploadFill } from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'
import { useState } from 'react'
import { addPost, addCommunityPost } from '../../actions/post'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const CreatePost = ({ isCommunity }) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [uploadFile, setUploadFile] = useState(null)
    const { community_id } = useParams()

    const onSubmit = e => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("file", uploadFile);
        formdata.append("text", text);

        !isCommunity ? dispatch(addPost(formdata)) : dispatch(addCommunityPost(formdata, community_id))

        setText('')
    }

    const onChangeImage = e => {
        setUploadFile(e.target.files[0])
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
                            {/* <label htmlFor='img-input'>
                                <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                    <BsFillChatDotsFill />
                                </IconContext.Provider>
                            </label >
                            <input id="img-input" type="file" /> */}
                        </span >
                        <span>
                            <label>
                                <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                    <BsFillCloudUploadFill />
                                </IconContext.Provider>
                            </label >
                            <input onChange={onChangeImage} id="img-input" type="file" />
                        </span >
                        <span className='file-upload'>
                            {/*CHANGE ICON FOR ME*/}
                            {/* <label htmlFor='file-input'>
                                <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                    <BsFillChatDotsFill />
                                </IconContext.Provider>
                            </label>
                            <input id="file-input" type="file" /> */}
                        </span>
                    </div >
                    <button type="submit">Post</button>
                </div >
            </form >
        </>

    )
}

export default CreatePost