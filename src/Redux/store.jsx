import { configureStore } from "@reduxjs/toolkit";
import systemStatusReducer from "./features/systemStatusSlice";
import systemInfoReducer from "./features/systemInfoSlice";

export default configureStore({
  reducer: {
    systemStatus: systemStatusReducer,
    systemInfo: systemInfoReducer,
  },
});
