import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, Typography, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchMonthlyReportThunk } from "../features/report/reportThunk";
import { setMonth } from "../features/report/reportSlice";

const Reports = () => {
  const dispatch = useDispatch();
  const { list, loading, month } = useSelector((state) => state.report);

  useEffect(() => {
    if (month) {
      dispatch(fetchMonthlyReportThunk(month));
    }
  }, [month, dispatch]);

  const columns = [
    {
      field: "serial",
      headerName: "S.No.",
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
      field: "employeeName",
      headerName: "Employee",
      flex: 1,
    },
    {
      field: "presentDays",
      headerName: "Present",
      flex: 1,
    },
    {
      field: "absentDays",
      headerName: "Absent",
      flex: 1,
    },
    {
      field: "lateDays",
      headerName: "Late",
      flex: 1,
    },
    {
      field: "totalWorkedHours",
      headerName: "Worked Hours",
      flex: 1,
    },
    {
      field: "overtimeHours",
      headerName: "Overtime",
      flex: 1,
    },
  ];

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Monthly Report
      </Typography>

      <TextField
        type="month"
        label="Select Month"
        InputLabelProps={{ shrink: true }}
        value={month}
        onChange={(e) => dispatch(setMonth(e.target.value))}
        sx={{ mb: 2 }}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={list}
          columns={columns}
          getRowId={(row) => row._id}
          autoHeight
          pageSizeOptions={[10]}
        />
      )}
    </Box>
  );
};

export default Reports;
