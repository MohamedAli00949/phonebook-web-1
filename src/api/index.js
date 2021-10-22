import axios from "axios";
// import decode from 'jwt-decode';

const API = axios.create({ baseURL: 'https://phonebook-be.herokuapp.com/api' });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    // let validToken;
    // const decodedToken = decode(JSON.parse(token).token);

    // if(decodedToken.exp < new Date().getTime()) {
    //     alert('Invalid token, please try login again');
    // } else {
    //     req.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
    // }
    // jwt.verify(JSON.parse(token).token, 'shhhhh', (error, decode) => {
    //     if (error) {
    //         alert("lagin again go to '/auth'");
    //         localStorage.removeItem('token');
    //         validToken = false;
    //             // err = {
    //             // name: 'TokenExpiredError',
    //             // message: 'jwt expired',
    //             // expiredAt: 1408621000
    //             // }
    //     }
    // });

    if(token) {
        req.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
    }

    return req;
});

export const signUp = (formData) => API.post('/register', formData);
export const signIn = (formData) => API.post('/login', formData);


export const getContacts = () => API.get('/contacts');
export const createContact = (contact) => API.post('/contacts', contact);
export const deleteContact = (id) => API.delete(`/contacts/${id}`);
export const updateContact = (id, contact) => API.patch(`/contacts/${id}`, contact);

export const createPhone = (phone) => API.post('/phones', phone);
export const updatePhone = (id, phone) => API.patch(`/phones/${id}`, phone);
export const deletePhone = (id) => API.delete(`/phones/${id}`);

export const getTypes = () => API.get('/types');