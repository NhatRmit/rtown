import axios from "axios";
import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    ADD_POST,
    DELETE_POST,
    ADD_COMMENT,
    REMOVE_COMMENT, EDIT_POST, EDIT_COMMENT, CLEAR_POST, GET_COMMENT, UPDATE_UPVOTE, UPDATE_DOWNVOTE, CHECK_OUT
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

export const getCommunityPosts = (community_id) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/postCommunity/${community_id}`)
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
export const addComment = (postId, formData, navigate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
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
            payload: { msg: err.response, status: err.response }
        });
    }
};

// //Edit comment
export const editComment = (postId, commentId, formData, navigate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const res = await axios.put(`/api/posts/comment/edit/${postId}/${commentId}`, formData, config);
        dispatch({
            type: EDIT_COMMENT,
            payload: res.data
        })
        navigate('/')

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        });
    }
};


//Delete comment
export const deleteComment = (postId, commentId, navigate) => async dispatch => {


    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });
        navigate('/')
        // dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        });
    }
};

// Add post
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.post('/api/posts', formData, config)
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
export const addCommunityPost = (formData, communityId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.post(`/api/posts/postCommunity/${communityId}`, formData, config)
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
        });
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
                'Content-Type': 'multipart/form-data'
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


// Add Upvote
export const addUpvote = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts//upvote/${id}`)
        dispatch({
            type: UPDATE_UPVOTE,
            payload: { id, upvotes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}
// Remove Upvote
export const removeUpvote = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/removeupvote/${id}`)
        dispatch({
            type: UPDATE_UPVOTE,
            payload: { id, upvotes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}


// Add Downvote
export const addDownvote = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts//downvote/${id}`)
        dispatch({
            type: UPDATE_DOWNVOTE,
            payload: { id, upvotes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}
// Remove Upvote
export const removeDownvote = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/removedownvote/${id}`)
        dispatch({
            type: UPDATE_DOWNVOTE,
            payload: { id, upvotes: res.data }
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

export const getCommentById = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${postId}/${commentId}`)
        dispatch({
            type: GET_COMMENT,
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

export const createEvent = (formData, communityId, navigate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.post(`/api/posts/event/${communityId}`, formData, config)
        dispatch({
            type: ADD_POST,
            payload: res.data

        })
        navigate(`/communities/${communityId}`)
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

export const checkOut = (post_id, profile_id, navigate) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/event/checkout/${post_id}`)
        dispatch({
            type: CHECK_OUT,
            payload: res.data
        })
        navigate(`/profiles/${profile_id}`)
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}