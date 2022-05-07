import './CreatePost.css'
import { BsFillCloudUploadFill } from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'
import { useState, useEffect } from 'react'
import { addPost, addCommunityPost } from '../../actions/post'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

const CreatePost = ({ isCommunity }) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [uploadFile, setUploadFile] = useState(null)
    const { community_id } = useParams()
    const [reset, setReset] = useState(true)

    const onSubmit = e => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("file", uploadFile);
        formdata.append("text", text);

        !isCommunity ? dispatch(addPost(formdata)) : dispatch(addCommunityPost(formdata, community_id))

        setText('')
        setReset(false)
    }

    const onChangeImage = e => {
        setUploadFile(e.target.files[0])
    }

    const onChange = e => {
        setText(e.target.value)
    }

    useEffect(() => {
        !reset && setReset(true)
      }, [reset])

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
                        <span>
                            <label>
                                <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                    <BsFillCloudUploadFill />
                                </IconContext.Provider>
                            </label >
                            {
                                reset &&
                                    <input onChange={onChangeImage} id="img-input" type="file" />
                            }
                        </span >
                    </div >
                    <button type="submit">Post</button>
                </div >
            </form >
        </>

    )
}

export default CreatePost