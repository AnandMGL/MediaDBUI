import { CHANGE_THEME } from "../constants/action-types";

export const setTheme = (data) => (dispatch) => {
  dispatch({
    type: CHANGE_THEME,
    data: data,
  });
};
