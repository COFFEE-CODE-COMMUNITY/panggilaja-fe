import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeAccount, selectCurrentUser } from '../features/authSlice';

const SwitchAccountModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  if (!isOpen) return null;

  const handleSwitchAccount = (targetRole) => {
    dispatch(changeAccount({ targetRole }));
    onClose();
  };

  const currentRole = user?.active_role;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Ganti Akun</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <p className="text-white/90 mt-2 text-sm">
              Pilih akun yang ingin Anda gunakan
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Current Account Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-600 font-medium mb-1">
                Akun Saat Ini:
              </p>
              <p className="text-lg font-bold text-blue-900 capitalize">
                {currentRole === 'seller' ? 'Mitra (Seller)' : 'Pembeli (Buyer)'}
              </p>
            </div>

            {/* Seller Option */}
            <button
              onClick={() => handleSwitchAccount('seller')}
              disabled={currentRole === 'seller'}
              className={`w-full p-5 rounded-xl border-2 transition-all ${
                currentRole === 'seller'
                  ? 'border-primary bg-primary/5 cursor-not-allowed opacity-60'
                  : 'border-gray-200 hover:border-primary hover:bg-primary/5 hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    currentRole === 'seller'
                      ? 'bg-primary/20'
                      : 'bg-purple-100'
                  }`}
                >
                  <svg
                    className={`w-7 h-7 ${
                      currentRole === 'seller' ? 'text-primary' : 'text-purple-600'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-lg text-gray-800">
                    Akun Mitra
                    {currentRole === 'seller' && (
                      <span className="ml-2 text-xs bg-primary text-white px-2 py-1 rounded-full">
                        Aktif
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Kelola pesanan dan layanan Anda
                  </p>
                </div>
                <div>
                  {currentRole === 'seller' ? (
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </button>

            {/* Buyer Option */}
            <button
              onClick={() => handleSwitchAccount('buyer')}
              disabled={currentRole === 'buyer'}
              className={`w-full p-5 rounded-xl border-2 transition-all ${
                currentRole === 'buyer'
                  ? 'border-primary bg-primary/5 cursor-not-allowed opacity-60'
                  : 'border-gray-200 hover:border-primary hover:bg-primary/5 hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    currentRole === 'buyer' ? 'bg-primary/20' : 'bg-green-100'
                  }`}
                >
                  <svg
                    className={`w-7 h-7 ${
                      currentRole === 'buyer' ? 'text-primary' : 'text-green-600'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-lg text-gray-800">
                    Akun Pembeli
                    {currentRole === 'buyer' && (
                      <span className="ml-2 text-xs bg-primary text-white px-2 py-1 rounded-full">
                        Aktif
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Cari dan pesan layanan
                  </p>
                </div>
                <div>
                  {currentRole === 'buyer' ? (
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default SwitchAccountModal;