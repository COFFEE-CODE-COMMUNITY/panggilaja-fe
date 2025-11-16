import { useEffect } from 'react';
import BottombarDashboard from './BottombarDashboard';
import { SidebarDashboard } from './SidebarDashboard';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllService } from '../../../../features/serviceSlice';
import { selectCurrentUser } from '../../../../features/authSlice';
import { getAllServicesByIdSeller } from '../../../../features/sellerSlice';

const DashboardLayout = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const user = useSelector(selectCurrentUser)

  const services = useSelector(selectAllService)

  let style = ''
  if(location.pathname.includes('manage-profile')){
    style = 'p-0'
  }

  useEffect(() => {
      if (user && user.id_seller) { 
          dispatch(getAllServicesByIdSeller(user.id_seller));
      }
  }, [dispatch, user]); 

  return (
    <div className='flex relative h-screen'>
      <SidebarDashboard/>
      <BottombarDashboard/>
      <main className={`flex-1 overflow-y-auto px-7 py-5`}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
