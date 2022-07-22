import axios from "axios";
import { BACK_URL } from "../../config/key";

import {
  POSTS_REQUEST,
  POSTS_SUCCESS,
  POSTS_FAIL,
  SINGLEPOST_REQUEST,
  SINGLEPOST_SUCCESS,
  SINGLEPOST_FAIL,
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
