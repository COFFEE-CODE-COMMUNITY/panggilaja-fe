import React, { useState, useEffect } from "react";
import Orderan from "./dummy/Orderan";
import Button from "../../components/common/Button";

const OrderMobile = () => {
  const [activeTab, setActiveTab] = useState("semua");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(Orderan);
  }, []);

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
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3"
          >
            {/* header */}
            <div className="flex justify-between items-center">
              <p className="text-gray-800 font-semibold">{order.seller_id}</p>
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
                src={order.image}
                alt={order.service_id}
                className="w-16 h-16 rounded-xl object-cover border flex-shrink-0"
              />

              <div className="flex-1 text-sm text-gray-700">
                {/* detail jasa */}
                <p className="font-semibold text-gray-900 mb-1">
                  {order.service_id}
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
            <div className="flex justify-end">
              <Button
                variant="primary"
                className="px-4 py-2 text-white rounded-full"
                onClick={() => alert(`Hubungi ${order.seller_id}`)}
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
