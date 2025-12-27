import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppTopBar from "./AppTopbar";

const AppLayout = () => {
  return (
    <Box>
      <AppTopBar />
      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
