import axios from "axios";
import { BACK_URL } from "../../config/key";

import {
  POSTS_REQUEST,
  POSTS_SUCCESS,
  POSTS_FAIL,
  SINGLEPOST_REQUEST,
  SINGLEPOST_SUCCESS,
  SINGLEPOST_FAIL,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAIL,
  ADDPOSTS_REQUEST,
  ADDPOSTS_SUCCESS,
  ADDPOSTS_FAIL,
} from "./post.type";

// All posts

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POSTS_REQUEST });

    const { data } = await axios.get(`${BACK_URL}/blogpost/list`);
    dispatch({ type: POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POSTS_FAIL, payload: error?.response?.data?.msg || error?.msg });
  }
};

//get single post on click

export const getSinglePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLEPOST_REQUEST });
    const { data } = await axios.get(`${BACK_URL}/blogpost/singlepost/${id}`);

    dispatch({ type: SINGLEPOST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SINGLEPOST_FAIL, payload: error?.response?.data?.msg || error?.msg });
  }
};

//add post
export const addPost = (body) => async (dispatch) => {
  try {
    dispatch({ type: ADDPOSTS_REQUEST });

    const { data } = await axios.post(`${BACK_URL}/blogpost/create`, body);
    dispatch({ type: ADDPOSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADDPOSTS_FAIL, error: error?.response?.data?.msg || error?.msg });
  }
};

// delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REQUEST });

    const { data } = await axios.delete(`${BACK_URL}/blogpost/delete/${id}`);

    dispatch({ type: DELETE_SUCCESS, payload: data });
    window.location.reload();
  } catch (error) {
    dispatch({ type: DELETE_FAIL, error: error?.response?.data?.msg || error?.msg });
  }
};
