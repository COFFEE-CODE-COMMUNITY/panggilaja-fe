import { useEffect } from 'react';
import BottombarDashboard from './BottombarDashboard';
import { SidebarDashboard } from './SidebarDashboard';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllService } from '../../../../features/serviceSlice';
import { changeAccount, selectChangeAccountStatus, selectCurrentUser } from '../../../../features/authSlice';
import { getContactForSeller } from '../../../../features/chatSlice';
import { getAllServicesByIdSeller, getOrderBySellerId } from '../../../../features/sellerSlice';
import ModalSwitchAccount from '../../Modal/ModalSwitchAccount';
import socket from '../../../../config/socket';

const DashboardLayout = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const navigate = useNavigate()

  let style = ''
  if (location.pathname.includes('manage-profile')) {
    style = 'p-0'
  }

  useEffect(() => {
    if (user?.active_role === 'buyer') {
      navigate('/')
    }
  }, [user?.active_role])

  useEffect(() => {
    if (user && user.id_seller) {
      dispatch(getAllServicesByIdSeller(user.id_seller));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && user?.id_seller) {
      dispatch(getOrderBySellerId(user?.id_seller));
      dispatch(getContactForSeller(user?.id_seller));
    }
  }, [dispatch, user?.id_seller]);

  // Listen for new incoming orders
  useEffect(() => {
    if (!user?.id_seller) return;

    const handleNewOrder = (data) => {
      console.log("🔔 New order received (Socket):", data);
      // Dispatch getOrderBySellerId to refresh the list and sidebar badge
      dispatch(getOrderBySellerId(user.id_seller));
    };

    socket.on("new_incoming_order", handleNewOrder);

    return () => {
      socket.off("new_incoming_order", handleNewOrder);
    };
  }, [dispatch, user?.id_seller]);

  return (
    <div className='flex relative h-screen'>
      <SidebarDashboard />
      <BottombarDashboard />
      <main className={`flex-1 overflow-y-auto`}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
