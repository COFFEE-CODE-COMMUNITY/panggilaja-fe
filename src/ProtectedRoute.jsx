import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";

export function ProtectedRoute({ children }) {
  const token = useAuthStore((state) => state.accessToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export const HomeRoute = ({ children }) => {
  const token = useAuthStore((state) => state.accessToken);

  if (!token) {
    return <Navigate to="/about" replace />;
  }

  return children;
};

export const GuestRoute = ({ children }) => {
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (token) {
      toast.info("Anda sudah login", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  }, [token]);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};
