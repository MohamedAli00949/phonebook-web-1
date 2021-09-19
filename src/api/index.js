import axios from "axios";

const API = axios.create({ baseURL: 'https://phonebook-be.herokuapp.com/api' })

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');

    if(token) {
        req.headers.Authorization = `${JSON.parse(token)}`;
    };

    return req;
});

export const signUp = (formData) => API.post('/register', formData);
export const signIn = (formData) => API.post('/login', formData);
