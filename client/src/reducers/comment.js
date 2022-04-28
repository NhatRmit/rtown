import { GET_COMMENT, EDIT_COMMENT } from "../actions/types";

const initialState = {
    comment: null
};

function commentReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_COMMENT:
        case EDIT_COMMENT:
            return {
                ...state,
                comment: payload
            }
        default:
            return state;
    }

}
export default commentReducer;