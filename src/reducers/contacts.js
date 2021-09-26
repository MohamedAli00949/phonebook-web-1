import { FETCH_CONTACTS, CREATE_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, ERROR } from '../actions/contacts';

const contacts = (state = { contacts: [] }, action) => {
    switch (action.type) {
        case FETCH_CONTACTS:
            return {
                ...state,
                contacts: action.data
            };
        case CREATE_CONTACT: 
            return {
                ...state,
                contacts: [ ...state.contacts, action.data ]
            };
        case DELETE_CONTACT: 
            return {
                ...state,
                contacts: state.contacts.filter((contact) => contact.id !== action.data.deleted_id)
            };
        case UPDATE_CONTACT : 
            return {
                ...state,
                contacts : state.contacts.map((contact) => (contact.id === action.data.id ? action.data : contact))
            };
        case ERROR : 
            alert(action?.data?.message);

            return {
                ...state,
                contacts: action?.contacts,
            }
        default:
            return state;
    }
};

export default contacts;