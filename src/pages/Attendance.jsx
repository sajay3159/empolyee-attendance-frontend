import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  TextField,
  MenuItem,
  Grid,
  CircularProgress,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";

import { setFilters } from "../features/attendance/attendanceSlice";
import { fetchAttendanceThunk } from "../features/attendance/attendanceThunk";

const Attendance = () => {
  const dispatch = useDispatch();
  const { list, loading, filters } = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(fetchAttendanceThunk());
  }, [dispatch, filters]);

  const columns = [
    {
      field: "employee",
      headerName: "Employee",
      flex: 1,
      valueGetter: (params) => params.row.employee.name,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "punchIn",
      headerName: "Punch In",
      flex: 1,
      valueGetter: (params) => dayjs(params.row.punchIn).format("HH:mm"),
    },
    {
      field: "punchOut",
      headerName: "Punch Out",
      flex: 1,
      valueGetter: (params) =>
        params.row.punchOut ? dayjs(params.row.punchOut).format("HH:mm") : "-",
    },
    {
      field: "totalWorkedHours",
      headerName: "Hours",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Attendance
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={4}>
          <TextField
            type="date"
            fullWidth
            label="Date"
            InputLabelProps={{ shrink: true }}
            value={filters.date}
            onChange={(e) => dispatch(setFilters({ date: e.target.value }))}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            select
            fullWidth
            label="Status"
            value={filters.status}
            onChange={(e) => dispatch(setFilters({ status: e.target.value }))}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="early">Early</MenuItem>
            <MenuItem value="on-time">On-Time</MenuItem>
            <MenuItem value="late">Late</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search Employee"
            value={filters.search}
            onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
          />
        </Grid>
      </Grid>

      {/* Table */}
      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={list}
          columns={columns}
          getRowId={(row) => row._id}
          autoHeight
          pageSize={10}
        />
      )}
    </Box>
  );
};

export default Attendance;
