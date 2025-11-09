import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../features/authSlice';
import InputForm from '../../../components/modules/form/InputForm';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { addService, getCategoryService, resetAddStatus, selectAddServiceError, selectAddServiceStatus, selectCategoryService, selectCategoryServiceStatus } from '../../../features/serviceSlice';
import { useNavigate } from 'react-router-dom';
import AddServiceStatusModal from '../../../components/modules/Modal/AddServiceStatusModal';

const FormAddService = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser); 

    const status = useSelector(selectAddServiceStatus); 
    const message = useSelector(selectAddServiceError); 

    const navigate = useNavigate()
    
    const categories = useSelector(selectCategoryService)
    const categoriesStatus = useSelector(selectCategoryServiceStatus)

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [nama_jasa, setNama_Jasa] = useState('');
    const [base_price, setBase_Price] = useState('');
    const [top_price, setTop_Price] = useState('');
    const [deskripsi, setDeskripsi] = useState(''); //  
    const [kategori_id, setKategori_Id] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        console.log('👤 Current User:', user)
        console.log('🔑 Has seller_id:', !!user?.id_seller)
        console.log('🏷️ seller_id value:', user?.id_seller)
    }, [user])

    useEffect(() => {
        if(!categories?.data){
            dispatch(getCategoryService())
        }
    },[dispatch, categories])

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        
        if (selectedFile) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
            if (!validTypes.includes(selectedFile.type)) {
                alert('Format file harus JPG, PNG, atau WebP!')
                return
            }
            
            if (selectedFile.size > 5 * 1024 * 1024) {
                alert('Ukuran file maksimal 5MB!')
                return
            }
            
            setFile(selectedFile)
            
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(selectedFile)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user?.id_seller) {
            alert("Anda harus login sebagai seller untuk menambah jasa!");
            return;
        }

        if (!file) {
            alert("Harap pilih file gambar jasa.");
            return;
        }
        
        if (!nama_jasa || !deskripsi || !base_price || !top_price || !kategori_id) {
            alert("Harap lengkapi semua field!");
            return;
        }
        
        const basePriceNum = parseInt(base_price)
        const topPriceNum = parseInt(top_price)
        
        if (basePriceNum >= topPriceNum) {
            alert("Harga terendah harus lebih kecil dari harga tertinggi!");
            return;
        }
        
        const serviceData = {
            nama_jasa: nama_jasa,
            deskripsi: deskripsi,
            base_price: basePriceNum,
            top_price: topPriceNum,
            kategori_id: kategori_id,
            seller_id: user.id_seller
        };
        
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify(serviceData));
        
        setIsSubmitting(true)
        dispatch(addService(formData));
    };  

    useEffect(() => {
        if(status === 'success') {
            alert('Jasa berhasil ditambahkan!')
            
            setFile(null)
            setPreview(null)
            setNama_Jasa('')
            setBase_Price('')
            setTop_Price('')
            setDeskripsi('')
            setKategori_Id('')
            
            dispatch(resetAddStatus())
            
            // Navigate
            setTimeout(() => {
                navigate('/dashboard/manage-services')
            }, 500)
        }
        
        if(status === 'error') {
            alert(`Gagal menambahkan jasa: ${message}`)
            setIsSubmitting(false)
        }
    }, [status, message, navigate, dispatch])

    console.log('Status:', status, 'Message:', message)
    
    return (
        <>
            <form onSubmit={handleSubmit} className='flex gap-6 lg:p-6 md:p-5 p-4 w-full sm:flex-row flex-col'>
                <div className='w-full lg:w-1/2 flex flex-col gap-4'>
                    <div className='relative aspect-square w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden hover:border-primary transition-colors'>
                        {preview ? (
                            <>
                                <img 
                                    src={preview} 
                                    alt="Preview" 
                                    className='w-full h-full object-cover'
                                />
                                <button
                                    type='button'
                                    onClick={() => {
                                        setFile(null)
                                        setPreview(null)
                                    }}
                                    className='absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600'
                                >
                                    Hapus
                                </button>
                            </>
                        ) : (
                            <div className='text-center p-8'>
                                <svg className='mx-auto h-12 w-12 text-gray-400' stroke='currentColor' fill='none' viewBox='0 0 48 48'>
                                    <path d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                                </svg>
                                <p className='mt-2 text-sm text-gray-600'>Klik untuk upload gambar</p>
                                <p className='mt-1 text-xs text-gray-500'>PNG, JPG, WebP (max 5MB)</p>
                            </div>
                        )}
                        <input 
                            type='file' 
                            accept='image/jpeg,image/jpg,image/png,image/webp'
                            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                <div className='w-full lg:w-1/2 flex flex-col gap-4'>
                    <h2 className='text-2xl font-semibold mb-2'>Detail Jasa</h2>
                    <InputForm
                        label='Nama Jasa *'
                        type='text'
                        placeholder='Contoh: Jasa Desain Logo Premium'
                        value={nama_jasa}
                        onChange={(e) => setNama_Jasa(e.target.value)}
                        required
                    />
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Kategori *
                        </label>
                        <select 
                            className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl text-gray-800 focus:border-primary focus:outline-none"
                            onChange={(e) => setKategori_Id(e.target.value)}
                            value={kategori_id}
                            required
                        >
                            <option value="">Pilih Kategori</option>
                            {categories?.data?.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {category.kategori}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Rentang Harga *
                        </label>
                        <div className='flex items-center gap-3'>
                            <Input 
                                className='border-2 border-gray-200 rounded-lg flex-1' 
                                placeholder='50000'
                                type='number' 
                                value={base_price}
                                onChange={(e) => setBase_Price(e.target.value)}
                                required
                                min='0'
                            />
                            <span className='text-gray-500'>-</span>
                            <Input 
                                className='border-2 border-gray-200 rounded-lg flex-1' 
                                placeholder='500000'
                                type='number' 
                                value={top_price}
                                onChange={(e) => setTop_Price(e.target.value)}
                                required
                                min='0'
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Deskripsi *
                        </label>
                        <textarea 
                            className='w-full py-3 px-4 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-primary focus:outline-none h-32 resize-none'
                            placeholder='Jelaskan detail jasa yang Anda tawarkan...'
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            required
                            minLength={20}
                        />
                    </div>
                    
                    <Button 
                        type='submit' 
                        variant='primary' 
                        className='w-full text-white py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90'
                        disabled={status === 'loading' || isSubmitting}
                    >
                        {status === 'loading' ? (
                            <span className='flex items-center justify-center gap-2'>
                                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                                Menambahkan...
                            </span>
                        ) : (
                            'Tambahkan Jasa'
                        )}
                    </Button>
                </div>
            </form>
            
            {status === 'success' && <AddServiceStatusModal/>}
        </>
    )
}

export default FormAddService;