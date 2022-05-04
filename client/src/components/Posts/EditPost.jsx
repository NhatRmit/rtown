import React, { useEffect, useState } from "react";
import { addPost, editPost, getPostById } from "../../actions/post";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
    text: ''
}

const EditPost = ({ singlePost }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(initialState)
    const {
        text
    } = formData

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    useEffect(() => {
        if (!singlePost) {
            dispatch(getPostById(singlePost._id));
        }
 
        // if we finished loading and we do have a profile
        // then build our profileData
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
        dispatch(editPost(singlePost._id, formData, navigate))
    }
console.log(singlePost)
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
EditPost.propTypes = {
    addPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { addPost })(EditPost)