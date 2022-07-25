import { combineReducers } from "redux";
import { categoryReducer } from "./category/category.reducer";
import { postsReducer } from "./posts/post.reducer";

const rootReducer = combineReducers({
  postsState: postsReducer,
  categoryState: categoryReducer,
});

export default rootReducer;
