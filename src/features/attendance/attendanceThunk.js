import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchAttendanceThunk = createAsyncThunk(
  "attendance/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters } = getState().attendance;

      const params = {};
      if (filters.date) params.date = filters.date;
      if (filters.status) params.status = filters.status;
      if (filters.search) params.search = filters.search;

      const res = await api.get("/attendance", { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch attendance"
      );
    }
  }
);
