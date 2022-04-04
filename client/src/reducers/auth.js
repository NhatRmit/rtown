const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
  };

function authReducer(state = initialState, action) {}

export default authReducer