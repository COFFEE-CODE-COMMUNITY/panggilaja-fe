import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { selectCurrentUser } from "./features/authSlice"; // Kept if needed elsewhere, but actually it is not used in my new code.
// Wait, I can just remove the line if I want.
// Step 7: replace


export function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.auth.accessToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

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
