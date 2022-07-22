import {
  POSTS_REQUEST,
  POSTS_SUCCESS,
  POSTS_FAIL,
  SINGLEPOST_REQUEST,
  SINGLEPOST_SUCCESS,
  SINGLEPOST_FAIL,
} from "./post.type";

export const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return { ...state, loading: true };

    case POSTS_SUCCESS:
      return { ...state, loading: false, posts: action.payload };

    case POSTS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case SINGLEPOST_REQUEST:
      return { ...state, loading: true };

    case SINGLEPOST_SUCCESS:
      return { ...state, loading: false, singlePost: action.payload };

    case SINGLEPOST_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
