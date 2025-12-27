import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const punchInThunk = createAsyncThunk(
  "employee/punchIn",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/attendance/punch-in");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Punch-in failed");
    }
  }
);

export const punchOutThunk = createAsyncThunk(
  "employee/punchOut",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/attendance/punch-out");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Punch-out failed");
    }
  }
);
