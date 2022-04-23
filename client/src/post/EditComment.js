import React, { useEffect, useState } from "react";
import { addComment, getPostById, editComment, editPost, getCommentById } from "../actions/post";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";

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

    const onUpdate = (e) => {
        e.presentDefault()
        dispatch(editComment(singlePost._id, singleComment._id, formData, navigate))
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
                    <input type="submit" className="btn btn-primary my-1" />
                </div>
            </form>
        </div>
    )

}

export default EditComment