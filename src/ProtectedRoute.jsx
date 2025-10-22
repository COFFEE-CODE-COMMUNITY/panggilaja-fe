import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!token && !refreshToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export const HomeRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!token && !refreshToken) {
    return <Navigate to="/about" state={{ from: location }} replace />;
  }

  return children;
};

export const GuestRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};