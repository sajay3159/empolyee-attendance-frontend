import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../../features/auth/authThunk";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";

const AppTopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const pages =
    user?.role === "admin"
      ? [
          { label: "Dashboard", path: "/" },
          { label: "Attendance", path: "/attendance" },
          { label: "All Users", path: "/all-users" },
          { label: "Add Employee", path: "/add-employee" },
        ]
      : [{ label: "My Attendance", path: "/employee" }];

  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2b2a2a" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              mr: 2,
              fontWeight: 700,
              letterSpacing: ".2rem",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            ATTENDANCE
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={(e) => setAnchorElNav(e.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => {
                    navigate(page.path);
                    setAnchorElNav(null);
                  }}
                >
                  {page.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                sx={{ color: "white" }}
                onClick={() => navigate(page.path)}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user?.email || "Account"}>
              <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)}>
                <Avatar>{user?.name?.charAt(0)?.toUpperCase()}</Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              <MenuItem
                sx={{
                  pointerEvents: "none",
                  cursor: "default",
                }}
              >
                {user?.name}
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppTopBar;
