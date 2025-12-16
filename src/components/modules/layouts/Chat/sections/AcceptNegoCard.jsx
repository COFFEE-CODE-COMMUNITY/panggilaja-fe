import React from "react";
import { FaCheck } from "react-icons/fa";

const AcceptNegoCard = ({
    serviceName,
    agreedPrice,
    onConfirm,
    isConfirmed,
}) => {
    return (
        <div className="bg-white rounded-2xl border-2 border-primary/20 overflow-hidden shadow-lg max-w-sm">
            <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary p-3 rounded-full">
                        <FaCheck className="text-white text-xl" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-lg text-primary">
                            🎉 Penawaran Diterima!
                        </h3>
                        <p className="text-sm text-gray-600">Selamat, nego berhasil!</p>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Layanan</p>
                    <p className="font-semibold text-gray-800 mb-3">{serviceName}</p>

                    <p className="text-xs text-gray-500 mb-1">Harga yang Disepakati</p>
                    <p className="text-2xl font-bold text-primary">Rp {agreedPrice}</p>
                </div>

                {!isConfirmed ? (
                    <>
                        <button
                            onClick={onConfirm}
                            className="cursor-pointer w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-md flex items-center justify-center gap-2"
                        >
                            <FaCheck size={16} />
                            Konfirmasi
                        </button>

                        <p className="text-xs text-center text-gray-500 mt-3">
                            💡 Klik untuk melanjutkan ke halaman pemesanan
                        </p>
                    </>
                ) : (
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 text-center">
                        <p className="text-sm text-primary font-medium flex items-center justify-center gap-2">
                            <FaCheck className="text-primary" />
                            Pesanan telah dibuat
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AcceptNegoCard;
