import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSellerById, resetSellerStatusDelete, selectDeleteSellerMessage, selectDeleteSellerStatus } from '../../features/sellerSlice'
import { selectAccessToken, selectCurrentUser } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'
import ModalConfirmDeleteSeller from '../../components/modules/Modal/ModalConfirmDeleteSeller'
import { FaTrash, FaExclamationTriangle } from 'react-icons/fa'

const ManageProfile = () => {
  const dispatch = useDispatch()
  const statusDelete = useSelector(selectDeleteSellerStatus)
  const user = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (statusDelete === 'success') {
      dispatch(resetSellerStatusDelete())
      navigate('/')
    }
  }, [statusDelete, dispatch, navigate])

  const handleDelete = () => {
    dispatch(deleteSellerById(user.id_seller))
  }

  return (
    <div className='w-full p-6'>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Pengaturan Akun Mitra</h2>
          <p className="text-gray-500 text-sm mt-1">Kelola status dan keberadaan akun mitra Anda</p>
        </div>

        <div className="p-6">
          <div className="bg-red-50 border border-red-100 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaExclamationTriangle className="text-red-600 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Hapus Akun Mitra</h3>
                <p className="text-gray-600 text-sm mt-1 max-w-xl">
                  Menghapus akun mitra akan menghapus semua layanan, ulasan, dan data terkait toko Anda secara permanen. Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium flex items-center gap-2 shadow-lg shadow-red-600/20 whitespace-nowrap"
            >
              <FaTrash size={14} />
              Hapus Akun
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <ModalConfirmDeleteSeller
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
          isDeleting={statusDelete === 'loading'}
        />
      )}
    </div>
  )
}

export default ManageProfile