import axios from "axios";
import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    ADD_POST,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_COMMENT,
    REMOVE_COMMENT, EDIT_POST, EDIT_COMMENT, CLEAR_POST
} from "./types";

//Get post
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

//Add comment
export const addComment = (postId, formData,navigate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
        navigate('/')
        // dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// //Edit comment
// export const editComment = (commentId, formData, navigate) => 


//Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {


    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        // dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
// Add post
export const addPost = formData => async dispatch => {
    try {
        const res = await axios.post('/api/posts', formData)
        dispatch({
            type: ADD_POST,
            payload: res.data

        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}
// Delete post
export const deletePost = (id, navigate) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${id}`)
        dispatch({
            type: DELETE_POST,
            payload: id
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

// Edit post
export const editPost = (postId, formData, navigate) => async dispatch => {
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

        // dispatch(setAlert('Post Updated', 'success'))

        navigate('/')
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}


// Add Like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}
// Remove Like
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

export const getMyPosts = () => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/myPosts`)
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}

export const getPostById = (postId) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${postId}`)

        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}

export const getFilter = (filter) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/filter?filter=${filter}`)

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}

export const getSearch = (keyword) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/search?search=${keyword}`)

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}



export const clearPost = () => async dispatch => {
    dispatch({
        type: CLEAR_POST
    })
}