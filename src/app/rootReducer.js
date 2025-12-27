import authReducer from "../features/auth/authSlice";
import attendanceReducer from "../features/attendance/attendanceSlice";
import analyticsReducer from "../features/analytics/analyticsSlice";
import employeeAttendanceReducer from "../features/employeeAttendance/employeeSlice";

const rootReducer = {
  auth: authReducer,
  attendance: attendanceReducer,
  analytics: analyticsReducer,
  employeeAttendance: employeeAttendanceReducer,
};

export default rootReducer;
