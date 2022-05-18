import '../Post/CreatePost.css'
import { BsFillCloudUploadFill } from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'
import { useState, useEffect } from 'react'
import { createItem } from '../../actions/item'
import { useDispatch } from 'react-redux'

const ItemForm = () => {
    const dispatch = useDispatch()
    const [tempFile, setTempFile] = useState("")
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
        setTempFile("")
    }

    const onChangeImage = e => {
        setUploadFile(e.target.files[0])
        setTempFile(e.target.files[0].name)
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        !reset && setReset(true)
    }, [reset])

    return (
        <>
            <form onSubmit={onSubmit} className="textarea-container" style={{ height: "50%", width: "40%", marginBottom: "2rem" }}>
                <textarea
                    name='text'
                    cols="30"
                    rows="1"
                    value={text}
                    placeholder="Create an item"
                    onChange={onChange}
                    required
                ></textarea>
                <span>
                    Rpoint <input type="number" onChange={onChange} value={Rpoint} name="Rpoint" id="rpoint" style={{ width: "20%" }} />
                </span>
                <div className='upload-section'>
                    <div className='upload-icons'>
                        <label>
                            {
                                reset &&
                                <input onChange={onChangeImage} id="img-input" type="file" style={{
                                    visibility: "hidden",
                                }} />
                            }
                            <IconContext.Provider value={{ color: '#676767', size: '1.5em' }}>
                                <BsFillCloudUploadFill />
                            </IconContext.Provider>
                            {tempFile}
                        </label>
                    </div >
                    <button type="submit" style={{ width: "20%" }}>Add</button>
                </div >
            </form >
        </>

    )
}

export default ItemForm