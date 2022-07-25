import { CATEGORY_REQUEST, CATEGORY_SUCCESS, CATEGORY_FAIL } from "./category.type";

export const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_REQUEST:
      return { ...state, loading: true };

    case CATEGORY_SUCCESS:
      return { ...state, loading: false, categories: action.payload };

    case CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
