import { BUY_ITEM, GET_ITEMS, ITEM_ERROR, DELETE_ITEM, ADD_ITEM, UPDATE_ITEM, GET_ITEM } from '../actions/types';

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
        case ADD_ITEM:
            return {
                ...state,
                items: [payload, ...state.items],
                loading: false,
            }
        case UPDATE_ITEM:
        case GET_ITEM:
            return {
                ...state,
                item: payload,
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
        case DELETE_ITEM:
            return {
                ...state,
                loading: false,
                items: state.items.filter(item => item._id !== payload),
                error: {}
            }
        default:
            return state
    }
}

export default itemReducer