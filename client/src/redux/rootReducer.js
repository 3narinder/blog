import { combineReducers } from "redux";
import { categoryReducer } from "./category/category.reducer";
import { postsReducer } from "./posts/post.reducer";
import { userReducer } from "./user/user.reducer";

const rootReducer = combineReducers({
  postsState: postsReducer,
  categoryState: categoryReducer,
  userState: userReducer,
});

export default rootReducer;
