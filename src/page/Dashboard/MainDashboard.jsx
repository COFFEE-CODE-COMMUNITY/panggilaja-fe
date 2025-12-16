import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChangeAccountStatus, selectCurrentUser } from '../../features/authSlice';
import {
  getAllServicesByIdSeller,
  getOrderBySellerId,
  getSellerById,
  selectOrderSeller,
  selectSelectedSeller,
  selectSellerServices,
  selectOrderSellerStatus,
  selectServiceSellerStatus,
} from '../../features/sellerSlice';
import { selectContactSeller, getContactForSeller, selectContactSellerStatus } from '../../features/chatSlice';
import { Link, useNavigate } from 'react-router-dom';

const DashboardSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 pb-24 sm:pb-6 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-5 sm:space-y-6">
        {/* Store Profile Card Skeleton */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-row items-center gap-4 sm:gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-bl-full -mr-8 -mt-8 pointer-events-none" />

          <div className="relative flex-shrink-0">
            <div className="h-16 w-16 sm:h-24 sm:w-24 bg-gray-200 rounded-full border-4 border-white"></div>
          </div>

          <div className="flex-1 text-left z-10 min-w-0 space-y-2 sm:space-y-3">
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-32 sm:w-48"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-full max-w-[150px] sm:max-w-xs"></div>

            <div className="flex items-center gap-2">
              <div className="h-3 sm:h-4 w-3 sm:w-4 bg-gray-200 rounded-full"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-32"></div>
            </div>
          </div>

          <div className="h-9 sm:h-11 w-24 sm:w-32 bg-gray-200 rounded-xl flex-shrink-0 z-10"></div>
        </div>

        {/* Stats Cards Skeleton */}
        {/* Mobile View: Single Row */}
        <div className="block sm:hidden bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center flex-1 space-y-2">
                <div className="h-2 bg-gray-200 rounded w-8"></div>
                <div className="h-5 bg-gray-200 rounded w-6"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop View: Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="h-10 w-10 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>

        {/* Quick Actions Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Grid for Latest Orders and Messages Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 h-fit">
              <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const DashboardUtama = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const changeAccountStatus = useSelector(selectChangeAccountStatus);
  const orders = useSelector(selectOrderSeller);
  const services = useSelector(selectSellerServices);
  const sellerProfile = useSelector(selectSelectedSeller);
  const contactSeller = useSelector(selectContactSeller);

  const ordersStatus = useSelector(selectOrderSellerStatus);
  const servicesStatus = useSelector(selectServiceSellerStatus);
  const contactStatus = useSelector(selectContactSellerStatus);

  const unreadCount = contactSeller?.reduce((acc, curr) => acc + (curr.unreadCount || 0), 0) || 0;

  const [stats, setStats] = useState({
    totalOrders: 0,
    inProgressOrders: 0,
    completedOrders: 0,
    totalServices: 0,
  });

  // Loading based on account switch TO SELLER or initial data fetch
  // If we are switching TO BUYER (active_role === 'seller' && status === 'loading'), we do NOT want to show dashboard skeleton.

  const isSwitchingToSeller = changeAccountStatus === 'loading' && user?.active_role === 'buyer';
  const isDataLoading =
    changeAccountStatus !== 'loading' &&
    user?.active_role === 'seller' &&
    (ordersStatus === 'loading' || servicesStatus === 'loading' || contactStatus === 'loading');

  const isLoading = isSwitchingToSeller || isDataLoading || !user?.id_seller;

  let lengthService = 0
  services?.data?.map(() => {
    lengthService += 1
  })

  useEffect(() => {
    if (user?.id_seller) {
      // Small artificial delay to show skeleton if desired, or just load
      dispatch(getSellerById(user?.id_seller));
      dispatch(getOrderBySellerId(user?.id_seller));
      dispatch(getAllServicesByIdSeller(user?.id_seller));
      dispatch(getContactForSeller(user?.id_seller));
    }
  }, [dispatch, user?.id_seller]);

  useEffect(() => {
    if (orders?.data && services?.data) {
      const inProgress = orders.data.filter(
        (order) => order.status === 'in_progress'
      ).length;
      const completed = orders.data.filter(
        (order) => order.status === 'completed'
      ).length;

      setStats({
        totalOrders: orders.data.length,
        inProgressOrders: inProgress,
        completedOrders: completed,
        totalServices: services.data.length,
      });
    }
  }, [orders?.data, services?.data]);

  const latestOrders = orders?.data?.slice(0, 3) || [];

  const serviceMap = new Map(
    services?.data?.map((service) => [service.id, service]) || []
  );

  if (isLoading) {
    return <DashboardSkeleton />
  }
  return (
    <div className="w-full min-h-screen bg-gray-50 pb-24 sm:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-5 sm:space-y-6">
        {/* Store Profile Card - Top Widget */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-row items-center gap-4 sm:gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none" />

          <div className="relative flex-shrink-0">
            <img
              src={sellerProfile?.foto_toko || "https://ui-avatars.com/api/?name=" + (sellerProfile?.nama_toko || "Toko")}
              alt={sellerProfile?.nama_toko}
              className="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm"
            />
            <Link
              to={`/dashboard/manage-profile/${user?.id_seller}`}
              className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-white text-gray-600 rounded-full border border-gray-200 shadow-sm flex items-center justify-center hover:text-primary hover:border-primary transition-colors cursor-pointer"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </Link>
          </div>

          <div className="flex-1 text-left z-10 min-w-0">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 truncate">
              {sellerProfile?.nama_toko || "Nama Toko Anda"}
            </h1>
            <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate max-w-[200px] sm:max-w-md">
                  {[
                    sellerProfile?.address?.kecamatan,
                    sellerProfile?.address?.kota,
                    sellerProfile?.address?.provinsi
                  ].filter(Boolean).join(', ') || "Lokasi belum diatur"}
                </span>
              </span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Akun Terverifikasi
              </span>
            </div>
          </div>

          <Link
            to={`/dashboard/manage-profile/${user?.id_seller}`}
            className="flex px-4 py-2 sm:px-6 sm:py-2.5 bg-primary text-white rounded-xl font-medium shadow-sm hover:bg-primary/90 transition-all active:scale-95 items-center gap-2 whitespace-nowrap text-xs sm:text-base"
          >
            Kelola Toko
          </Link>
        </div>

        {/* Stats Cards */}
        {/* Mobile View: Single Row, Unified Card, No Icons */}
        <div className="block sm:hidden bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between text-center divide-x divide-gray-100">
            {/* Note: User said 'tanpa ada pemisah' (without separators). If they mean visually, I'll remove divide-x. 
                 But usually 'separator' means distinct cards. I will try without divide-x first to strictly follow 'tanpa ada pemisah'.
                 Actually, 'tanpa ada pemisah' might mean no gap/border between items. 
                 I'll use a simple flex justify-between. */}
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-center flex-1">
                <p className="text-[10px] text-gray-500 mb-0.5">Total</p>
                <p className="text-lg font-bold text-gray-800">{stats.totalOrders}</p>
              </div>
              <div className="flex flex-col items-center flex-1">
                <p className="text-[10px] text-gray-500 mb-0.5">Proses</p>
                <p className="text-lg font-bold text-gray-800">{stats.inProgressOrders}</p>
              </div>
              <div className="flex flex-col items-center flex-1">
                <p className="text-[10px] text-gray-500 mb-0.5">Selesai</p>
                <p className="text-lg font-bold text-gray-800">{stats.completedOrders}</p>
              </div>
              <div className="flex flex-col items-center flex-1">
                <p className="text-[10px] text-gray-500 mb-0.5">Layanan</p>
                <p className="text-lg font-bold text-gray-800">{lengthService}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View: Grid with Icons (Original Layout) */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Total Pesanan */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="p-2.5 sm:p-3 bg-blue-100 rounded-lg w-fit mb-3 sm:mb-4">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">
              Total Pesanan
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
              {stats.totalOrders}
            </p>
          </div>

          {/* Pesanan Diproses */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="p-2.5 sm:p-3 bg-yellow-100 rounded-lg w-fit mb-3 sm:mb-4">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">
              Diproses
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
              {stats.inProgressOrders}
            </p>
          </div>

          {/* Pesanan Selesai */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="p-2.5 sm:p-3 bg-green-100 rounded-lg w-fit mb-3 sm:mb-4">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">
              Selesai
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
              {stats.completedOrders}
            </p>
          </div>

          {/* Total Layanan */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="p-2.5 sm:p-3 bg-purple-100 rounded-lg w-fit mb-3 sm:mb-4">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">
              Layanan
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
              {lengthService}
            </p>
          </div>
        </div>

        {/* Quick Actions - Mobile Optimized */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <Link
            to="/dashboard/manage-order"
            className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:border-primary hover:shadow-md transition-all active:scale-95"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-primary/10 rounded-lg flex-shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                  Kelola Pesanan
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  Lihat semua pesanan
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/dashboard/manage-services"
            className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:border-primary hover:shadow-md transition-all active:scale-95"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-primary/10 rounded-lg flex-shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                  Kelola Layanan
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  Tambah & edit layanan
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/dashboard/chat"
            className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:border-primary hover:shadow-md transition-all active:scale-95"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-primary/10 rounded-lg flex-shrink-0 relative">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                  Chat Pelanggan
                </h3>
                <p className={`text-xs sm:text-sm truncate ${unreadCount > 0 ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                  {unreadCount > 0 ? `${unreadCount} Pesan Baru` : 'Balas pesan pelanggan'}
                </p>
              </div>
            </div>
          </Link>

        </div>

        {/* Grid for Latest Orders and Messages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-fit">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  Pesanan Terbaru
                </h2>
                <Link
                  to="/dashboard/manage-order"
                  className="text-primary hover:text-primary/80 text-xs sm:text-sm font-medium"
                >
                  Lihat Semua →
                </Link>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {latestOrders.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-gray-700 mb-1">
                    Belum Ada Pesanan
                  </h3>
                  <p className="text-xs text-gray-500">
                    Pesanan akan muncul di sini
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {latestOrders.map((order) => {
                    const service = serviceMap.get(order.service_id);
                    return (
                      <div
                        key={order.id}
                        className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:border-primary transition-colors cursor-pointer"
                        onClick={() => navigate(`/dashboard/manage-order`)}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {service?.foto_product ? (
                            <img
                              src={service.foto_product}
                              alt={service.nama_jasa}
                              className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-800 text-sm truncate">
                              {service?.nama_jasa || 'Jasa Tidak Ditemukan'}
                            </h4>
                            <p className="text-xs text-gray-500 truncate">
                              {order.buyer?.fullname || 'Pembeli'}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${order.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'in_progress'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                          {order.status === 'completed'
                            ? 'Selesa'
                            : order.status === 'in_progress'
                              ? 'Proses'
                              : order.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Latest Messages */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-fit">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  Pesan Terbaru
                </h2>
                <Link
                  to="/dashboard/chat"
                  className="text-primary hover:text-primary/80 text-xs sm:text-sm font-medium"
                >
                  Lihat Semua →
                </Link>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {(!contactSeller || contactSeller.length === 0) ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-gray-700 mb-1">
                    Belum Ada Pesan
                  </h3>
                  <p className="text-xs text-gray-500">
                    Pesan dari pelanggan akan muncul di sini
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {contactSeller.slice(0, 5).map((chat) => (
                    <div
                      key={chat.id}
                      className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:border-primary transition-colors cursor-pointer relative"
                      onClick={() => navigate(`/dashboard/chat/${chat.id}`)}
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={chat.avatar || `https://ui-avatars.com/api/?name=${chat.name}`}
                          alt={chat.name}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        {chat.isOnline && (
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <h4 className="font-semibold text-gray-800 text-sm truncate">
                            {chat.name}
                          </h4>
                          <span className="text-[10px] text-gray-400 flex-shrink-0">
                            {chat.lastMessage?.created_at ? new Date(chat.lastMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                          </span>
                        </div>
                        <p className={`text-xs truncate ${chat.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                          {chat.lastMessage?.text || 'Mulai percakapan...'}
                        </p>
                      </div>
                      {chat.unreadCount > 0 && (
                        <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-[10px] text-white font-bold">{chat.unreadCount}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUtama;