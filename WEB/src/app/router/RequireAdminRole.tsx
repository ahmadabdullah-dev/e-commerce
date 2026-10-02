import { Navigate, Outlet, useLocation } from "react-router";
import { useCurrentUser } from "../../lib/hooks/useUser";

const ALLOWED_ROLES = ["Admin"];

export default function RequireAdminRole() {
  const currentUser = useCurrentUser();
  const location = useLocation();

  if (currentUser.isLoading) {
    return <div>Loading...</div>;
  }

  const role = currentUser.data?.role;

  if (currentUser.isError || !role || !ALLOWED_ROLES.includes(role)) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <Outlet />;
}