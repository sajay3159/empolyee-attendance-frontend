import { createSlice } from "@reduxjs/toolkit";
import { fetchMonthlyReportThunk } from "./reportThunk";
import dayjs from "dayjs";

const initialState = {
  list: [],
  loading: false,
  month: dayjs().format("YYYY-MM"),
  error: null,
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setMonth: (state, action) => {
      state.month = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlyReportThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMonthlyReportThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMonthlyReportThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setMonth } = reportSlice.actions;
export default reportSlice.reducer;
