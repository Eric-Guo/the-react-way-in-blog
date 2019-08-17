import { combineReducers } from "redux";
import app from "./app";

// 合并所有模块的reducer成一个根reducer
const rootReducer = combineReducers({
  app
});

export default rootReducer;
