import { userTypes } from "../constants/action-types";

export const setUserData = (data) => (dispatch) => {
  dispatch({
    type: userTypes.SET_USER,
    data: data,
  });
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: userTypes.REMOVE_USER,
  });
};
