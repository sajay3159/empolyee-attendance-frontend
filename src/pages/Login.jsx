import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../features/auth/authThunk";
import {
  Button,
  TextField,
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
    email: "admin@test.com",
    password: "admin123",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginThunk(form));
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === "admin" ? "/" : "/employee", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Image */}
      <Grid
        item
        xs={false}
        md={8}
        sx={{
          backgroundImage: "url(/login-bg.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Login form */}
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
