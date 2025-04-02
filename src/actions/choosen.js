import { SET_CHOOSEN } from "../constants/action-types";

export const addToChoosen = (question) => (dispatch) => {
  dispatch({
    type: SET_CHOOSEN,
    question,
  });
};
