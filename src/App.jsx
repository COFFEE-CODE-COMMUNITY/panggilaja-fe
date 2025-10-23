// src/App.jsx

import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAccessToken, selectAccessToken, selectStatusRefresh } from './features/authSlice';
import api from './api/api';

const App = () => {
  return (
    <RouterProvider router={Router} />
  );
}

export default App;