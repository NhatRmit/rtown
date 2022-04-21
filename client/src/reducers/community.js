import {
    GET_COMMUNITIES,
    GET_COMMUNITY,
    ADD_COMMUNITY,
    UPDATE_COMMUNITY,
    DELETE_COMMUNITY,
    CLEAR_COMMUNITY,
    COMMUNITY_ERROR,
    GET_MY_COMMUNITIES,
} from '../actions/types'

const initialState = {
    community: null,
    communities: [],
    loading: true,
    error: {},
}

function communityReducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_COMMUNITIES:
            return {
                ...state,
                communities: payload,
                loading: false,
            }
        case GET_MY_COMMUNITIES: 
            return {
                ...state, 
                communities: payload,
                loading: false,
            }
        case GET_COMMUNITY:
        case UPDATE_COMMUNITY:
            return {
                ...state,
                community: payload,
                loading: false
            }

        case ADD_COMMUNITY:
            return {
                ...state,
                community: payload,
                loading: false
            }

        case DELETE_COMMUNITY:
            return {
                ...state,
                communities: state.communities.filter(community => community._id !== payload),
                loading: false,
            }
        case CLEAR_COMMUNITY:
            return {
                ...state, 
                community: null,
            }

        case COMMUNITY_ERROR:
            return {
                ...state,
                community: null,
                error: payload,
                loading: false,
            }

        default:
            return state
    }
}

export default communityReducer