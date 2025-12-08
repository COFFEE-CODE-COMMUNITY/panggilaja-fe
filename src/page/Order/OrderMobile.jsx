import React, { useState, useEffect } from "react";
import Orderan from "./dummy/Orderan";
import Button from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice";
import {
  getOrders,
  selectOrders,
  selectOrdersError,
  selectOrdersStatus,
} from "../../features/userSlice";
import { selectAllService } from "../../features/serviceSlice";
import { Link } from "react-router-dom";

const OrderMobile = () => {
  const [activeTab, setActiveTab] = useState("semua");

  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  const order = useSelector(selectOrders);
  const orderStatus = useSelector(selectOrdersStatus);
  const orderMessage = useSelector(selectOrdersError);
  const allService = useSelector(selectAllService);

  useEffect(() => {
    if (user && user.id_buyer) {
      if (orderStatus === "idle") {
        dispatch(getOrders(user.id_buyer));
      }
    }
  }, [dispatch, orderStatus, user]);

  let orderService = [];

  if (orderStatus === "success" && order) {
    orderService = order.map((itemOrder) => {
      const sellerData = itemOrder.seller || {};
      const serviceData = itemOrder.service || {};

      return {
        order_id: itemOrder.id,
        status: itemOrder.status,
        tanggal: itemOrder.created_at,
        total_harga: itemOrder.total_harga,
        pesan_tambahan: itemOrder.pesan_tambahan,

        seller_id: sellerData.id || "",
        seller_name: sellerData.nama_toko || "",

        service_id: serviceData.id || "",
        service_name: serviceData.nama_jasa || "",
        service_image: serviceData.foto_product || "",
      };
    });
  }

  const filteredOrders = orderService.filter((item) => {
    if (activeTab === "semua") return true;
    if (activeTab === "proses") return item.status === "in_progress" || item.status === "pending";
    if (activeTab === "selesai") return item.status === "completed";
    return true;
  });

  const formatHarga = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);

  const translateStatus = (status) => {
    switch (status) {
      case "pending": return "Menunggu";
      case "in_progress": return "Proses";
      case "completed": return "Selesai";
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Daftar Pesanan</h1>

        <div className="w-full">

          {/* filter tab */}
          <div className="bg-white border-b border-gray-200 mb-6 sticky top-20 z-10">
            <div className="flex gap-8">
              {["semua", "proses", "selesai"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 font-medium capitalize text-sm transition-all relative ${activeTab === tab
                    ? "text-primary font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-primary after:rounded-t-full"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* order card */}
          <div className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((item) => (
                <div
                  key={item.order_id}
                  className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 transition-all hover:border-primary/50"
                >
                  {/* header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                        {item.seller_name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{item.seller_name}</p>
                        <p className="text-xs text-gray-500">{new Date(item.tanggal).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${item.status === "completed"
                        ? "bg-green-50 text-green-700"
                        : item.status === "in_progress"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-yellow-50 text-yellow-700"
                        }`}
                    >
                      {translateStatus(item.status)}
                    </span>
                  </div>

                  <hr className="border-gray-100 mb-4" />

                  {/* contentt */}
                  <div className="flex gap-4">
                    <img
                      src={item.service_image}
                      alt={item.service_name}
                      className="w-24 h-24 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1 truncate text-lg">{item.service_name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {item.pesan_tambahan || "Tidak ada catatan tambahan"}
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Total Harga</p>
                        <p className="text-base font-bold text-primary">{formatHarga(item.total_harga)}</p>
                      </div>
                    </div>
                  </div>

                  {/* button*/}
                  <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-50">
                    <Button
                      variant={item.status === "completed" ? "secondary" : "secondary"}
                      className={`px-6 py-2 text-sm rounded-full font-medium ${item.status === "completed"
                        ? "bg-secondary text-white hover:bg-secondary/90"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      disabled={item.status !== "completed"}
                      to={item.status === "completed" ? `/service/review/${item.order_id}` : undefined}
                    >
                      Beri Ulasan
                    </Button>

                    <Button
                      variant="primary"
                      className="px-6 py-2 text-sm rounded-full font-medium text-white shadow-sm hover:shadow hover:bg-primary/90"
                      to={`/chat/${item.seller_id}`}
                    >
                      Hubungi
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <img
                  src="https://illustrations.popsy.co/gray/surr-list-is-empty.svg"
                  alt="Empty"
                  className="w-64 h-64 mb-6 opacity-75"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada pesanan</h3>
                <p className="text-gray-500 mb-8 text-center max-w-md">
                  Sepertinya kamu belum pernah memesan jasa apapun. Yuk cari jasa yang kamu butuhkan sekarang!
                </p>
                <Link
                  to="/search-result"
                  className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Cari Jasa
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderMobile;
