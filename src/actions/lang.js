import { CHANGE_LANG } from "../constants/action-types";

export const setMainLang = (data) => (dispatch) => {
  dispatch({
    type: CHANGE_LANG,
    data: data,
  });
};
