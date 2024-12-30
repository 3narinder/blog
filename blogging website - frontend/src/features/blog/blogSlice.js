import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: {
    title: "",
    banner: "",
    content: [],
    tags: [],
    des: "",
    author: { personal_info: {} },
  },
  editorState: "editor",
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog(state, action) {
      state.blog = { ...state.blog, ...action.payload };
    },
    setEditorState(state, action) {
      state.editorState = action.payload;
    },
    resetBlog(state) {
      state.blog = initialState.blog;
    },
  },
});

export const { setBlog, setEditorState, resetBlog, setTextEditor } =
  blogSlice.actions;
export default blogSlice.reducer;
