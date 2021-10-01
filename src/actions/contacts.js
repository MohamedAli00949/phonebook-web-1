import * as api from './../api/index';

export const FETCH_CONTACTS = 'FETCH_CONTACTS';
export const CREATE_CONTACT = 'CREATE_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const CONTACT_ERROR = 'CONTACT_ERROR';
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

export const getContacts = () => async (dispatch) => {
    try{
        dispatch({ type: START_LOADING });
        
        const { data } = await api.getContacts();
        
        dispatch({ type: FETCH_CONTACTS, data : data.data });
        
        dispatch({ type: END_LOADING });
    } catch(error) {
        console.error(error);
        dispatch({ type: CONTACT_ERROR, data: error.response?.data });
    }
};

export const createContact = (contact) => async (dispatch) => {
    try {
        const { data } = await api.createContact(contact);

        dispatch({ type: CREATE_CONTACT, data });
    } catch (error) {
        console.error(error);
        dispatch({ type: CONTACT_ERROR, data: error.response?.data });
    }
};

export const deleteContact = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteContact(id);

        dispatch({ type: DELETE_CONTACT, data });
    } catch (error) {
        console.error(error);
        dispatch({ type: CONTACT_ERROR, data: error.response?.data });
    }
};

export const updateContact = (id, updatedContact) => async (dispatch) => {
    try {
        const { data } = await api.updateContact(id, updatedContact);

        dispatch({ type: UPDATE_CONTACT, data });
    } catch (error) {
        console.error(error);
        dispatch({ type: CONTACT_ERROR, data: error.response.data });
    }
}
