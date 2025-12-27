import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Attendance from "../pages/Attendance";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AppLayout from "../components/layout/AppLayout";
import EmployeeAttendance from "../pages/EmployeeAttendance";
import AddEmployee from "../pages/AddEmployee";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute roles={["admin"]}>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
      </Route>
      <Route
        path="/employee"
        element={
          <ProtectedRoute roles={["employee"]}>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<EmployeeAttendance />} />
      </Route>

      <Route
        path="/add-employee"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AddEmployee />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
