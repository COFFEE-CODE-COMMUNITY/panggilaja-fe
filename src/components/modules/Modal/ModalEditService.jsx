import React from 'react'
import Modal from '../../common/Modal'
import { FaCheckCircle } from 'react-icons/fa'
import Button from '../../common/Button'

const ModalEditService = ({ onBack }) => {
  return (
    <Modal isOpen={true} width="max-w-sm">
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="text-green-500 text-3xl" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">Jasa Berhasil Diupdate!</h3>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Perubahan pada jasa anda telah berhasil disimpan.
        </p>

        <Button
          onClick={onBack}
          className="w-full py-3 rounded-xl text-white font-semibold shadow-lg shadow-primary/30 cursor-pointer"
          variant="primary"
        >
          Kembali ke Kelola Jasa
        </Button>
      </div>
    </Modal>
  )
}

export default ModalEditService