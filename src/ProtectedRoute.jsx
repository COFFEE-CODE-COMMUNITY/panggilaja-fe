import { Navigate, useLocation } from 'react-router-dom';

// Protected Route - untuk halaman yang butuh login
export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');

  console.log('🔒 ProtectedRoute - Checking auth for:', location.pathname);
  console.log('Token exists:', !!token);

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
