import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalyticsThunk } from "../features/analytics/analyticsThunk";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../features/attendance/attendanceSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading, error } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalyticsThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!data) return null;

  const cards = [
    { label: "Total Employees", value: data.totalEmployees },
    { label: "Present Today", value: data.presentToday },
    { label: "On-Time", value: data.onTimeCount },
    { label: "Late", value: data.lateCount },
    { label: "Attendance Rate (%)", value: data.attendanceRate },
  ];

  return (
    <>
      <Typography variant="h5" mb={3}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.label}>
            <Card
              sx={{
                // cursor: "pointer",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.03)" },
              }}
              onClick={() => {
                if (card.label === "Late") {
                  dispatch(setFilters({ status: "late" }));
                  navigate("/attendance");
                }

                if (card.label === "On-Time") {
                  dispatch(setFilters({ status: "on-time" }));
                  navigate("/attendance");
                }
              }}
            >
              {/* <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {card.label}
                </Typography>
                <Typography variant="h4">{card.value}</Typography>
              </CardContent> */}

              <CardContent>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: 12, sm: 14, md: 14 } }}
                >
                  {card.label}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }}
                >
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Dashboard;
