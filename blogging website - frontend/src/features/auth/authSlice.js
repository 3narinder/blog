import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, googleAuth } from "./authApi";
import { lookInSession, storeSession } from "../../common/session";

const storedUser = lookInSession("user")
  ? JSON.parse(lookInSession("user"))
  : null;

const initialState = {
  user: storedUser,
  status: "idle", // idle, loading, succeeded, failed
  error: null,
};

export const login = createAsyncThunk("auth/login", async (formData) => {
  const response = await loginUser(formData);
  storeSession("user", JSON.stringify(response));
  return response;
});

export const signup = createAsyncThunk("auth/signup", async (formData) => {
  const response = await registerUser(formData);
  storeSession("user", JSON.stringify(response));
  return response;
});

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (formData) => {
    const response = await googleAuth(formData);
    storeSession("user", JSON.stringify(response));
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logoutUser(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Google Login
      .addCase(googleLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
