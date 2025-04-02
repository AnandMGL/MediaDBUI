import { userTypes } from "../constants/action-types";
import { myReducerPersist } from "../store/managerLocalStorage";

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SET_USER:
      return action.data;
    case userTypes.REMOVE_USER:
      return initialState;
    default:
      return state;
  }
};

export default myReducerPersist({ key: "user" }, userReducer);
