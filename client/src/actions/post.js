import axios from "axios";
import { GET_POSTS, POST_ERROR, ADD_POST, UPDATE_LIKES } from "./types";

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
export const deletePost = id => async dispatch => {
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

// Add Like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data}
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
            payload: {id, likes: res.data}
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}
