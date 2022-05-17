import '../Post/CreatePost.css'
import { BsFillCloudUploadFill } from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'
import { useState, useEffect } from 'react'
import { createItem } from '../../actions/item'
import { useDispatch } from 'react-redux'

const ItemForm = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        text: "",
        Rpoint: 0
    })

    const {
        text, Rpoint
    } = formData

    const [uploadFile, setUploadFile] = useState(null)
    const [reset, setReset] = useState(true)

    const onSubmit = e => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("file", uploadFile);
        formdata.append("name", text);
        formdata.append("Rpoint", Rpoint)
        dispatch(createItem(formdata))
        setFormData({
            text: "",
            Rpoint: 0
        })
        setReset(false)
    }
    
    const onChangeImage = e => {
        setUploadFile(e.target.files[0])
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        !reset && setReset(true)
    }, [reset])

    return (
        <>
            <h1 className="title">Create item</h1>
            <form onSubmit={onSubmit} className="textarea-container">
                <textarea
                    name='text'
                    cols="30"
                    rows="5"
                    value={text}
                    placeholder="Create an item"
                    onChange={onChange}
                    required
                ></textarea>
                <label>Input Rpoint</label>
                <input type="number" onChange={onChange} value={Rpoint} name="Rpoint" id="rpoint"/>
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

export default ItemForm