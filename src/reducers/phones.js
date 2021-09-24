import { ERROR } from '../actions/contacts';
import { CREATE_PHONE, UPDATE_PHONE, DELETE_PHONE, GET_TYPES } from '../actions/phones';

const phones = (state = { phones: [], types: []}, action) => {
    switch (action.type) {
        case GET_TYPES:
            return {
                ...state,
                types: action.data,
            };
        case CREATE_PHONE: 
            return {
                ...state,
                phones: [...state.phones, action.data]
            };
        case UPDATE_PHONE:
            return {
                ...state,
                phones: state.phones.map((phone) => (phone.id === action.data.id ? action.data : phone))
            };
        case DELETE_PHONE : 
            return {
                ...state,
                phones: action.data,
            }
        case ERROR :
            alert(action.data.message);

            return {
                ...state,
                phones: action?.phones, 
                types: action?.types
            };
        default:
            return state;
    }
};

export default phones;



