import React, { useEffect, useState } from "react";
import { addPost, editPost } from "../../actions/post";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";


const EditPost = ({ post: { post, loading } }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        text: post.text
    })
    const {
        text
    } = formData
    const test = () => {
        setFormData(useDispatch(editPost))
    }
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    // useEffect(() => {
    //     setFormData({
    //         text: loading || !post.text ? '' : post.text
    //     })
    // }, [loading, dispatch, post])

    const onUpdate = (e) => {
        e.preventDefault()
        dispatch(editPost(formData, navigate))
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
EditPost.propTypes = {
    addPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { addPost })(EditPost)