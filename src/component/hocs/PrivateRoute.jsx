import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ children, isAllowed, redirectTo }) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  return children || <Outlet />;
}
