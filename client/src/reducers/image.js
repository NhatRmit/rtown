import { ADD_IMAGE, DISPLAY_IMAGE, IMAGE_ERROR  } from "../actions/types";

const initialState = {
    images: [],
    image: null,
    loading: true,
    error: {}
};

function imageReducers(state = initialState, action){
    const { type, payload } = action;
    switch (type) {
        case ADD_IMAGE:
            return {
              ...state,
              image: payload,
              loading: false
            };
        case DISPLAY_IMAGE:
            return {
              ...state,
              image: payload,
              loading: false
            };
        case IMAGE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

      default:
         return state;
    }
}

export default imageReducers;