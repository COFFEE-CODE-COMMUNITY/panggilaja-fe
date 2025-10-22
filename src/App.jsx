// src/App.jsx

import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAccessToken, selectAccessToken, selectStatusRefresh } from './features/authSlice';

const App = () => {
  const dispatch = useDispatch();
  // Ambil token dari state, yang diinisialisasi dari localStorage
  const accessToken = useSelector(selectAccessToken); 
  const status = useSelector(selectStatusRefresh); 

  useEffect(() => {
    // Hanya coba refresh jika TIDAK ADA accessToken di state Redux
    // Ini berarti sesi mungkin ada (dari cookie) tapi state belum terisi
    // atau aplikasi baru saja dibuka.
    if (!accessToken) {
       dispatch(refreshAccessToken());
    }
  }, [dispatch, accessToken]); // Tambahkan accessToken sebagai dependency

  console.log(status)
  return (
    <RouterProvider router={Router} />
  );
}

export default App;