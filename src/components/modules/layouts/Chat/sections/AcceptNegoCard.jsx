import React from "react";
import { FaCheck } from "react-icons/fa";

const AcceptNegoCard = ({
    serviceName,
    agreedPrice,
    onConfirm,
    isConfirmed,
}) => {
    return (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 overflow-hidden shadow-lg max-w-sm">
            <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-500 p-3 rounded-full">
                        <FaCheck className="text-white text-xl" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-lg text-green-800">
                            🎉 Penawaran Diterima!
                        </h3>
                        <p className="text-sm text-green-600">Selamat, nego berhasil!</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 mb-4 border border-green-200">
                    <p className="text-xs text-gray-500 mb-1">Layanan</p>
                    <p className="font-semibold text-gray-800 mb-3">{serviceName}</p>

                    <p className="text-xs text-gray-500 mb-1">Harga yang Disepakati</p>
                    <p className="text-2xl font-bold text-green-600">Rp {agreedPrice}</p>
                </div>

                {!isConfirmed ? (
                    <>
                        <button
                            onClick={onConfirm}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-md flex items-center justify-center gap-2"
                        >
                            <FaCheck size={16} />
                            Konfirmasi & Lanjutkan Pemesanan
                        </button>

                        <p className="text-xs text-center text-gray-500 mt-3">
                            💡 Klik untuk melanjutkan ke halaman pemesanan
                        </p>
                    </>
                ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
                        <p className="text-sm text-gray-600 font-medium flex items-center justify-center gap-2">
                            <FaCheck className="text-green-600" />
                            Pesanan telah dibuat
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AcceptNegoCard;
