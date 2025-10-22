import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ redirectTo = "/login" }) {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to={redirectTo} replace />;
}
