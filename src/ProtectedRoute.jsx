import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

// 🧱 Protected Route - halaman yang butuh login
export const ProtectedRoute = ({ children }) => {
  const { accessToken, user, status } = useSelector((state) => state.auth);
  const location = useLocation();

  console.log("🔒 ProtectedRoute - Checking auth for:", location.pathname);
  console.log("Token exists:", !!accessToken);
  console.log("User object exists:", !!user);
  console.log("Auth Status:", status);

  if (status === "loading") {
    console.log("⏳ Auth status is 'loading'. Waiting...");
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Loading User Data...</h1>
      </div>
    );
  }

  if (accessToken && user) {
    console.log("✅ Token and User found, rendering protected content");
    return children;
  }

  console.log("❌ Access Denied. Redirecting to /login");

  if (location.pathname !== "/login") {
    toast.error("Anda harus login terlebih dahulu", {
      position: "top-center",
      autoClose: 3000,
    });
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

// 🏠 Home Route - landing page bisa diakses tapi redirect ke /about kalau belum login
export const HomeRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.accessToken);
  const location = useLocation();

  console.log("🏠 HomeRoute - Checking auth");
  console.log("Token exists:", !!token);

  useEffect(() => {
    if (!token) {
      toast.info("Silakan login untuk mengakses halaman utama", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }, [token]);

  if (!token) {
    console.log("👋 Not logged in, redirecting to /about");
    return <Navigate to="/about" state={{ from: location }} replace />;
  }

  console.log("✅ Logged in, showing home page");
  return children;
};

// 👤 Guest Route - untuk halaman login/register (tidak boleh diakses jika sudah login)
export const GuestRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.accessToken);

  console.log("👤 GuestRoute - Checking auth");
  console.log("Token exists:", !!token);

  useEffect(() => {
    if (token) {
      toast.info("Anda sudah login", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  }, [token]);

  if (token) {
    console.log("✅ Already logged in, redirecting to home");
    return <Navigate to="/" replace />;
  }

  console.log("👋 Not logged in, showing guest page");
  return children;
};
