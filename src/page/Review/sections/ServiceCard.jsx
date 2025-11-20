import React from "react";

export const ServiceCard = ({ service }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8 p-4 bg-[#f2fcf4] rounded-xl">
      <div className="flex-shrink-0">
        <img
          src={service.service?.foto_product || service.foto_product}
          alt={service.service?.nama_jasa || service.nama_jasa}
          className="w-32 h-32 object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-600 mb-2">
          {service.service?.nama_jasa}
        </h2>
        <p className="text-lg font-semibold text-[var(--color-primary)]">
          Rp {service.total_harga?.toLocaleString() || "0"}
        </p>
      </div>
    </div>
  );
};
