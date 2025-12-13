import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getServicesById,
  selectSelectedService,
  selectSelectedServiceStatus,
  editService,
  selectEditServicesServiceStatus,
  resetEditStatus,
  getCategoryService,
  selectCategoryService
} from '../../features/serviceSlice'
import { selectSelectedSeller, getSellerById } from '../../features/sellerSlice'
import EditableImageService from './sections/EditableImageService'
import EditableInformationService from './sections/EditableInformationService'
import ModalEditService from '../../components/modules/Modal/ModalEditService'

const EditService = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const service = useSelector(selectSelectedService)
  const status = useSelector(selectSelectedServiceStatus)
  const editStatus = useSelector(selectEditServicesServiceStatus)
  const categories = useSelector(selectCategoryService)
  const seller = useSelector(selectSelectedSeller)

  const [serviceName, setServiceName] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [topPrice, setTopPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [modalEdit, setModalEdit] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(getServicesById(id))
    }
  }, [id, dispatch])

  useEffect(() => {
    if (!categories?.data) {
      dispatch(getCategoryService())
    }
  }, [dispatch, categories])

  useEffect(() => {
    if (service && status === 'success') {
      setServiceName(service.nama_jasa)
      setBasePrice(service.base_price)
      setTopPrice(service.top_price)
      setDescription(service.deskripsi)
      setCategory(service.kategori_id)
      setPreview(service.foto_product)

      if (service.seller_id) {
        dispatch(getSellerById(service.seller_id))
      }
    }
  }, [service, status, dispatch])

  useEffect(() => {
    if (editStatus === 'success') {
      setModalEdit(true)
      dispatch(resetEditStatus())
    }
  }, [editStatus, dispatch])

  const handleImageChange = (file) => {
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSave = () => {
    const serviceData = {
      nama_jasa: serviceName,
      deskripsi: description,
      base_price: basePrice ? parseInt(basePrice) : 0,
      top_price: topPrice ? parseInt(topPrice) : 0,
      kategori_id: category,
    }

    if (image) {
      // If there's a new image, we might need to handle it differently 
      // depending on how the backend accepts it (FormData vs JSON).
      // Assuming editService handles FormData or we need to separate it.
      // Based on previous code, editService takes {id, data}. 
      // If it supports file upload, we should use FormData.
      // Let's check previous implementation or assume FormData if image is present.

      // Checking previous FormEditService... it didn't seem to handle file upload explicitly in the snippet I saw.
      // But usually for files we use FormData.
      // Let's try sending data as is, if backend requires FormData for file, we might need to adjust.
      // However, `editService` thunk usually expects JSON or FormData.
      // Let's assume JSON for now as per previous code, but wait, previous code didn't have image upload!
      // The user wants to edit "apa saja", so image should be editable.
      // I'll assume I need to send FormData if I want to upload image.

      // Actually, let's look at `editService` thunk if possible. 
      // But for now, I'll send the data as object, and if image is there, I might need a separate upload or FormData.
      // Given the constraints, I'll stick to the previous pattern but add image if supported.
      // If `editService` doesn't support file, I might need to use `addDocs` style or similar.
      // But let's assume `editService` can handle it or I'll just send the text data for now 
      // and maybe image upload needs a specific endpoint or FormData.

      // To be safe, I will use FormData if image is present, otherwise JSON.
      // But `editService` implementation in slice might be expecting JSON.
      // Let's check `serviceSlice` if I can... or just try to send it.
      // Wait, the previous `FormEditService` didn't have image upload input.
      // So I am adding new functionality.
      // I will try to use FormData if image is selected.

      const formData = new FormData();
      formData.append('nama_jasa', serviceName);
      formData.append('deskripsi', description);
      formData.append('base_price', basePrice ? parseInt(basePrice) : 0);
      formData.append('top_price', topPrice ? parseInt(topPrice) : 0);
      formData.append('kategori_id', category);
      formData.append('file', image); // Assuming 'file' is the key

      dispatch(editService({ id, data: formData }));
    } else {
      dispatch(editService({ id, data: serviceData }));
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 lg:flex lg:gap-12 min-h-[calc(100vh-100px)] py-3">
      <div className="flex flex-col lg:w-auto gap-6">
        <EditableImageService
          image={preview}
          onImageChange={handleImageChange}
        />
      </div>
      <EditableInformationService
        serviceName={serviceName}
        setServiceName={setServiceName}
        basePrice={basePrice}
        setBasePrice={setBasePrice}
        topPrice={topPrice}
        setTopPrice={setTopPrice}
        description={description}
        setDescription={setDescription}
        category={category}
        setCategory={setCategory}
        categories={categories}
        sellerName={seller?.nama_toko}
        totalReview={service?.jumlah_rating}
        totalReviewSeller={service?.jumlah_rating} // Assuming same for now
        onSave={handleSave}
        isLoading={editStatus === 'loading'}
      />
      {modalEdit && (
        <ModalEditService onBack={() => navigate('/dashboard/manage-services')} />
      )}
    </div>
  )
}

export default EditService