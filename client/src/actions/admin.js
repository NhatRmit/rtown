import {
    EDIT_POST,
    DELETE_POST
} from "./types"
// Edit post
export const adminEditPost = (postId, formData, navigate) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put(`/api/posts/update/${postId}`, formData, config)

        dispatch({
            type: EDIT_POST,
            payload: res.data
        })
        navigate('/')
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

// Delete post
export const adminDeletePost = (id, navigate) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${id}`)
        dispatch({
            type: DELETE_POST,
            payload: id
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}