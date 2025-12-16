import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowLeft, FaRegComment, FaCog, FaTrashAlt } from "react-icons/fa";
import { selectContactSeller } from '../../../../features/chatSlice';
import ModalSwitchAccount from '../../Modal/ModalSwitchAccount';
import ModalConfirmDeleteSeller from '../../Modal/ModalConfirmDeleteSeller';
import { changeAccount, selectCurrentUser } from '../../../../features/authSlice';
import { deleteSellerById, resetSellerStatusDelete, selectDeleteSellerStatus } from '../../../../features/sellerSlice';

const MobileHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contactSeller = useSelector(selectContactSeller);
    const user = useSelector(selectCurrentUser);
    const deleteSellerStatus = useSelector(selectDeleteSellerStatus);

    const [showSwitchModal, setShowSwitchModal] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Calculate unread count
    const unreadCount = contactSeller?.reduce((acc, curr) => acc + (curr.unreadCount || 0), 0) || 0;

    const getPageTitle = (pathname) => {
        if (pathname.includes('manage-order')) return 'Pesanan';
        if (pathname.includes('manage-services')) return 'Produk';
        if (pathname.includes('manage-profile')) return 'Profil';
        if (pathname.includes('add-docs')) return 'Dokumen Pendukung';
        if (pathname.includes('chat')) return 'Pesan';
        return 'Dashboard';
    };

    const title = getPageTitle(location.pathname);
    const isMainDashboard = location.pathname === '/dashboard' || location.pathname === '/dashboard/';

    useEffect(() => {
        if (deleteSellerStatus === "success") {
            dispatch(resetSellerStatusDelete());
            navigate("/");
        }
    }, [deleteSellerStatus, dispatch, navigate]);

    const handleBack = () => {
        if (isMainDashboard) {
            setShowSwitchModal(true);
        } else {
            navigate('/dashboard');
        }
    };

    const handleDeleteAccount = () => {
        dispatch(deleteSellerById(user?.id_seller));
        setShowDeleteModal(false);
    };

    return (
        <>
            <div className="fixed top-0 left-0 right-0 bg-white z-[110] px-4 py-4 md:hidden shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBack}
                            className="text-primary cursor-pointer p-1 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </button>
                        <h1 className="text-lg font-bold tracking-wide text-gray-800">{title}</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Chat Icon */}
                        <Link to="/dashboard/chat" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                            <FaRegComment size={20} />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                            )}
                        </Link>

                        {/* Settings Icon */}
                        <div className="relative">
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                            >
                                <FaCog size={20} />
                            </button>

                            {/* Dropdown Settings */}
                            {showSettings && (
                                <>
                                    <div
                                        className="fixed inset-0 z-[105]"
                                        onClick={() => setShowSettings(false)}
                                    ></div>
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-[110] animate-fade-in-down">
                                        <button
                                            onClick={() => {
                                                setShowSettings(false);
                                                setShowDeleteModal(true);
                                            }}
                                            className="cursor-pointer w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-medium flex items-center gap-2 transition-colors"
                                        >
                                            <FaTrashAlt size={14} />
                                            Hapus Akun
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showSwitchModal && (
                <ModalSwitchAccount
                    onRedirect={() => {
                        dispatch(changeAccount({ targetRole: "buyer" }));
                        navigate('/');
                        setShowSwitchModal(false);
                    }}
                    destinationName={'home'}
                    textSwitch={'Apakah Anda yakin ingin beralih ke akun Pembeli?'}
                />
            )}

            {showDeleteModal && (
                <ModalConfirmDeleteSeller
                    onConfirm={handleDeleteAccount}
                    onCancel={() => setShowDeleteModal(false)}
                    isDeleting={deleteSellerStatus === 'loading'}
                />
            )}
        </>
    );
};

export default MobileHeader;
