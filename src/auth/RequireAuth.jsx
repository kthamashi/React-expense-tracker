import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";

export default function RequireAuth({ children }) {
  const { user, isStateLoading } = useAuthContext();
  let location = useLocation();
  if (isStateLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isOnAdminRoute = location.pathname.includes("/admin");

  if (isOnAdminRoute) {
    if (user.role === "admin") {
      return children;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
