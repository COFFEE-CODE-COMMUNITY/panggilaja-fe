import { Navigate, RouterProvider, useLocation, useNavigate } from 'react-router-dom';
import Router from './Router';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from './features/authSlice';
import { addAddress, seeAddress, selectSeeAddress } from './features/userSlice';
import { useEffect } from 'react';
const App = () => {
  
  return (
    <RouterProvider router={Router} />
  );
}

export default App;