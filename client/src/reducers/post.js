const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
  };

  function postReducer(state = initialState, action) {
    const {type, payload} = action

    switch (type) {
      case "value":
        
        break;
    
      default:
        return state;
    }
  }

  export default postReducer