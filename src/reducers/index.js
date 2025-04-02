import { combineReducers } from "redux";

import userReducer from "./user";
import theme from "./theme";
import lang from "./lang";
import choosen from "./choosen";

const rootReducer = combineReducers({
  user: userReducer,
  theme: theme,
  lang: lang,
  choosenList: choosen,
});

export default rootReducer;
