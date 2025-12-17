import { useEffect } from 'react';
// import BottombarDashboard from './BottombarDashboard';
import { SidebarDashboard } from './SidebarDashboard';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllService } from '../../../../features/serviceSlice';
import { changeAccount, selectAccessToken, selectChangeAccountStatus, selectCurrentUser } from '../../../../features/authSlice';
import { getContactForSeller } from '../../../../features/chatSlice';
import { getAllServicesByIdSeller, getOrderBySellerId } from '../../../../features/sellerSlice';
import ModalSwitchAccount from '../../Modal/ModalSwitchAccount';
import socket from '../../../../config/socket';
import { FaArrowLeft, FaRegComment } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { selectContactSeller } from '../../../../features/chatSlice';
import MobileHeader from './MobileHeader';

const DashboardLayout = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectAccessToken)
  const navigate = useNavigate()

  let style = ''
  if (location.pathname.includes('manage-profile')) {
    style = 'p-0'
  }

  const changeAccountStatus = useSelector(selectChangeAccountStatus);

  useEffect(() => {
    // 1. Check Token (Replacement for ProtectedRoute)
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    // 2. Wait for account switch loading
    if (changeAccountStatus === 'loading') return;

    // 3. Check Role (Role Guard)
    // Add a small delay/check to ensure we don't redirect just because the user state hasn't updated yet?
    // Actually, if we are in DashboardLayout, we MUST be a seller.
    if (user && user.active_role === 'buyer') {
      navigate('/', { replace: true })
    }
  }, [user?.active_role, changeAccountStatus, token])

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

      // Dispatch getOrderBySellerId to refresh the list and sidebar badge
      dispatch(getOrderBySellerId(user.id_seller));
    };

    socket.on("new_incoming_order", handleNewOrder);

    return () => {
      socket.off("new_incoming_order", handleNewOrder);
    };
  }, [dispatch, user?.id_seller]);

  // Logic for Mobile Header is now in MobileHeader.jsx

  const isMainDashboard = location.pathname === '/dashboard' || location.pathname === '/dashboard/';
  // const title = getPageTitle(location.pathname); // Moved to MobileHeader

  // Mobile Header Component - Moved to separate file

  return (
    <div className='flex relative h-screen bg-gray-50/50'>
      <SidebarDashboard />
      {/* <BottombarDashboard /> */}

      {/* Show Mobile Header on all pages except chat details */}
      {!location.pathname.includes('/chat/') && <MobileHeader />}

      <main className={`flex-1 ${location.pathname.includes('/chat/') ? 'overflow-hidden h-[100dvh]' : 'overflow-y-auto'} ${!location.pathname.includes('/chat/') ? 'pt-[70px] md:pt-0' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
