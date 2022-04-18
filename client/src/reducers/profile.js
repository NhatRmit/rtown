import {
    GET_PROFILE,
    GET_PROFILES,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    PROFILE_ERROR,
    PROFILE_JOIN_COMMUNITY,
    PROFILE_LEAVE_COMMUNITY,
} from '../actions/types'

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    errors: {}
}

function profileReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            }

        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false,
            }

        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
            }

        case PROFILE_JOIN_COMMUNITY:
        case PROFILE_LEAVE_COMMUNITY:
            return {
                ...state,
                profiles: state.profiles.map(profile => profile._id === payload.profile_id ? { ...profile, community: payload.community } : profile),
                loading: false,
            }

        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                profile: null,
                loading: false,
            }

        default:
            return state
    }
}

export default profileReducer