import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../reduxStateSlices/accountSlice";
import loginReducer from "../reduxStateSlices/login_pageSlice";
import tokenReducer from "../reduxStateSlices/tokenSlice";
import lecturerReducer from "../reduxStateSlices/lecturer_detailsSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    login: loginReducer,
    token: tokenReducer,
    lecturer: lecturerReducer,
  },
});

export default store;
