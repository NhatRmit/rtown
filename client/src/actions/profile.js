import {
    GET_PROFILE,
    GET_PROFILES,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    PROFILE_ERROR,
    PROFILE_JOIN_COMMUNITY,
    PROFILE_LEAVE_COMMUNITY,
} from './types'
import axios from 'axios'


export const getProfile = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })

    try {
        const res = await axios.get('/api/profiles/myProfile')

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const getProfileById = (userId) => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })

    try {
        const res = await axios.get(`/api/profiles/${userId}`)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const getAllProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    try {
        const res = await axios.get('/api/profiles')

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg: err.response.data.statusText, status: err.response.data.status }
        })
    }
}

export const updateProfile = (formData, navigate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.put('/api/profiles/update', formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const joinCommunity = (community_id, profile_id) => async dispatch => {
    try {
        const res = await axios.put(`/api/profiles/join/${community_id}`)

        dispatch({
            type: PROFILE_JOIN_COMMUNITY,
            payload: { profile_id, community: res.data }
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const leaveCommunity = (community_id, profile_id, navigate) => async dispatch => {
    try {
        const res = await axios.put(`/api/profiles/leave/${community_id}`)

        dispatch({
            type: PROFILE_LEAVE_COMMUNITY,
            payload: { profile_id, community: res.data }
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const clearProfile = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE})
}