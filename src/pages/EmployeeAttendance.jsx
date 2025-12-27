import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";

import {
  punchInThunk,
  punchOutThunk,
} from "../features/employeeAttendance/employeeThunk";

const EmployeeAttendance = () => {
  const dispatch = useDispatch();
  const { today, loading, error } = useSelector(
    (state) => state.employeeAttendance
  );

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Today Attendance
          </Typography>

          {error && <Typography color="error">{error}</Typography>}

          {today && (
            <>
              <Typography>Status: {today.status}</Typography>
              <Typography>
                Punch In: {new Date(today.punchIn).toLocaleTimeString()}
              </Typography>
              {today.punchOut && (
                <Typography>
                  Punch Out: {new Date(today.punchOut).toLocaleTimeString()}
                </Typography>
              )}
            </>
          )}

          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {!today?.punchIn && (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => dispatch(punchInThunk())}
                >
                  Punch In
                </Button>
              )}

              {today?.punchIn && !today?.punchOut && (
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => dispatch(punchOutThunk())}
                >
                  Punch Out
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployeeAttendance;
