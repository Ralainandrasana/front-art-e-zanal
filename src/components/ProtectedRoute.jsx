// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/useAuth.jsx";

export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();

  if (user === null) return <div>Chargement...</div>; // loader tant que user non défini

  if (!user) return <Navigate to="/SignIn" replace />;

  if (roles && !roles.includes(user.role)) return <Navigate to="/SignIn" replace />;

  return children;
}
