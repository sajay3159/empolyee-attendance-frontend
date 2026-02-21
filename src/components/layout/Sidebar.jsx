import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../../features/auth/authThunk";

const drawerWidth = 240;

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutThunk());
    navigate("/login", { replace: true });
  };

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      sx={{
        width: open ? 240 : 70,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: open ? 240 : 70,
          transition: "width 0.3s ease",
          overflowX: "hidden",
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ p: 2 }}>
        <List>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/attendance")}>
            <ListItemText primary="Attendance" />
          </ListItemButton>

          <ListItem button onClick={() => navigate("/all-users")}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="All Users" />
          </ListItem>
        </List>

        <Button
          fullWidth
          variant="outlined"
          color="error"
          sx={{ mt: 4 }}
          onClick={logoutHandler}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
