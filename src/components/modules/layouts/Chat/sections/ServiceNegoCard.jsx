import React, { useState } from "react";
import { FaStar, FaCheck, FaTimes, FaExchangeAlt } from "react-icons/fa";
import Button from "../../../../common/Button";

const ServiceNegoCard = ({
    data,
    onAccept,
    onReject,
    onCounterOffer,
    isSeller,
    senderRole,
    myRole,
}) => {
    const [showNegoInput, setShowNegoInput] = useState(false);
    const [counterPrice, setCounterPrice] = useState("");

    const canTakeAction = senderRole !== myRole;

    const handleCounterOffer = () => {
        if (counterPrice && parseInt(counterPrice) > 0) {
            onCounterOffer(parseInt(counterPrice));
            setShowNegoInput(false);
            setCounterPrice("");
        }
    };

    return (
        <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow max-w-sm">
            {/* Image Section */}
            <div className="relative">
                <img
                    src={data.image}
                    alt={data.serviceName}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <FaStar className="text-yellow-400" size={14} />
                    <span className="text-sm font-semibold">{data.rating || 4.5}</span>
                </div>
                <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    💰 PENAWARAN NEGO
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {data.serviceName}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    Ket: {data.description || "Tidak ada detail kebutuhan"}
                </p>

                {/* Price Section with Strike-through */}
                <div className="mb-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Harga Normal</p>
                            <p className="text-lg text-gray-400 line-through font-semibold">
                                {data.originalPrice}
                            </p>
                        </div>
                        <div className="bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                            NEGO!
                        </div>
                    </div>
                    <div className="pt-2 border-t border-orange-200">
                        <p className="text-xs text-gray-600 mb-1">Harga Penawaran</p>
                        <p className="text-2xl font-bold text-orange-600">
                            {data.negoPrice}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                {canTakeAction ? (
                    !showNegoInput ? (
                        <div className="flex gap-2">
                            <Button
                                onClick={onAccept}
                                variant="primary"
                                className="flex-1 text-white py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 flex items-center justify-center gap-1 shadow-md"
                            >
                                <FaCheck size={14} />
                                Terima
                            </Button>
                            <Button
                                onClick={onReject}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 flex items-center justify-center gap-1 shadow-md"
                            >
                                <FaTimes size={14} />
                                Tolak
                            </Button>
                            <Button
                                onClick={() => setShowNegoInput(true)}
                                variant="secondary"
                                className="flex-1 text-white py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 flex items-center justify-center gap-1 shadow-md"
                            >
                                <FaExchangeAlt size={14} />
                                Nego
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                    Rp
                                </span>
                                <input
                                    type="number"
                                    value={counterPrice}
                                    onChange={(e) => setCounterPrice(e.target.value)}
                                    placeholder="Masukkan harga balasan"
                                    className="w-full pl-10 pr-4 py-2.5 border-2 border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleCounterOffer}
                                    variant="primary"
                                    className="flex-1 text-white py-2 rounded-xl text-sm font-bold transition-all"
                                >
                                    Kirim Nego
                                </Button>
                                <Button
                                    onClick={() => {
                                        setShowNegoInput(false);
                                        setCounterPrice("");
                                    }}
                                    className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-xl text-sm font-bold transition-all"
                                >
                                    Batal
                                </Button>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
                        <p className="text-sm text-gray-600 font-medium flex items-center justify-center gap-2">
                            <span className="animate-pulse">⏳</span>
                            Menunggu respons {isSeller ? "buyer" : "penjual"}
                        </p>
                    </div>
                )}

                {/* Info Footer */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center">
                        {canTakeAction
                            ? "💡 Giliran Anda untuk merespons penawaran"
                            : "💡 Menunggu respons dari pihak lain"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ServiceNegoCard;
