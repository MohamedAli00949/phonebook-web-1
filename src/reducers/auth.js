import { AUTH, AUTH_ERROR, LOGOUT } from "../actions/auth";
import { START_LOADING, END_LOADING } from "../actions/contacts";

const auth = (
  state = { authData: null, error: null, isLoading: null },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      // localStorage.removeItem('error');
      return { ...state, isLoading: true };
    case END_LOADING:
      // localStorage.removeItem('error');
      return { ...state, isLoading: false };
    case AUTH:
      localStorage.setItem("token", JSON.stringify({ ...action?.data }));
      localStorage.removeItem("error");

      return { ...state, authData: action?.authData, error: null };
    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, error: null };
    case AUTH_ERROR:
      localStorage.setItem("error", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action?.authData, error: action?.data };
    default:
      return state;
  }
};

export default auth;
