import React from 'react'
import Modal from '../../common/Modal'
import { FaCheckCircle, FaStore } from 'react-icons/fa'
import Button from '../../common/Button'

const ModalSuccessBecomeSeller = ({ onAddService, onSkip }) => {
    return (
        <Modal isOpen={true} width="max-w-md">
            <div className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-short">
                    <FaStore className="text-green-500 text-4xl" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">Selamat! Toko Berhasil Dibuat</h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    Akun Anda kini telah menjadi Mitra. Tambahkan jasa pertamamu untuk mulai berjualan atau atur nanti di dashboard.
                </p>

                <div className="flex flex-col gap-3">
                    <Button
                        onClick={onAddService}
                        className="w-full py-3 rounded-xl text-white font-semibold shadow-lg shadow-primary/30 cursor-pointer text-base"
                        variant="primary"
                    >
                        Tambah Jasa Sekarang
                    </Button>

                    <button
                        onClick={onSkip}
                        className="w-full py-3 rounded-xl text-gray-500 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        Nanti Saja, Ke Dashboard
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ModalSuccessBecomeSeller
