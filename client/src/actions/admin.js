import {
    EDIT_POST,
    DELETE_POST,
    ADMIN_ACCEPT_COMMUNITY_REQUEST,
    ADMIN_GETALL_COMMUNITY,
    CLEAR_COMMUNITY,
    COMMUNITY_ERROR,
    POST_ERROR,
    ADMIN_DELETE_COMMUNITY,
    UPDATE_COMMUNITY
} from "./types"
import { getPosts } from "./post"
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

export const adminGetAllAccepted = () => async dispatch => {
    dispatch({ type: CLEAR_COMMUNITY })
    try {
        const res = await axios.get('/api/admins/getAllAcceptedCommunity')

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
export const adminAcceptCommunityRequest = (community_id) => async dispatch => {
    try {
        const res = await axios.put(`/api/admins/communityAccept/${community_id}`)

        dispatch({
            type: ADMIN_ACCEPT_COMMUNITY_REQUEST,
            payload: res.data
        })
        dispatch(adminGetAllCommunityRequest())
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
export const adminEditPost = (postId, formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const res = await axios.put(`/api/admins/update/${postId}`, formData, config)

        dispatch({
            type: EDIT_POST,
            payload: res.data
        })
        dispatch(getPosts())
        
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

// Delete post
export const adminDeletePost = (id) => async dispatch => {
    try {
        await axios.delete(`/api/admins/${id}`)
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

export const adminEditCommunity = (communityId, formdata, navigate) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }
    try {
        const res = await axios.put(`/api/admins/editCommunity/${communityId}`, formdata, config)
        dispatch({
            type: UPDATE_COMMUNITY,
            payload: res.data
        });
        alert("Admin updated community successfully!")
        navigate('/admin-profile')
    } catch (error) {
        dispatch({
            type: COMMUNITY_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}