import React from 'react';
import Modal from '../../common/Modal'
import Button from '../../common/Button';

const ModalConfirmDeleteDocs = ({ onConfirm, onCancel, isDeleting }) => {
    return (
        <Modal isOpen={true} onClose={onCancel} title="Hapus Dokumentasi">
            <div className="flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Hapus Foto?</h3>
                <p className="text-gray-500 mb-6">
                    Apakah Anda yakin ingin menghapus foto dokumentasi ini? Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex gap-3 w-full">
                    <Button
                        onClick={onCancel}
                        className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300 py-3 rounded-2xl cursor-pointer"
                        disabled={isDeleting}
                    >
                        Batal
                    </Button>
                    <Button
                        variant="primary"
                        onClick={onConfirm}
                        className="flex-1 text-white py-3 rounded-2xl hover:bg-primary/80 cursor-pointer"
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalConfirmDeleteDocs;
