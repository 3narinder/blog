import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publishBlogApi } from "./blogApi";

const initialState = {
  blog: {
    title: "",
    banner: "",
    content: [],
    tags: [],
    des: "",
    author: { personal_info: {} },
  },
  blogs: [], // For storing all blogs
  editorState: "editor",
  loading: false,
  error: null,
};

export const publishBlog = createAsyncThunk(
  "blog/publishBlog",
  async ({ blogData, accessToken }, { rejectWithValue }) => {
    try {
      const response = await publishBlogApi(blogData, accessToken);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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

  extraReducers: (builder) => {
    builder
      // Publish Blog
      .addCase(publishBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload; // Optionally update the blog in the state
      })

      .addCase(publishBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // .addCase(saveDraft.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(saveDraft.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.blog = action.payload; // Optionally update the blog in the state
    // })
    // .addCase(saveDraft.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });

    // Fetch a single blog by ID
    // .addCase(getBlogById.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(getBlogById.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.blog = action.payload;
    // })
    // .addCase(getBlogById.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });

    // Fetch all blogs
    // .addCase(getAllBlogs.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(getAllBlogs.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.blogs = action.payload;
    // })
    // .addCase(getAllBlogs.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

export const { setBlog, setEditorState, resetBlog } = blogSlice.actions;
export default blogSlice.reducer;
