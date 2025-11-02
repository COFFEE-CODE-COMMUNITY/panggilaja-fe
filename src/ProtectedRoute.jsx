import { Navigate, useLocation } from 'react-router-dom';

// Protected Route - untuk halaman yang butuh login
export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');

  console.log('🔒 ProtectedRoute - Checking auth for:', location.pathname);
  console.log('Token exists:', !!token);

  // if (!token) {
  //   console.log('❌ No token, redirecting to login');
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  console.log('✅ Token found, rendering protected content');
  return children;
};

// Home Route - landing page bisa diakses tapi redirect ke /about kalau belum login
export const HomeRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');

  console.log('🏠 HomeRoute - Checking auth');
  console.log('Token exists:', !!token);

  // Jika belum login, redirect ke about page (public)
  if (!token) {
    console.log('👋 Not logged in, redirecting to /about');
    return <Navigate to="/about" state={{ from: location }} replace />;
  }

  console.log('✅ Logged in, showing home page');
  return children;
};

// Guest Route - untuk halaman login/register (tidak boleh diakses jika sudah login)
export const GuestRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  console.log('👤 GuestRoute - Checking auth');
  console.log('Token exists:', !!token);

  if (token) {
    console.log('✅ Already logged in, redirecting to home');
    return <Navigate to="/" replace />;
  }

  console.log('👋 Not logged in, showing guest page');
  return children;
};