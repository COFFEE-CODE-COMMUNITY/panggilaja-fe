import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

/*
  PROTECTED ROUTE
  - Hanya bisa diakses kalau user LOGIN
  - Menunggu sampai auth selesai (status !== loading)
*/
export const ProtectedRoute = ({ children }) => {
  const { accessToken, user, status } = useSelector((state) => state.auth);
  const location = useLocation();

  // ⏳ Jangan redirect kalau auth masih loading (mencegah mental balik ke home)
  if (status === "loading") {
    return null; // Mau lebih cakep → return spinner component
  }

  // ✅ Kalau login → render halaman
  if (accessToken && user) {
    return children;
  }

  // ❌ Kalau belum login → redirect ke /login
  toast.error("Anda harus login terlebih dahulu", {
    position: "top-center",
    autoClose: 2000,
  });

  return <Navigate to="/login" state={{ from: location }} replace />;
};

/*
  HOME ROUTE
  - Halaman home hanya untuk user yang sudah login
  - Kalau belum login → lempar ke /about
*/
export const HomeRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.accessToken);

  // ⏳ Kalau belum login → redirect elegan
  if (!token) {
    return <Navigate to="/about" replace />;
  }

  // ✅ Kalau login → render home
  return children;
};

/*
  GUEST ROUTE
  - Login & Register hanya boleh diakses oleh yang belum login
  - Kalau sudah login → balikin ke home
*/
export const GuestRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.accessToken);

  if (token) {
    toast.info("Anda sudah login", {
      position: "top-center",
      autoClose: 1500,
    });
    return <Navigate to="/" replace />;
  }

  return children;
};
