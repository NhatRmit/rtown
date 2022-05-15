import {
    GET_ITEMS,
    BUY_ITEM,
    ITEM_ERROR,
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


export const buyItem = (item_id, navigate, auth) => async dispatch => {
    try {
        const res = await axios.put(`/api/items/buy/${item_id}`)
            
        dispatch({
            type: BUY_ITEM,
            payload: res.data
        })
        dispatch(getItemByProfile())
        navigate(`/profiles/${auth}`)

    } catch (error) {
        dispatch({
            type: ITEM_ERROR,
            payload: { msg: error.response, status: error.response }
        })
    }
}