import {
    GET_COMMUNITIES,
    GET_COMMUNITY,
    ADD_COMMUNITY,
    UPDATE_COMMUNITY,
    DELETE_COMMUNITY,
    CLEAR_COMMUNITY,
    COMMUNITY_ERROR,
    GET_MY_COMMUNITIES,
    COMMUNITY_REQUEST_CREATE
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
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.put(`/api/communities/update/${community_id}`, formData, config)

        dispatch({
            type: UPDATE_COMMUNITY,
            payload: res.data
        })
        navigate(`/communities/${community_id}`)
        alert("Your community is updated")

    } catch (err) {
        dispatch({
            type: COMMUNITY_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}

export const deleteCommunity = (community_id, navigate) => async dispatch => {
    try {
        await axios.delete(`/api/communities/${community_id}`)

        dispatch({
            type: DELETE_COMMUNITY,
            payload: community_id
        })
        alert("You have deleted your community permanently")
        navigate("/newsfeed")
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
        await axios.put(`/api/profiles/leave/${community_id}`)

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
        await axios.put(`/api/profiles/join/${community_id}`)
        dispatch(getCommunityById(community_id))
        navigate(`/profiles/${profile_id}`)

    } catch (err) {
        dispatch({
            type: COMMUNITY_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}

export const requestCreateCommunity = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.post('/api/communities/createCommunityRequest', formData, config)

        dispatch({
            type: COMMUNITY_REQUEST_CREATE,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: COMMUNITY_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}

export const kickMember = (communityId, profileId) => async dispatch => {
    try {
        const res = await axios.put(`/api/communities/update/${communityId}/${profileId}`)
        dispatch({
            type: GET_COMMUNITY,
            payload: res.data
        })
        dispatch(getCommunityById(communityId))
    } catch (err) {
        dispatch({
            type: COMMUNITY_ERROR,
            payload: { msg: err.response, status: err.response }
        })
    }
}

export const clearCommunityData = (communityId, profileId) => async dispatch => {
    try {
        const res = await axios.put(`/api/communities/clear/${communityId}/${profileId}`)
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

