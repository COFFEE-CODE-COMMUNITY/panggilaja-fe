import { useEffect } from 'react';
// import BottombarDashboard from './BottombarDashboard';
import { SidebarDashboard } from './SidebarDashboard';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../../../store/useAuthStore';
import { useGetContactForSeller } from '../../../../hooks/useChat';
import { useGetSellerServices, useGetOrdersBySellerId } from '../../../../hooks/useSellers';
import ModalSwitchAccount from '../../Modal/ModalSwitchAccount';
import socket from '../../../../config/socket';
import { FaArrowLeft, FaRegComment } from "react-icons/fa";
import { Link } from 'react-router-dom';
import MobileHeader from './MobileHeader';
import { useQueryClient } from '@tanstack/react-query';

const DashboardLayout = () => {
  const location = useLocation()
  const user = useAuthStore(state => state.user)
  const token = useAuthStore(state => state.accessToken)
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  let style = ''
  if (location.pathname.includes('manage-profile')) {
    style = 'p-0'
  }

  // Pre-fetch data if user is a seller
  useGetSellerServices(user?.id_seller);
  useGetOrdersBySellerId(user?.id_seller);
  useGetContactForSeller(user?.id_seller);

  useEffect(() => {
    // 1. Check Token (Replacement for ProtectedRoute)
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    // 3. Check Role (Role Guard)
    // Add a small delay/check to ensure we don't redirect just because the user state hasn't updated yet?
    // Actually, if we are in DashboardLayout, we MUST be a seller.
    if (user && user.active_role === 'buyer') {
      navigate('/', { replace: true })
    }
  }, [user?.active_role, token])

  // Listen for new incoming orders
  useEffect(() => {
    if (!user?.id_seller) return;

    const handleNewOrder = (data) => {
      // Invalidate the seller orders query so it refetches automatically
      queryClient.invalidateQueries({ queryKey: ['sellerOrders', user.id_seller] });
    };

    socket.on("new_incoming_order", handleNewOrder);

    return () => {
      socket.off("new_incoming_order", handleNewOrder);
    };
  }, [queryClient, user?.id_seller]);

  // Logic for Mobile Header is now in MobileHeader.jsx

  const isMainDashboard = location.pathname === '/dashboard' || location.pathname === '/dashboard/';
  // const title = getPageTitle(location.pathname); // Moved to MobileHeader

  // Mobile Header Component - Moved to separate file

  return (
    <div className='flex relative h-screen bg-gray-50'>
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
