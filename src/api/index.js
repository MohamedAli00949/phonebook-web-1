import axios from "axios";

const API = axios.create({ baseURL: 'https://phonebook-be.herokuapp.com/api' })

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');

    if(token) {
        req.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
    };

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