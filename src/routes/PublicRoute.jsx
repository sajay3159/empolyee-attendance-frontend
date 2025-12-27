import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated && user) {
    return <Navigate to={user.role === "admin" ? "/" : "/employee"} replace />;
  }

  return children;
};

export default PublicRoute;
