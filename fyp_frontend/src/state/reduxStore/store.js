import { configureStore, combineReducers } from "@reduxjs/toolkit";
import accountReducer from "../reduxStateSlices/accountSlice";
import loginReducer from "../reduxStateSlices/login_pageSlice";
import tokenReducer from "../reduxStateSlices/tokenSlice";
import lecturerReducer from "../reduxStateSlices/lecturer_detailsSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["lecturer"],
};

const combinedReducers = combineReducers({
  account: accountReducer,
  login: loginReducer,
  token: tokenReducer,
  lecturer: lecturerReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
