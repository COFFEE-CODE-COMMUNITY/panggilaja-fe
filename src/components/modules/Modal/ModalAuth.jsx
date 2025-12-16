import React from "react";
import { FaUser, FaTimes } from "react-icons/fa";
import Button from "../../common/Button";
import { useNavigate, useLocation } from "react-router-dom";

const ModalAuth = ({
    isOpen,
    onClose,
    title = "Masuk untuk Melanjutkan",
    description = "Kamu perlu akun untuk menghubungi penjual atau melakukan negosiasi harga. Yuk, masuk atau daftar sekarang!"
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                    <FaTimes size={20} />
                </button>

                <div className="text-center space-y-4 pt-2">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaUser className="text-2xl text-primary" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900">
                        {title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                        {description}
                    </p>

                    <div className="flex flex-col gap-3 pt-4">
                        <Button
                            variant="primary"
                            className="w-full py-3 rounded-xl font-semibold text-white hover:bg-primary/80"
                            onClick={() => navigate("/login", { state: { from: location } })}
                        >
                            Masuk Sekarang
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full py-3 rounded-xl font-semibold border-2 border-gray-200 hover:border-primary text-gray-700 hover:text-primary"
                            onClick={() => navigate("/register")}
                        >
                            Daftar Akun Baru
                        </Button>

                        <button
                            onClick={onClose}
                            className="text-gray-400 text-sm hover:text-gray-600 font-medium py-2 cursor-pointer"
                        >
                            Nanti Saja
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAuth;
