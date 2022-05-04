import { BUY_ITEM, GET_ITEMS, ITEM_ERROR } from '../actions/types';

const initialState = {
    items: [],
    item: null,
    loading: true,
    error: {}
};

function itemReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ITEMS:
            return {
                ...state,
                items: payload,
                loading: false
            };
        case BUY_ITEM:
            return {
                ...state,
                item: payload,
                loading: false
            }
        case ITEM_ERROR:
            return {
                ...state,
                loading: false,
                items: null,
                item: null,
                error: {}
            }
        default:
            return state
    }
}

export default itemReducer