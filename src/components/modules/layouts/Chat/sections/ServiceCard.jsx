import React from "react";
import Button from "../../../../common/Button";
import { Link } from "react-router-dom";

const ServiceCard = ({ service, onClose }) => {
    if (!service) return null;

    return (
        <div className="sticky top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-3 flex items-center gap-3 shadow-sm animate-in slide-in-from-top duration-300">
            {/* Image */}
            <div className="relative w-12 h-12 flex-shrink-0">
                <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover rounded-md border border-gray-200"
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-800 truncate leading-tight">
                    {service.name}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-bold text-primary">
                        {service.price}
                    </span>
                    {/* Optional: Add stock or other info here if available */}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
                {/* Detail Button - Navigates to Service Detail */}
                <Link to={`/service/${service.id}`}>
                    <Button className="bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-md shadow-primary/20">
                        Lihat Jasa
                    </Button>
                </Link>

                {/* Close Button (Context sensitive) */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ServiceCard;
