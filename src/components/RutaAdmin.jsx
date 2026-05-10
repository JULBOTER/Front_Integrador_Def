import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function RutaAdmin({ children }) {
  const { adminActivo } = useAdmin();
  if (!adminActivo) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}