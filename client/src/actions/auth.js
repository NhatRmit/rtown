import {
    LOAD_USER,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    LOGOUT_SUCCESS,
    CLEAR_POSTS,
} from './types'

import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import { getProfile } from './profile'

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    } else {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth')

        dispatch({
            type: LOAD_USER,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const loginUser = (usernameOrEmail, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ usernameOrEmail, password })

    try {
        const res = await axios.post('/api/auth/login', body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
        dispatch(getProfile())
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const logoutUser = () => dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch({
        type: LOGOUT
    })
    dispatch({
        type: LOGOUT_SUCCESS
    })
    dispatch({
        type: CLEAR_POSTS
    })
    
}