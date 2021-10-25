import * as api from "../api/index";
import { START_LOADING, END_LOADING } from "./contacts";

export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT";
export const AUTH_ERROR = "AUTH_ERROR";

export const authForm = (formData, history, authType) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    if (authType === "signup") {
      const { data } = await api.signUp(formData);
      dispatch({ type: AUTH, data });
    } else {
      const { data } = await api.signIn(formData);
      dispatch({ type: AUTH, data });
    }

    dispatch({ type: END_LOADING });

    history.push("/");
    console.log("success");
  } catch (error) {
    const authError = error.response?.data;

    dispatch({ type: END_LOADING });
    if (authError) {
      dispatch({ type: AUTH_ERROR, data: authError });
    } else {
      dispatch({
        type: AUTH_ERROR,
        data: { message: "Login error, please try again" },
      });
    }
  }
};
