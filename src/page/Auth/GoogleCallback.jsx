import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googleLoginSuccess } from '../../features/authSlice';
import { seeAddress } from '../../features/userSlice';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
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

        console.log('✅ [Redux] googleLoginSuccess result:', result);

        // Ambil alamat user (cek apakah profil sudah lengkap)
        console.log('📦 [GoogleCallback] Fetching user address...');
        const addressRes = await dispatch(seeAddress(userData.id)).unwrap();

        console.log('🏠 [Redux] seeAddress result:', addressRes);

        const alamat = addressRes?.data;
        if (alamat?.provinsi || alamat?.alamat) {
          console.log('🧭 [GoogleCallback] Alamat ditemukan, redirect ke halaman utama...');
          navigate('/', { replace: true });
        } else {
          console.log('🧭 [GoogleCallback] Alamat kosong, redirect ke form detail profile...');
          navigate('/form-detail-profile');
        }

      } catch (err) {
        console.error('💥 [GoogleCallback] Unhandled error:', err);
        navigate('/login?error=Gagal login dengan Google');
      }
    };

    handleGoogleCallback();
  }, [searchParams, navigate, dispatch]);

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
