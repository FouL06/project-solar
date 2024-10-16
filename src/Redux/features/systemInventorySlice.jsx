import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSystemInventory = createAsyncThunk(
  "system/fetchSystemInventory",
  async () => {
    const response = await fetch("http://localhost:5001/api/inventory");
    if (!response.ok) {
      throw new Error("Could not retrieve system inventory...");
    }

    const data = await response.json();
    return data;
  }
);

const systemInventorySlice = createSlice({
  name: "systemInventory",
  initialState: {
    systemId: 0,
    envoys: [],
    inverters: [],
    meters: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSystemInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.systemId = action.payload.system_id;
        state.envoys = [...action.payload.envoys];
        state.inverters = [...action.payload.inverters];
        state.meters = [...action.payload.meters];
      })
      .addCase(fetchSystemInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default systemInventorySlice.reducer;
