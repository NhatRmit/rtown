import axios from "axios";
import { ADD_IMAGE, DISPLAY_IMAGE, IMAGE_ERROR } from "./types";

export const addImage = (image) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.post('/api/file/upload', image, config)

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
export const displayImage = (image) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.get(`/api/file/${filename}`, image, config)
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