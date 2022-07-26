import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "./user.types";

const INITIAL_STATE = {};

if (localStorage.getItem("userData")) {
  INITIAL_STATE["userData"] = JSON.parse(localStorage.getItem("userData"));
}

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };

    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userData: action.payload };

    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_LOGOUT_SUCCESS:
      return { ...state, loading: false, userData: null };

    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };

    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userData: action.payload };

    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
