import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetches current system account information from back-end server
export const fetchSystemInfo = createAsyncThunk(
  "system/fetchSystemInfo",
  async () => {
    const response = await fetch("http://localhost:5001/api/systems");
    if (!response.ok) {
      throw new Error("Network response returned an error.");
    }
    const data = await response.json();
    return data;
  }
);

const systemInfoSlice = createSlice({
  name: "systemInfo",
  initialState: {
    systems: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSystemInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.systems = action.payload.systems;
      })
      .addCase(fetchSystemInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default systemInfoSlice.reducer;
