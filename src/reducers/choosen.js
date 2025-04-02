import { SET_CHOOSEN } from "../constants/action-types";
import { myReducerPersist } from "../store/managerLocalStorage";

const choosenReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CHOOSEN:
      if (state.find((q) => q.id === action.question.id)) {
        return [...state.filter((q) => q.id !== action.question.id)];
      } else {
        return [...state, action.question];
      }
    default:
      return state;
  }
};

export default myReducerPersist(
  {
    key: "choosenList",
  },
  choosenReducer
);
