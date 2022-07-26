import axios from "axios";
import { BACK_URL } from "../../config/key";

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "./user.types";

//login
export const loginUser = (body) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post(`${BACK_URL}/user/login`, body, {});

    localStorage.setItem("userData", JSON.stringify(data));
    dispatch({ type: USER_LOGIN_SUCCESS, payLoad: data });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error?.response?.data?.msg || error?.msg });
  }
};

export const registerUser = (body) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await axios.post(`${BACK_URL}/user/register`, body, {});

    localStorage.setItem("userData", JSON.stringify(data));

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error?.response?.data?.msg || error?.msg });
  }
};

export const logoutUser = (body) => async (dispatch) => {
  localStorage.removeItem("userData");
  dispatch({ type: USER_LOGOUT_SUCCESS });

  window.location.replace("/login");
};
