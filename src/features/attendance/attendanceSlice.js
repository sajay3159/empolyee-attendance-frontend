import { createSlice } from "@reduxjs/toolkit";
import { fetchAttendanceThunk } from "./attendanceThunk";

const initialState = {
  list: [],
  loading: false,
  error: null,
  filters: {
    date: "",
    status: "",
    search: "",
  },
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters(state) {
      state.filters = { date: "", status: "", search: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendanceThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAttendanceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAttendanceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters } = attendanceSlice.actions;
export default attendanceSlice.reducer;
