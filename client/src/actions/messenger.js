import axios from 'axios';
import { FRIEND_GET_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS } from "./types";

export const getFriends = () => async (dispatch) => {
     try {
          const response = await axios.get('/api/messengers/get-friends');
          dispatch({
               type: FRIEND_GET_SUCCESS,
               payload: {
                    friends: response.data.friends
               }
          })

     } catch (error) {
          console.log(error.response.data);
     }
}

export const messageSend = (data) => async (dispatch) => {
     try {
          const response = await axios.post('/api/messengers/send-message', data);
          dispatch({
               type: MESSAGE_SEND_SUCCESS,
               payload: {
                    message: response.data.message
               }
          })
     } catch (error) {
          console.log(error.response.data);
     }
}


export const getMessage = (id) => {
     return async (dispatch) => {
          try {
               const response = await axios.get(`/api/messengers/get-message/${id}`)
               dispatch({
                    type: MESSAGE_GET_SUCCESS,
                    payload: {
                         message: response.data.message
                    }
               })
          } catch (error) {
               console.log(error.response.data)
          }
     }
}


export const ImageMessageSend = (data) => async (dispatch) => {

     try {
          const response = await axios.post('/api/messengers/image-message-send', data);
          dispatch({
               type: MESSAGE_SEND_SUCCESS,
               payload: {
                    message: response.data.message
               }
          })
     } catch (error) {
          console.log(error.response.data);

     }

}

export const seenMessage = (msg) => async (dispatch) => {
     try {
          const response = await axios.post('/api/messengers/seen-message', msg);
          console.log(response.data);
     } catch (error) {
          console.log(error.response.message)
     }
}

export const updateMessage = (msg) => async (dispatch) => {
     try {
          const response = await axios.post('/api/messengers/delivered-message', msg);
          console.log(response.data);
     } catch (error) {
          console.log(error.response.message)

     }
}

export const getTheme = () => async (dispatch) => {

     const theme = localStorage.getItem('theme');
     dispatch({
          type: "THEME_GET_SUCCESS",
          payload: {
               theme: theme ? theme : 'white'
          }
     })

}

export const themeSet = (theme) => async (dispatch) => {
     localStorage.setItem('theme', theme);
     dispatch({
          type: "THEME_SET_SUCCESS",
          payload: {
               theme: theme
          }
     })

}
