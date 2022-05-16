import {
    GET_ITEMS,
    BUY_ITEM,
    ITEM_ERROR,
    DELETE_ITEM,
    ADD_ITEM,
    UPDATE_ITEM,
    GET_ITEM
} from './types'

import axios from 'axios'

export const getItems = () => async dispatch => {
    try {
        const res = await axios.get('/api/items/')

        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ITEM_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

export const getItemByProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/items/myItem')

        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: ITEM_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}


export const buyItem = (item_id) => async dispatch => {
    try {
        const res = await axios.put(`/api/items/buy/${item_id}`)

        dispatch({
            type: BUY_ITEM,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ITEM_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

export const deleteItem = (item_id) => async dispatch => {
    try {
        await axios.delete(`/api/items/delete/${item_id}`)
        dispatch({
            type: DELETE_ITEM,
            payload: item_id
        })
    } catch (error) {
        dispatch({
            type: ITEM_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

export const createItem = (formdata) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.post(`/api/items/`, formdata, config)
        dispatch({
            type: ADD_ITEM,
            payload: res.data
        })
        dispatch(getItems())
    } catch (error) {
        dispatch({
            type: ITEM_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

export const updateItem = (itemId, formdata) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        let res = await axios.put(`/api/items/update/${itemId}`, formdata, config)
        dispatch({
            type: UPDATE_ITEM,
            payload: res.data
        })
        dispatch(getItems())
    } catch (error) {
        dispatch({
            type: ITEM_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}

export const getItemById = (itemId) => async dispatch => {
    try {
        const res = await axios.put(`/api/items/${itemId}`)
        dispatch({
            type: GET_ITEM,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ITEM_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}