import {
    GET_COMMUNITIES,
    GET_COMMUNITY,
    ADD_COMMUNITY,
    UPDATE_COMMUNITY,
    DELETE_COMMUNITY,
    CLEAR_COMMUNITY,
    COMMUNITY_ERROR,
    GET_MY_COMMUNITIES,
    GET_PROFILE
} from './types'

import axios from 'axios'

export const getAllCommunities = () => async dispatch => {
    dispatch({ type: CLEAR_COMMUNITY })
    try {
        const res = await axios.get('/api/communities/')

        dispatch({
            type: GET_COMMUNITIES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMMUNITY_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}

export const getCommunityById = (community_id) => async dispatch => {
    try {
        const res = await axios.get(`/api/communities/${community_id}`)

        dispatch({
            type: GET_COMMUNITY,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMMUNITY_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}

export const addCommunity = (formData, navigate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.post('/api/communities/', formData, config)

        dispatch({
            type: ADD_COMMUNITY,
            payload: res.data
        })

        navigate(`/communities/${res.data._id}`)
    } catch (err) {
        dispatch({
            type: COMMUNITY_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}

export const updateCommunity = (community_id, formData, navigate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.put(`/api/communities/update/`, formData, config)

        dispatch({
            type: UPDATE_COMMUNITY,
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

export const deleteCommunity = (community_id) => async dispatch => {
    try {
        await axios.delete(`/api/communities/${community_id}`)

        dispatch({
            type: DELETE_COMMUNITY,
            payload: community_id
        })
    } catch (err) {
        dispatch({
            type: COMMUNITY_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}


export const getMyCommunities = (userId) => async dispatch => {
    dispatch({ type: CLEAR_COMMUNITY })
    try {
        const res = await axios.get(`/api/communities/myCommunities/${userId}`)
        dispatch({
            type: GET_MY_COMMUNITIES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMMUNITY_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}

export const leaveCommunity = (community_id, navigate) => async dispatch => {
    dispatch({ type: CLEAR_COMMUNITY })
    try {
        const res = await axios.put(`/api/profiles/leave/${community_id}`)
        // dispatch({
        //     type: GET_MY_COMMUNITIES,
        //     payload: res.data
        // })
        dispatch(getCommunityById(community_id))

        navigate(`/`)

    } catch (err) {
        dispatch({
            type: COMMUNITY_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}

export const joinCommunity = (community_id, profile_id, navigate) => async dispatch => {
    // dispatch({ type: CLEAR_COMMUNITY })
    try {
        const res = await axios.put(`/api/profiles/join/${community_id}`)
        // dispatch({
        //     type: GET_COMMUNITY,
        //     payload: res.data
        // })
        dispatch(getCommunityById(community_id))
        navigate(`/profiles/${profile_id}`)

    } catch (err) {
        dispatch({
            type: COMMUNITY_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}
