import React, { useEffect, useState } from "react";
import { editPost, getPostById } from "../../actions/post";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { adminEditPost } from "../../actions/admin";

const initialState = {
    text: '',
}

const EditPost = ({ singlePost, pullData }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(initialState)
    const admin = useSelector(state => state.auth.admin)

    const {
        text,
    } = formData

    const [uploadFile, setUploadFile] = useState(null)

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    useEffect(() => {
        if (!singlePost) {
            dispatch(getPostById(singlePost._id));
        }
        if (singlePost) {
            const textData = { ...initialState };
            for (const key in singlePost) {
                if (key in textData) textData[key] = singlePost[key];
            }
            setFormData(textData);
        }
    }, [singlePost, dispatch])

    const onUpdate = (e) => {
        e.preventDefault()
        let formdata = new FormData();
        formdata.append("file", uploadFile);
        formdata.append("text", text);
        admin ? dispatch(adminEditPost(singlePost._id, formdata)) : dispatch(editPost(singlePost._id, formdata, navigate))
        pullData(false)
    }

    const onChangeImage = e => {
        setUploadFile(e.target.files[0])
    }

    return (

        <form className="form" onSubmit={onUpdate}>
            <input
                type="text"
                placeholder="Content"
                name="text"
                value={text}
                onChange={onChange}
            />
            <input type="file" onChange={onChangeImage} />
            <input type="submit" className="btn btn-primary my-1" />
        </form>

    )

}

export default EditPost