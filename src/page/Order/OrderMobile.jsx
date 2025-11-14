import React, { useState, useEffect } from "react";
import Orderan from "./dummy/Orderan";
import Button from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice";
import { getOrders, selectOrders, selectOrdersError, selectOrdersStatus } from "../../features/userSlice";
import { selectAllService } from "../../features/serviceSlice";

const OrderMobile = () => {
  const [activeTab, setActiveTab] = useState("semua");
  const [orders, setOrders] = useState([]);

  const dispatch = useDispatch()

  const user = useSelector(selectCurrentUser)
  const order = useSelector(selectOrders)
  const orderStatus = useSelector(selectOrdersStatus)
  const orderMessage = useSelector(selectOrdersError)
  const allService = useSelector(selectAllService)

  useEffect(() => {
    if (user && user.id_buyer) {
      if (orderStatus === 'idle') {
        dispatch(getOrders(user.id_buyer));
      }
    }
  }, [dispatch, orderStatus, user]);

  useEffect(() => {
    setOrders(Orderan);
  }, []);

  let orderService = []; // Hasil akhirnya akan disimpan di sini

  if (orderStatus === 'success' && order && allService) {
      const serviceMap = new Map(
          allService.map(service => [service.id, service])
      );

      // 2. Kita loop (map) array 'order'
      // Untuk setiap item 'order', kita akan buat objek baru
      orderService = order.map((itemOrder) => {
          
          // 3. Ambil detail service yang cocok dari 'peta'
          // (menggunakan service_id dari order saat ini)
          const serviceDetail = serviceMap.get(itemOrder.service_id);

          // Pengaman jika service-nya tidak ditemukan
          if (!serviceDetail) {
              return null; // Nanti kita filter
          }

          // 4. GABUNGKAN data yang kamu mau di sini
          return {
              order_id: itemOrder.id,
              status: itemOrder.status,
              tanggal: itemOrder.created_at, // atau itemOrder.tanggal
              total_harga: itemOrder.total_harga,
              pesan_tambahan: itemOrder.pesan_tambahan,

              // Data dari 'service' (serviceDetail)
              seller_id : serviceDetail.seller_id,
              service_id : serviceDetail.id,
              service_name: serviceDetail.nama_jasa,
              service_image: serviceDetail.foto_product,
              seller_name: serviceDetail.seller_name
          };
      
      }).filter(Boolean); // Trik simpel untuk menghapus 'null' dari array

  }

  console.log(orderService);

  const filteredOrders =
    activeTab === "semua"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  const formatHarga = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);

  return (
    <div className="min-h-screen pb-24">
      
      {/* filter tab */}
      <div className="flex justify-center sticky top-0 z-20 border-b">
        <div className="flex gap-6 py-2">
          {["semua", "proses", "selesai"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-2 font-medium capitalize transition-all ${
                activeTab === tab
                  ? "text-green-700 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-green-700"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* card */}
      <div className="p-3 space-y-3">
        {orderService.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3"
          >
            {/* header */}
            <div className="flex justify-between items-center">
              <p className="text-gray-800 font-semibold">{order.seller_name}</p>
              <span
                className={`text-sm font-semibold capitalize ${
                  order.status === "selesai"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {order.status}
              </span>
            </div>

            <hr className="border-gray-200" />

            {/* gambar jasa */}
            <div className="flex gap-3">
              <img
                src={order.service_image}
                alt={order.service_id}
                className="w-16 h-16 rounded-xl object-cover border flex-shrink-0"
              />

              <div className="flex-1 text-sm text-gray-700">
                {/* detail jasa */}
                <p className="font-semibold text-gray-900 mb-1">
                  {order.service_name}
                </p>
                
                <p>
                  Tanggal:{" "}
                  <span className="font-medium text-gray-800">
                    {new Date(order.tanggal).toLocaleDateString("id-ID")}
                  </span>
                </p>

                <p>
                  Catatan:{" "}
                  <span className="text-gray-600">
                    {order.pesan_tambahan || "Tidak ada catatan"}
                  </span>
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  Total: {formatHarga(order.total_harga)}
                </p>
              </div>
            </div>

            {/* button */}
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                className={`px-4 py-2 rounded-full text-[15px] ${
                  order.status === "completed"
                    ? "bg-green-600 text-white"
                    : "border border-gray-300 text-gray-400 bg-transparent cursor-not-allowed"
                }`}
                disabled={order.status !== "completed"}
                onClick={() =>
                  order.status === "selesai" &&
                  alert(`Ulas penyedia: ${order.seller_id}`)
                }
                to={`/service/${order.service_id}/review`}
              >
                Review
              </Button>

              <Button
                variant="primary"
                className="px-4 py-2 text-white rounded-full text-[15px]"
                to={`/chat/${order.seller_id}`}
              >
                Hubungi Penyedia
              </Button>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Belum ada pesanan {activeTab}.
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderMobile;
