import { Navigate, Outlet, useLocation } from "react-router";
import { useCurrentUser } from "../../lib/hooks/useUser";

export default function RequireConfirmedEmail() {
  const currentUser = useCurrentUser();
  const location = useLocation();

  if (currentUser.isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser.data?.isEmailConfirmed) {
    return <Navigate to="/confirm-email" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
