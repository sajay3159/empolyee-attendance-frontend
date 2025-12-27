import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../features/auth/authThunk";
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginThunk(form));
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === "admin" ? "/" : "/attendance", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left side image */}
      <Grid
        item
        xs={false}
        md={8}
        sx={{
          backgroundImage:
            'url("https://static.vecteezy.com/system/resources/previews/008/570/352/non_2x/charming-asian-female-office-worker-working-on-a-laptop-computer-and-enjoying-drinking-coffee-in-a-modern-office-free-photo.jpg")',

          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Right side login form */}
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f5f5",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 5,
            width: "80%",
            maxWidth: 400,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
            Login
          </Typography>

          <form onSubmit={submitHandler}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {error && (
              <Typography color="error" mt={1}>
                {error}
              </Typography>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                py: 1.5,
                fontSize: "16px",
                background: "linear-gradient(45deg, #4a90e2, #50e3c2)",
                "&:hover": {
                  background: "linear-gradient(45deg, #357ABD, #3CC5A0)",
                },
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <Typography variant="body2" mt={2} color="gray">
            Forgot your password? Contact admin
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
