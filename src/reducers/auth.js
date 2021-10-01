import { AUTH, AUTH_ERROR, LOGOUT } from "../actions/auth";

const auth = (state = { authData: null, error: null }, action) => {
    switch (action.type) {
        case AUTH: 
            localStorage.setItem('token', JSON.stringify({ ...action?.data }));
            localStorage.removeItem('error');

            return { ...state, authData: action?.authData, error: null };
        case LOGOUT: 
            localStorage.clear();

            return { ...state, authData: null, error: null };
        case AUTH_ERROR: 
            localStorage.setItem('error', JSON.stringify({ ...action?.data }));

            return { ...state, authData: action?.authData, error: action?.data  };
        default: 
            return state;
    }
}

export default auth;