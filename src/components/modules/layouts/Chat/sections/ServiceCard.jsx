import React from "react";
import { FaStar } from "react-icons/fa";
import Button from "../../../../common/Button";
import { Link } from "react-router-dom";

const ServiceCard = ({ data }) => {
    return (
        <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow max-w-sm">
            <div className="relative">
                <img
                    src={data.image}
                    alt={data.serviceName}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <FaStar className="text-yellow-400" size={14} />
                    <span className="text-sm font-semibold">{data.rating}</span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {data.serviceName}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {data.description}
                </p>

                {data.status && (
                    <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs font-bold text-blue-700 text-center">
                            💬 {data.status}
                        </p>
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Harga</p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-xl font-bold text-primary">{data.price}</p>
                        </div>
                    </div>
                    <Link to={`/service/${data.serviceId}`}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg text-sm font-semibold">
                            Lihat Detail
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
