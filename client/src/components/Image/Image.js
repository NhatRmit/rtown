
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addImage, displayImage, getImg, showImage } from '../../actions/image'


const Image = () => {
    const dispatch = useDispatch()
    const [uploadFile, setUploadFile] = useState(null)
    const [img, setImg] = useState('')
    const image = useSelector(state => state.image.image)

    const onSubmit = e => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("file", uploadFile);
        dispatch(addImage(formdata))
    }

    const onDisplay = e => {
        e.preventDefault();
        dispatch(displayImage("1651331940235-any-name-kisspng-computer-icons-facebook-logo-flattened-vector-5b49543a2d93e8.7433487315315323461867.png"))
    }

    const onChange = e => (
        setUploadFile(e.target.files[0])
    )

    return (
        <div>
            <form onSubmit={onDisplay}>
                <input type="file" onChange={onChange} />
                <br />
                <input type="submit" value="submit" />
            </form>
            <img src={image} alt="" />

        </div>
    )
}
export default Image;