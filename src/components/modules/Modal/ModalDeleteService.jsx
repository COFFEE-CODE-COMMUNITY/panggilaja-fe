import React from 'react'
import Modal from '../../common/Modal'
import { FaExclamationTriangle } from 'react-icons/fa'
import Button from '../../common/Button'

const ModalDeleteService = ({ onSubmit, onCancel }) => {
  return (
    <Modal isOpen={true} onClose={onCancel} width="max-w-md">
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaExclamationTriangle className="text-red-500 text-3xl" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">Hapus Jasa?</h3>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Apakah anda yakin ingin menghapus jasa ini? Tindakan ini tidak dapat dibatalkan.
        </p>

        <div className="flex gap-3">
          <Button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50"
            variant="secondary"
          >
            Batal
          </Button>
          <Button
            onClick={onSubmit}
            className="flex-1 py-3 rounded-xl text-white font-semibold shadow-lg shadow-red-500/30 bg-red-500 hover:bg-red-600 border-none"
            variant="primary"
          >
            Ya, Hapus
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalDeleteService