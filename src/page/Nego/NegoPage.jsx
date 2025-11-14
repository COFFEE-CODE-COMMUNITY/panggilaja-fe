<<<<<<< HEAD
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getServicesById, selectSelectedService, selectSelectedServiceStatus } from '../../features/serviceSlice'
import { useEffect, useState } from 'react'
import { selectCurrentUser } from '../../features/authSlice'
import { FaComments, FaExclamationCircle, FaTimes, FaCheckCircle } from 'react-icons/fa'
import Button from '../../components/common/Button'
import { selectSeeAddress } from '../../features/userSlice'
=======
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../config/socket";
import {
  getServicesById,
  selectSelectedService,
  selectSelectedServiceStatus,
} from "../../features/serviceSlice";
import { useEffect, useState } from "react";
import { selectCurrentUser } from "../../features/authSlice";
import {
  FaComments,
  FaExclamationCircle,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import Button from "../../components/common/Button";
import { selectSeeAddress } from "../../features/userSlice";
>>>>>>> cc706d464aa23b0bfd33d2a8a9f75eed6a96621f

const NegoPage = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const service = useSelector(selectSelectedService)
    const status = useSelector(selectSelectedServiceStatus)
    const user = useSelector(selectCurrentUser)
    const address = useSelector(selectSeeAddress)

    const [showModal, setShowModal] = useState(false)
    const [harga, setHarga] = useState('')
    const [pesan, setPesan] = useState('')
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if(id){
            dispatch(getServicesById(id))
        }
    },[id, dispatch])

    const validateForm = () => {
        const newErrors = {}
        
        if (!harga || harga <= 0) {
            newErrors.harga = 'Harga harus diisi dan lebih dari 0'
        } else if (service?.base_price && harga < service.base_price * 0.5) {
            newErrors.harga = `Harga terlalu rendah. Minimal sekitar ${service.base_price * 0.5}`
        } else if (service?.top_price && harga > service.top_price * 1.5) {
            newErrors.harga = `Harga terlalu tinggi. Maksimal sekitar ${service.top_price * 1.5}`
        }
        
        if (!pesan || pesan.trim().length < 10) {
            newErrors.pesan = 'Pesan harus diisi minimal 10 karakter'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            setShowModal(true)
        }
    }

    const handleConfirmNego = () => {
        console.log('Nego dikirim:', { harga, pesan, serviceId: id })
        setShowModal(false)
        //navigate to chat page (ubah ini)
        navigate(`/chat/${service?.seller_id}?negoSent=true`)
    }

<<<<<<< HEAD
    const handleChatSeller = () => {
        navigate(`/chat/${service?.seller_id}`)
    }
=======
  const handleConfirmNego = () => {
    setShowModal(false);

    const imageUrl =
      service?.foto_product ||
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400";
    const shortDescription =
      (service?.deskripsi || "").substring(0, 50) + "...";

    const formattedBasePrice = (service?.base_price || 0).toLocaleString(
      "id-ID"
    );
    const formattedNegoPrice = parseInt(harga).toLocaleString("id-ID");

    // 🆕 TAMBAHKAN ServiceID di message
    const autoMessage = `Halo, saya tertarik dengan layanan "${service?.nama_jasa}". (ServiceID: ${service?.id}) (Harga: Rp ${formattedBasePrice}) (Nego: Rp ${formattedNegoPrice}) (Deskripsi: ${shortDescription}) (Gambar: ${imageUrl})`;

    const messageData = {
      id_buyer: user.id_buyer,
      id_seller: service.seller_id,
      text: autoMessage,
      sender_role: "BUYER",
    };

    console.log("📤 Mengirim penawaran via socket:", messageData);
    socket.emit("send_message", messageData);

    navigate(`/chat/${service.seller_id}`);
  };
