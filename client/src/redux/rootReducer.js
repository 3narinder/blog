import { combineReducers } from "redux";
import { postsReducer } from "./posts/post.reducer";

const rootReducer = combineReducers({
  postsState: postsReducer,
});

export default rootReducer;
