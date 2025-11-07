import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { googleLoginSuccess, selectCurrentUser } from '../../features/authSlice';
import { seeAddress, selectSeeAddress } from '../../features/userSlice';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = searchParams.get('token');
  const userParam = searchParams.get('user');
  const error = searchParams.get('error');

  console.log('🔍 [GoogleCallback] Start handling callback...');
  console.log('🌐 URL Params:', { token, userParam, error });

  const handleGoogleCallback = async () => {
    try {
      // Jika ada error dari backend
      if (error) {
        console.warn('⚠️ [GoogleCallback] Error param detected:', error);
        navigate('/login?error=Gagal login dengan Google');
        return;
      }

      // Cek apakah token & user tersedia
      if (!token || !userParam) {
        console.warn('⚠️ [GoogleCallback] Token atau user tidak ditemukan di URL');
        navigate('/login');
        return;
      }

      // Decode user data
      let userData = null;
      try {
        userData = JSON.parse(decodeURIComponent(userParam));
        console.log('✅ [GoogleCallback] Parsed user data:', userData);
      } catch (err) {
        console.error('❌ [GoogleCallback] Gagal parse user JSON:', err);
        navigate('/login?error=Data pengguna tidak valid');
        return;
      }

      // Dispatch login success ke Redux
      console.log('🚀 [GoogleCallback] Dispatching googleLoginSuccess...');
      const result = await dispatch(
        googleLoginSuccess({
          status: 'success',
          message: 'Login dengan Google berhasil',
          data: { user: userData, token },
        })
      ).unwrap();

      navigate('/', { replace: true });

    } catch (err) {
      console.error('💥 [GoogleCallback] Unhandled error:', err);
      navigate('/login?error=Gagal login dengan Google');
    }
  };

  handleGoogleCallback();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg">Memproses login dengan Google...</p>
        <p className="text-sm text-gray-500 mt-2">Lihat console (F12) untuk debugging detail.</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
