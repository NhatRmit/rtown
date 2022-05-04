
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addImage, displayImage, getImg } from '../../actions/image'


const Image = () => {
    const dispatch = useDispatch()
    const [uploadFile, setUploadFile] = useState(null)
    const [img, setImg] = useState('')

    const onSubmit = e => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("file", uploadFile);
        dispatch(addImage(formdata))
        
    }
    const onDisplay = e => {
        e.preventDefault();
        dispatch(displayImage(formdata.filesname))
    }

    const onChange = e => (
        setUploadFile(e.target.files[0])
    )

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="file" onChange={onChange} />
                <br />
                <input type="submit" value="submit" />
                <span onSubmit={onDisplay}>
                    <input type="submit" value="show image" />
                    <img src="" alt="" />
                </span>
                

            </form>

            
        </div>
    )
}
export default Image;