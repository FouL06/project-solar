import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetches current system status from back-end server
export const fetchSystemStatus = createAsyncThunk(
  "system/fetchSystemStatus",
  async () => {
    const response = await fetch("http://localhost:5001/api/status");

    if (!response.ok) {
      throw new Error("Could not retrieve system status...");
    }

    const data = await response.json();
    return data;
  }
);

// Create systemStatusSlice to be put into Redux store
const systemStatusSlice = createSlice({
  name: "systemStatus",
  initialState: {
    systemId: 0,
    modules: 0,
    sizeW: 0,
    currentPower: 0,
    energyToday: 0,
    energyLifetime: 0,
    summaryDate: "",
    source: "",
    status: "",
    operationalAt: 0,
    lastReportAt: 0,
    lastIntervalEndAt: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemStatus.pending, (state) => {
        state.loading = true;
      }) // If data is currently loading set loading to true
      .addCase(fetchSystemStatus.fulfilled, (state, action) => {
        state.loading = false;
        const _data = action.payload;
        state.systemId = _data.system_id;
        state.modules = _data.modules;
        state.sizeW = _data.size_w;
        state.currentPower = _data.current_power;
        state.energyToday = _data.energy_today;
        state.energyLifetime = _data.energy_lifetime;
        state.summaryDate = _data.summary_date;
        state.source = _data.source;
        state.status = _data.status;
        state.operationalAt = _data.operational_at;
        state.lastReportAt = _data.last_report_at;
        state.lastIntervalEndAt = _data.last_interval_end_at;
      }) // If data has been received populate states
      .addCase(fetchSystemStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }); // If data was unable to be received populate error state
  },
});

export default systemStatusSlice.reducer;
