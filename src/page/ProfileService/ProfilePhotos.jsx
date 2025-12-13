import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getDocsById, selectSellerDocs, selectSellerDocsStatus, deleteDocs } from '../../features/sellerSlice'
import { selectCurrentUser } from '../../features/authSlice'
import ModalConfirmDeleteDocs from '../../components/modules/Modal/ModalConfirmDeleteDocs'

const ProfilePhotos = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const docs = useSelector(selectSellerDocs)
  const status = useSelector(selectSellerDocsStatus)

  const [selectedImage, setSelectedImage] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(getDocsById(id))
    }
  }, [dispatch, id])

  const openLightbox = (image) => {
    setSelectedImage(image)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const confirmDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    try {
      await dispatch(deleteDocs(deleteId)).unwrap()
      dispatch(getDocsById(id))
      setDeleteId(null)
    } catch (error) {
      alert('Gagal menghapus foto')
    } finally {
      setIsDeleting(false)
    }
  }

  const isOwner = user?.id_seller === id

  return (
    <div className='min-h-screen p-4'>
      {isOwner && (
        <div className="mb-6 flex justify-end">
          <Link
            to="/dashboard/add-docs"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Tambah Dokumentasi
          </Link>
        </div>
      )}

      {status === 'loading' ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-x-2 gap-y-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {docs?.map((doc) => (
            <div
              key={doc.id}
              className="group relative cursor-pointer"
              onClick={() => openLightbox(doc.foto_testimoni)}
            >
              <img
                src={doc.foto_testimoni}
                alt="Dokumentasi"
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8 transition-opacity"
              />
              {isOwner && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setDeleteId(doc.id)
                  }}
                  className="absolute -top-2 -right-2 p-2 bg-white text-gray-500 rounded-full hover:bg-gray-100 z-10 shadow-lg transition-transform hover:scale-110 border border-gray-200"
                  title="Hapus Foto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          {(!docs || docs.length === 0) && (
            <div className="col-span-full text-center py-8 text-gray-500">
              Belum ada dokumentasi.
            </div>
          )}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-200 focus:outline-none"
            onClick={closeLightbox}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={selectedImage}
            alt="Full size documentation"
            className="max-h-[75vh] max-w-[75vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <ModalConfirmDeleteDocs
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  )
}

export default ProfilePhotos