import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import departmetReducer from "./departments/departmentSlice";
import employeeReducer from "./employees/employeeSlice"
import accountReducer from "./accounts/accountSlice"
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    departments:departmetReducer,
    employees:employeeReducer,
    accounts:accountReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
