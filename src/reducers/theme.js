import { CHANGE_THEME } from "../constants/action-types";
import { myReducerPersist } from "../store/managerLocalStorage";

const themeReducer = (state = "light", action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return action.data;
    default:
      return state;
  }
};

export default myReducerPersist({ key: "theme" }, themeReducer);
