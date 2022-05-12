import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    EDIT_POST,
    DELETE_POST,
    ADMIN_ACCEPT_COMMUNITY_REQUEST,
    ADMIN_GETALL_COMMUNITY
} from '../actions/types';

const initialState = {
    admin: null,
    admins: [],
    loading: true,
    error: {}
};

function postReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        // case GET_POSTS:
        //     return {
        //         ...state,
        //         posts: payload,
        //         loading: false
        //     };
        // case GET_POST:
        // case POST_ERROR:
        //     return {
        //         ...state,
        //         error: payload,
        //         loading: false
        //     }
        // case EDIT_POST:
        //     return {
        //         ...state,
        //         post: payload,
        //         loading: false
        //     };
        // case DELETE_POST:
        //     return {
        //         ...state,
        //         posts: state.posts.filter(post => post._id !== payload),
        //         loading: false
        //     };
        
            
        default:
            return state;
        
        
    }
}
export default postReducer;