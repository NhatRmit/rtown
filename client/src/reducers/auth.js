import {
  LOAD_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
}

function authReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
      case LOAD_USER:
          return {
              ...state,
              isAuthenticated: true,
              loading: false,
              ...payload,
          }
      case LOGIN_SUCCESS:
          localStorage.setItem('token', payload.token)
          return {
              ...state,
              ...payload,
              isAuthenticated: true,
              loading: false
          }
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
          localStorage.removeItem('token')
          return {
              ...state,
              token: null,
              isAuthenticated: false,
              loading: false,
          }
      default:
          return state
  }
}

export default authReducer