>>>>>>> cc706d464aa23b0bfd33d2a8a9f75eed6a96621f

    if(status === 'loading') {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
                    <p className='text-gray-600'>Memuat data...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='lg:pt-20 md:pt-18 pt-15 min-h-screen py-[25px] sm:bg-gray-50 bg-white xl:px-[150px] lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px]'>
            <div className='w-full flex justify-center'>
                <div className='md:flex md:flex-row flex flex-col gap-[10px]'>
                    <div className='md:w-3/4 w-full md:h-full lg:py-[25px] md:py-[15px] py-[10px] flex flex-col gap-[20px] sm:border-2 sm:border-gray-100 bg-white rounded-lg'>
                        <div className='bg-blue-50 border-l-4 border-primary p-4 rounded-r-lg'>
                            <div className='flex items-start gap-3'>
                                <FaExclamationCircle className='text-primary text-xl mt-0.5 flex-shrink-0'/>
                                <div className='flex-1'>
                                    <h4 className='font-semibold text-primary mb-1'> Sebaiknya Chat Penjual Terlebih Dahulu</h4>
                                    <p className='text-sm mb-3'>
                                        Untuk hasil terbaik, diskusikan kebutuhan Anda dengan penjual sebelum mengajukan penawaran. 
                                        Ini membantu memastikan harga dan layanan sesuai ekspektasi.
                                    </p>
                                    <button
                                        type='button'
                                        onClick={handleChatSeller}
                                        className='flex items-center gap-2 bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium'
                                    >
                                        <FaComments />
                                        Chat Penjual Sekarang
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Detail Jasa */}
                        <div className='md:hidden border-2 border-gray-100 bg-white px-[10px] py-[5px] flex flex-col gap-[10px] rounded-lg'>
                            <div className='flex items-center cursor-pointer'>
                                <p className='w-full font-medium'>Detail Jasa</p>
                            </div>

                            <Link
                                to={`/service/${id}`}
                                className={`flex gap-[5px] transition-all duration-500 overflow-hidden md:gap-[15px]`}
                            >
                                <img src={service?.foto_product} alt={service?.nama_jasa} className='w-1/3 h-30 object-cover rounded-[10px]'/>
                                <div className='flex flex-col justify-center'>
                                    <p className='font-medium'>{service?.nama_jasa}</p>
                                    <p className='text-sm text-gray-600'>Rp {service?.base_price?.toLocaleString()} - Rp {service?.top_price?.toLocaleString()}</p>
                                </div>
                            </Link>
                        </div>

                        {/* Alamat Section */}
                        <div>
                            <p className='font-semibold mb-2 text-gray-700'>Alamat</p>
                            <div className='w-full px-[15px] py-[10px] bg-gray-50 rounded-[15px] border border-gray-200'>
                                <div className='flex flex-col gap-1'>
                                    <p className='font-medium text-gray-800'>{user?.username}</p>
                                    <p className='text-sm text-gray-600'>
                                        {address?.data?.alamat}, {address?.data?.kota}, {address?.data?.kecamatan}, {address?.data?.provinsi}, {address?.data?.kode_pos} 
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form Nego */}
                        <div className='flex flex-col gap-[20px]'>
                            <div>                                
                                {/* Input Harga */}
                                <div className='flex flex-col gap-2 mb-4'>
                                    <label htmlFor="harga" className='font-medium text-gray-700'>
                                        Harga Penawaran <span className='text-red-500'>*</span>
                                    </label>
                                    <div className='relative'>
                                        <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500'>Rp</span>
                                        <input 
                                            type='number' 
                                            id='harga'
                                            value={harga}
                                            onChange={(e) => setHarga(e.target.value)}
                                            placeholder='Masukkan penawaran harga' 
                                            className={`w-full pl-12 pr-4 py-3 focus:outline-0 focus:ring-2 focus:ring-primary rounded-[15px] border-2 ${errors.harga ? 'border-red-500' : 'border-gray-200'} transition-all`}
                                        />
                                    </div>
                                    {errors.harga && (
                                        <p className='text-red-500 text-sm flex items-center gap-1'>
                                            <FaExclamationCircle className='text-xs'/> {errors.harga}
                                        </p>
                                    )}
                                    <p className='text-xs text-gray-500'>
                                        Range harga: Rp {service?.base_price?.toLocaleString()} - Rp {service?.top_price?.toLocaleString()}
                                    </p>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="pesan" className='font-medium text-gray-700'>
                                        Detail Kebutuhan <span className='text-red-500'>*</span>
                                    </label>
                                    <textarea 
                                        name="pesan" 
                                        id="pesan" 
                                        value={pesan}
                                        onChange={(e) => setPesan(e.target.value)}
                                        placeholder='Jelaskan detail kebutuhan Anda, timeline, dan hal penting lainnya...' 
                                        className={`h-[200px] border-2 ${errors.pesan ? 'border-red-500' : 'border-gray-200'} p-[15px] rounded-[15px] focus:outline-0 focus:ring-2 focus:ring-primary transition-all resize-none`}
                                    />
                                    {errors.pesan && (
                                        <p className='text-red-500 text-sm flex items-center gap-1'>
                                            <FaExclamationCircle className='text-xs'/> {errors.pesan}
                                        </p>
                                    )}
                                    <p className='text-xs text-gray-500'>
                                        Minimal 10 karakter • {pesan.length} karakter
                                    </p>
                                </div>
                            </div>
                            
                            <Button
                                variant='primary'
                                onClick={handleSubmit}
                                className='hover:bg-primary/90 text-white px-[20px] py-[15px] w-full rounded-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                Kirim
                            </Button>

                            <p className='text-xs text-center text-gray-500'>
                                Dengan mengirim penawaran, Anda menyetujui untuk berkomunikasi dengan penjual melalui chat
                            </p>
                        </div>
                    </div>

                    {/* Desktop Detail Jasa Sidebar */}
                    <div className='md:w-1/4 hidden h-fit sticky top-4 border-2 border-gray-100 bg-white px-[15px] py-[15px] md:flex md:flex-col gap-[15px] rounded-lg'>
                        <p className='font-semibold text-gray-800'>Detail Jasa</p>
                        <div className='flex flex-col gap-[10px]'>
                            <div 
                                className='w-full h-[200px] rounded-[15px] bg-gray-200'
                                style={{
                                    backgroundImage: `url(${service?.foto_product})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            />
                            <div>
                                <p className='font-semibold text-gray-800 mb-1'>{service?.nama_jasa}</p>
                                <p className='text-sm text-gray-600 mb-3'>
                                    Rp {service?.base_price?.toLocaleString()} - Rp {service?.top_price?.toLocaleString()}
                                </p>
                                <Button
                                    type='button'
                                    to={`/service/${id}`}
                                    className='w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 cursor-pointer text-white px-4 py-2.5 rounded-lg transition-colors text-sm font-medium'
                                >
                                    Detail Jasa
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Konfirmasi */}
            {showModal && (
                <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn'>
                    <div className='bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-slideUp'>
                        <div className='flex justify-between items-start mb-4'>
                            <div className='flex items-center gap-3'>
                                <div className='bg-blue-100 p-3 rounded-full'>
                                    <FaCheckCircle className='text-primary text-2xl'/>
                                </div>
                                <h3 className='font-bold text-xl text-gray-800'>Konfirmasi Penawaran</h3>
                            </div>
                            <button 
                                onClick={() => setShowModal(false)}
                                className='text-gray-400 hover:text-gray-600 transition-colors'
                            >
                                <FaTimes className='text-xl cursor-pointer'/>
                            </button>
                        </div>
                        
                        <div className='mb-6 space-y-3'>
                            <p className='text-gray-600'>Apakah Anda yakin ingin mengirim penawaran ini?</p>
                            
                            <div className='bg-gray-50 p-4 rounded-lg space-y-2'>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Jasa:</span>
                                    <span className='font-semibold text-gray-800'>{service?.nama_jasa}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Harga Penawaran:</span>
                                    <span className='font-semibold text-green-600'>Rp {parseInt(harga).toLocaleString()}</span>
                                </div>
                            </div>
                            
                            <p className='text-sm text-gray-500 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400'>
                                Penawaran akan dikirim ke penjual melalui chat. Anda dapat melanjutkan negosiasi di sana.
                            </p>
                        </div>
                        
                        <div className='flex gap-3'>
                            <button
                                onClick={() => setShowModal(false)}
                                className='flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors cursor-pointer'
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleConfirmNego}
                                className='flex-1 px-4 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-md cursor-pointer'
                            >
                                Ya, Kirim
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NegoPage