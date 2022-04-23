import { GET_COMMENT } from "../actions/types";

const initialState = {
    comment: null
};

function postReducer(state = initialState, action) {
    const { type, payload } = action;
    
    switch(type){
        case GET_COMMENT:
           return {
        ...state,
        comment: payload
        }
      default:
      return state;
    }
    
}  
export default postReducer;