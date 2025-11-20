import { useEffect } from 'react';
import BottombarDashboard from './BottombarDashboard';
import { SidebarDashboard } from './SidebarDashboard';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllService } from '../../../../features/serviceSlice';
import { changeAccount, selectChangeAccountStatus, selectCurrentUser } from '../../../../features/authSlice';
import { getAllServicesByIdSeller, getOrderBySellerId } from '../../../../features/sellerSlice';
import ModalSwitchAccount from '../../Modal/ModalSwitchAccount';

const DashboardLayout = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)

  let style = ''
  if(location.pathname.includes('manage-profile')){
    style = 'p-0'
  }

  useEffect(() => {
      if (user && user.id_seller) { 
          dispatch(getAllServicesByIdSeller(user.id_seller));
      }
  }, [dispatch, user]); 

  useEffect(() => {
      if (user && user?.id_seller) {
          dispatch(getOrderBySellerId(user?.id_seller));
      }
  }, [dispatch, user?.id_seller]);

  return (
    <div className='flex relative h-screen'>
      <SidebarDashboard/>
      <BottombarDashboard/>
      <main className={`flex-1 overflow-y-auto lg:px-[15px] lg:py-[10px] md:px-[10px] md:py-[5px] px-[5px] py-[5px]`}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
