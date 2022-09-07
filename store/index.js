import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import app from "./app";

const rootReducer = combineReducers({
  app,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
