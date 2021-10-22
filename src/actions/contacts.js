import * as api from './../api/index';

export const FETCH_CONTACTS = 'FETCH_CONTACTS';
export const CREATE_CONTACT = 'CREATE_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const CONTACT_ERROR = 'CONTACT_ERROR';
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

export const getContacts = async () => {
    const { data } = await api.getContacts();

    return {
        contacts: data.data
    };
}

export const createContact = async (contact) => {
        const { data } = await api.createContact(contact);

    return { contact: data.data };
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

export const updateContact = async (id, updatedContact) => {
    const { data } = await api.updateContact(id, updatedContact);

    return data;
}
