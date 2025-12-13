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
import { Link, useNavigate } from 'react-router-dom';

const DashboardUtama = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const orders = useSelector(selectOrderSeller);
  const services = useSelector(selectSellerServices);
  const sellerProfile = useSelector(selectSelectedSeller);

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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                  Chat Pelanggan
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  Balas pesan pelanggan
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Latest Orders - Mobile Optimized */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
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
              <div className="text-center py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
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
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">
                  Belum Ada Pesanan
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 px-4">
                  Pesanan akan muncul di sini ketika ada pelanggan yang memesan
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {latestOrders.map((order) => {
                  const service = serviceMap.get(order.service_id);
                  return (
                    <div
                      key={order.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 sm:p-4 border border-gray-100 rounded-lg hover:border-primary transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {service?.foto_product && (
                          <img
                            src={service.foto_product}
                            alt={service.nama_jasa}
                            className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                            {service?.nama_jasa || 'Jasa Tidak Ditemukan'}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-500 truncate">
                            {order.buyer?.fullname || 'Pembeli'}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5 truncate">
                            {order.tanggal || '-'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                        <span
                          className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'in_progress'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {order.status === 'completed'
                            ? 'Selesai'
                            : order.status === 'in_progress'
                            ? 'Diproses'
                            : order.status}
                        </span>
                        <button
                          onClick={() =>
                            navigate(`/dashboard/chat/${order.buyer_id}`)
                          }
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95 flex-shrink-0"
                        >
                          <svg
                            className="w-5 h-5 text-gray-600"
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
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUtama;