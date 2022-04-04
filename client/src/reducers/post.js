import { 
  GET_POSTS, 
  POST_ERROR,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types';
const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
  };

   function postReducer(state = initialState, action) {
    const {type, payload} = action

    switch (type) {
      case GET_POSTS:
        return {
          ...state,
          posts: payload,
          loading: false
        };
      case POST_ERROR:
        return{
          ...state,
          error: payload,
          loading: false
        };
      case ADD_COMMENT:
        return {
          ...state,
          post: { ...state.post, comments: payload},
          loading: false
        }
      case REMOVE_COMMENT:
        return {
          ...state,
          post: {
            ...state.post,
            comments: state.post.comments.filter(
              comment => comment._id !== payload
              )
          },
          loading: false
        }
    
      default:
        return state;
    }
  }
  export default postReducer;
