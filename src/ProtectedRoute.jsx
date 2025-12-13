import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { selectCurrentUser } from "./features/authSlice";

export function ProtectedRoute({ children }) {
  const user = useSelector(selectCurrentUser);

  // ✅ User ada → render layout & halaman
  return children;
}

export const HomeRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.accessToken);

  if (!token) {
    return <Navigate to="/about" replace />;
  }

  return children;
};

export const GuestRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.accessToken);

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
