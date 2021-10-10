import * as api from '../api/index';

export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';
export const AUTH_ERROR = 'AUTH_ERROR';

export const authForm = (formData, history, authType) => async (dispatch) => {
    try {
        if (authType === 'signup') {
            const { data } = await api.signUp(formData);
            dispatch({ type: AUTH, data })
        } else {
            const { data } = await api.signIn(formData);
            dispatch({ type: AUTH, data });
        }

        history.push('/')
        console.log('success');
    } catch (error) {
        const authError = error.response?.data;

        if (authError) {
            dispatch({ type: AUTH_ERROR, data: authError });
        } else {
            dispatch({ type: AUTH_ERROR, data: { message: 'Login error, please try again' } });
        }

    }
}