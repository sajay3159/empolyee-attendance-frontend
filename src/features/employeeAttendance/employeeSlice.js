import { createSlice } from "@reduxjs/toolkit";
import { punchInThunk, punchOutThunk } from "./employeeThunk";

const initialState = {
  today: null,
  loading: false,
  error: null,
};

const employeeAttendanceSlice = createSlice({
  name: "employeeAttendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(punchInThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(punchInThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.today = action.payload;
      })
      .addCase(punchInThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(punchOutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(punchOutThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.today = action.payload;
      })
      .addCase(punchOutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeAttendanceSlice.reducer;
