import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTodayAttendanceThunk,
  punchInThunk,
  punchOutThunk,
} from "./employeeThunk";
import { logoutThunk } from "../auth/authThunk";

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

    builder
      .addCase(fetchTodayAttendanceThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodayAttendanceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.today = action.payload;
      })
      .addCase(fetchTodayAttendanceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.today = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export default employeeAttendanceSlice.reducer;
