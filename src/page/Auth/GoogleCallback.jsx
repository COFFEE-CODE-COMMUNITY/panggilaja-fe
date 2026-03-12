import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');
    const error = searchParams.get('error');



    const handleGoogleCallback = async () => {
      try {
        if (error) {
          navigate('/login?error=Gagal login dengan Google');
          return;
        }

        if (!token || !userParam) {
          navigate('/login');
          return;
        }

        let userData = JSON.parse(decodeURIComponent(userParam));

        setAuth(token, userData);

        navigate('/', { replace: true });
      } catch (err) {
        console.error('💥 Callback Error:', err);
        navigate('/login?error=Unexpected error saat login Google');
      }
    };

    handleGoogleCallback();
  }, [searchParams, dispatch, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg">Memproses login dengan Google...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
