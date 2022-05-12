import {
    EDIT_POST,
    DELETE_POST,
    ADMIN_ACCEPT_COMMUNITY_REQUEST,
    ADMIN_GETALL_COMMUNITY,
    CLEAR_COMMUNITY,
    COMMUNITY_ERROR,
    POST_ERROR,
    ADMIN_DELETE_COMMUNITY
} from "./types"
import axios from 'axios'

// Get all Community Request 
export const adminGetAllCommunityRequest = () => async dispatch => {
    dispatch({ type: CLEAR_COMMUNITY })
    try {
        const res = await axios.get('/api/admins/getAllCommunitiesRequest')

        dispatch({
            type: ADMIN_GETALL_COMMUNITY,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMMUNITY_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}
// Community Request
export const adminAcceptCommunityRequest = (community_id, formData, navigate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.put(`/api/admins/communityAccept/${community_id}`, formData, config)

        dispatch({
            type: ADMIN_ACCEPT_COMMUNITY_REQUEST,
            payload: res.data
        })
        navigate(`/communities/${community_id}`)

    } catch (err) {
        dispatch({
            type: COMMUNITY_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}

// delete Community 
export const deleteCommunityRequest = (community_id) => async dispatch => {
    try {
        await axios.delete(`/api/admins/deleteCommunity/${community_id}`)

        dispatch({
            type: ADMIN_DELETE_COMMUNITY,
            payload: community_id
        })
    } catch (err) {
        dispatch({
            type: COMMUNITY_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}

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