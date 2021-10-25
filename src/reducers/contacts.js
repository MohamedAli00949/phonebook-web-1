import {
  FETCH_CONTACTS,
  CREATE_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  CONTACT_ERROR,
  START_LOADING,
  END_LOADING,
} from "../actions/contacts";
import { LOGOUT } from "../actions/auth";

const contacts = (state = { isLoading: true, contacts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_CONTACTS:
      return {
        ...state,
        contacts: action.data,
      };
    case CREATE_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.data],
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.data.deleted_id
        ),
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.data.data.id ? action.data.data : contact
        ),
      };
    case CONTACT_ERROR:
      alert(action?.data?.message);

      return {
        ...state,
        contacts: action?.contacts,
      };
    case LOGOUT:
      return {
        ...state,
        contacts: [],
      };
    default:
      return state;
  }
};

export default contacts;