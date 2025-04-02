import { CHANGE_LANG } from "../constants/action-types";
import { myReducerPersist } from "../store/managerLocalStorage";

const langReducer = (state = "uz", action) => {
  switch (action.type) {
    case CHANGE_LANG:
      return action.data;
    default:
      return state;
  }
};

export default myReducerPersist({ key: "lang" }, langReducer);
