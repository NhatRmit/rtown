import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_UPVOTE,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  EDIT_POST,
  GET_POST,
  EDIT_COMMENT,
  CLEAR_POST,
  CHECK_OUT,
  DISPLAY_IMAGE,
  CLEAR_COMMENT,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case GET_POST:
    case CHECK_OUT:
      return {
        ...state,
        post: payload,
        loading: false
      }
    case ADD_POST:
    case DISPLAY_IMAGE:

      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case EDIT_POST:
    // case EDIT_COMMENT:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_UPVOTE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, upvotes: payload.upvotes } : post
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        post: payload
      }
    case CLEAR_POST:
      return {
        ...state,
        loading: false,
        post: null,
      }
    default:
      return state;
  }
}
export default postReducer;