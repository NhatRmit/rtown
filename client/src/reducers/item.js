import {

} from '../actions/types';

const initialState = {
    items: [],
    item: null,
    loading: true,
    error: {}
};

function itemReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "":
            return {
                ...state,
                items: payload,
                loading: false
            };
        default:
            return state
    }
}

export default itemReducer