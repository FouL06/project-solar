import { configureStore } from "@reduxjs/toolkit";
import systemStatusReducer from "./features/systemStatusSlice";
import systemInfoReducer from "./features/systemInfoSlice";
import systemInventoryReducer from "./features/systemInventorySlice";

export default configureStore({
  reducer: {
    systemStatus: systemStatusReducer,
    systemInfo: systemInfoReducer,
    systemInventory: systemInventoryReducer,
  },
});
