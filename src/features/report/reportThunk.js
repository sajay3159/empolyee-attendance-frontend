import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchMonthlyReportThunk = createAsyncThunk(
  "report/fetchMonthly",
  async (month, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/attendance/monthly-report?month=${month}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);
