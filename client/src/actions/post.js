import axios from "axios";
import { 
    GET_POSTS,
    POST_ERROR,
    ADD_COMMENT,
    REMOVE_COMMENT } from "./types";

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
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

//Add comment
export const addComment = (postId, FormData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, FormData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        // dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};

//Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`, FormData, config);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        // dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};