import * as api from "./../api/index";

export const CREATE_PHONE = "CREATE_PHONE";
export const UPDATE_PHONE = "UPDATE_PHONE";
export const DELETE_PHONE = "DELETE_PHONE";
export const GET_TYPES = "GET_TYPES";
export const PHONE_ERROR = "PHONE_ERROR";

export const createPhone = async (phone) => {
  const { data } = await api.createPhone(phone);

  return data;
};

export const updatePhone = async (id, phone) => {
  const { data } = await api.updatePhone(id, phone);

  return data;
};

export const deletePhone = async (id) => {
  const { data } = await api.deletePhone(id);

  return data;
};

export const getTypes = () => async (dispatch) => {
  try {
    const { data } = await api.getTypes();

    dispatch({ type: GET_TYPES, data });
  } catch (error) {
    console.error(error);
    dispatch({ type: PHONE_ERROR, data: error.response?.data });
  }
};
