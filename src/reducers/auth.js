import { AUTH, AUTH_ERROR, LOGOUT } from "../actions/auth";

const auth = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH: 
            localStorage.setItem('token', JSON.stringify({ ...action?.data }));

            return { ...state, authData: action?.authData };
        case LOGOUT: 
            localStorage.clear();

            return { ...state, authData: null };
        case AUTH_ERROR: 
            localStorage.setItem('error', JSON.stringify({ ...action?.data }));

            return { ...state, authData: action?.authData };
        default: 
            return state;
    }
}

export default auth;