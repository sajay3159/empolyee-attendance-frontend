import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AppLayout from "../components/layout/AppLayout";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Attendance = lazy(() => import("../pages/Attendance"));
const EmployeeAttendance = lazy(() => import("../pages/EmployeeAttendance"));
const AddEmployee = lazy(() => import("../pages/AddEmployee"));

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
};

export default AppRouter;
