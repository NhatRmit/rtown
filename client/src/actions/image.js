import axios from "axios";
import { ADD_COMMUNITY, ADD_IMAGE, DISPLAY_IMAGE, IMAGE_ERROR } from "./types";

export const addImage = (image) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.post('/api/images/upload', image, config)

        dispatch({
            type: ADD_IMAGE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: IMAGE_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

export const addImageToProfile = (image) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.post('/api/images/uploadProfile', image, config)
        dispatch({
            type: ADD_IMAGE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: IMAGE_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

export const addImageToComunity = (image, communityId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.post(`/api/images/uploadCommunity/${communityId}`, image, config)
        dispatch({
            type: ADD_IMAGE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: IMAGE_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

export const uploadCommunityImage = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.post(`/api/images/uploadCommunity/`, formData, config)
        dispatch({
            type: ADD_COMMUNITY,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: IMAGE_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

export const displayImage = (image) => async dispatch => {
    try {
        const res = await axios.get(`/api/images/getOne/${image}`)
        dispatch({
            type: DISPLAY_IMAGE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: IMAGE_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

export const showImage = (image) => async dispatch => {
    try {
        const res = await axios.get(`/api/images/${image}`)
        dispatch({
            type: DISPLAY_IMAGE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: IMAGE_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

export const uploadPostImage = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.post(`/api/images/uploadPost`, formData, config)
        dispatch({
            type: DISPLAY_IMAGE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: IMAGE_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

export const uploadCommentImage = (formData, post_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.post(`/api/images/uploadComment/${post_id}`, formData, config)
        dispatch({
            type: DISPLAY_IMAGE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: IMAGE_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}