import {
    GET_COMMUNITIES,
    GET_COMMUNITY,
    ADD_COMMUNITY,
    UPDATE_COMMUNITY,
    DELETE_COMMUNITY,
    CLEAR_COMMUNITY,
    COMMUNITY_ERROR,
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
            payload: { msg: err.response.statusText, status: err.response.status }
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
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const addCommunity = (formData, navigate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/communities/', formData, config)

        dispatch({
            type: ADD_COMMUNITY,
            payload: res.data
        })

        navigate(`/community/${res.data._id}`)
    } catch (err) {
        dispatch({
            type: COMMUNITY_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
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
        const res = await axios.put(`/api/communities/${community_id}`, formData, config)

        dispatch({
            type: UPDATE_COMMUNITY,
            payload: res.data
        })
        navigate(`/community/${res.data._id}`)

    } catch (err) {
        dispatch({
            type: COMMUNITY_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
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
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const getMyCommunities = () => async dispatch => {
    try {
        const res = await axios.get(`/api/communities/myCommunities`)
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