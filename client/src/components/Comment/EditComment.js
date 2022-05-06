import React, { useEffect, useState } from "react";
import { getPostById, editComment, getCommentById } from "../../actions/post";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

const initialState = {
    text: ''
}

const EditComment = ({ singlePost, singleComment }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(initialState)
    const {
        text
    } = formData

    const [uploadFile, setUploadFile] = useState(null)

    // const comment = useSelector(state => state.comment.comment)
    // console.log(comment && comment.text)
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
    useEffect(() => {
        if (!singleComment) {
            dispatch(getCommentById(singlePost._id, singleComment._id))
        }
        dispatch(getPostById(singlePost._id));

        if (singleComment) {
            const textData = { ...initialState };
            for (const key in singleComment) {
                if (key in textData) textData[key] = singleComment[key];
            }
            setFormData(textData);
        }
    }, [singleComment, singlePost._id, dispatch])

    const onChangeImage = e => {
        setUploadFile(e.target.files[0])
    }

    const onUpdate = (e) => {
        e.preventDefault() 
        let formdata = new FormData();
        formdata.append("text", text);
        formdata.append("file", uploadFile);
        dispatch(editComment(singlePost._id, singleComment._id, formdata, navigate))
    }

    return (
        <div>
            <form className="form" onSubmit={onUpdate}>
                <div>
                    <input
                        type="text"
                        placeholder="Content"
                        name="text"
                        value={text}
                        onChange={onChange}
                    />
                    <input type="file" onChange={onChangeImage}/>
                    <input type="submit" className="btn btn-primary my-1" />
                </div>
            </form>
        </div>
    )

}

export default EditComment