import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/authSlice';
import {
  getAllServicesByIdSeller,
  getOrderBySellerId,
  selectOrderSeller,
  selectSelectedSeller,
  selectSellerServices,
} from '../../features/sellerSlice';
import { selectContactSeller } from '../../features/chatSlice';
import { Link, useNavigate } from 'react-router-dom';

const DashboardUtama = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const orders = useSelector(selectOrderSeller);
  const services = useSelector(selectSellerServices);
  const sellerProfile = useSelector(selectSelectedSeller);
  const contactSeller = useSelector(selectContactSeller);
  const unreadCount = contactSeller?.reduce((acc, curr) => acc + (curr.unreadCount || 0), 0) || 0;

  const [stats, setStats] = useState({
    totalOrders: 0,
    inProgressOrders: 0,
    completedOrders: 0,
    totalServices: 0,
  });

  let lengthService = 0
  services?.data?.map(() => {
    lengthService += 1
  })

  useEffect(() => {
    if (user?.id_seller) {
      dispatch(getOrderBySellerId(user?.id_seller));
      dispatch(getAllServicesByIdSeller(user?.id_seller));
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

  const latestOrders = orders?.data?.slice(0, 5) || [];

  const serviceMap = new Map(
    services?.data?.map((service) => [service.id, service]) || []
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-24 sm:pb-6">
      {/* Welcome Section - Mobile Optimized */}
      <div className="bg-gradient-to-br bg-primary px-4 sm:px-6 py-6 sm:py-8 text-white shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            Halo, {sellerProfile?.nama_toko || 'Mitra'}!
          </h1>
          <p className="text-white/90 text-sm sm:text-base">
            Kelola pesanan dan layanan Anda dengan mudah
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-5 sm:space-y-6">
        {/* Stats Cards - Compact on Mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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