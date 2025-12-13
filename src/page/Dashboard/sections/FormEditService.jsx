import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../features/authSlice';
import InputForm from '../../../components/modules/form/InputForm';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { addService, editService, getCategoryService, resetEditStatus, selectAddServiceStatus, selectCategoryService, selectEditServicesServiceError, selectEditServicesServiceStatus } from '../../../features/serviceSlice';
import { useNavigate } from 'react-router-dom';
import ModalEditService from '../../../components/modules/Modal/ModalEditService';

const FormEditService = ({serviceName, basePrice, topPrice, description, category, id, image}) => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser); 
    const status = useSelector(selectEditServicesServiceStatus); 
    const navigate = useNavigate()

    const categories = useSelector(selectCategoryService)
    
    const [preview, setPreview] = useState(image);
    const [kategori_id, setKategori_Id] = useState(category);
    const [nama_jasa, setNama_Jasa] = useState(serviceName);
    const [base_price, setBase_Price] = useState(basePrice);
    const [top_price, setTop_Price] = useState(topPrice);
    const [deskripsi, setDeskripsi] = useState(description);
    const [modalEdit, setModalEdit] = useState(false);
    
    useEffect(() => {
        if(!categories?.data){
            dispatch(getCategoryService())
        }
    },[dispatch, categories])

    useEffect(() => {
        if (category) {
            setKategori_Id(category);
        }
    }, [category, categories]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const serviceData = {
            nama_jasa: nama_jasa,
            deskripsi: deskripsi,
            base_price: base_price ? parseInt(base_price) : 0,
            top_price: top_price ? parseInt(top_price) : 0,
            kategori_id: kategori_id,
        };
                
        dispatch(editService({id, data : serviceData}));
        setModalEdit(true)
    };

    useEffect(() => {
        if(status === 'success'){
            dispatch(resetEditStatus())
        }
    },[status])

    if (status === 'loading') {
        return (
            <div className='flex justify-center items-center min-h-screen w-full bg-white'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
                    <p className='mt-4 text-gray-600'>Memuat data...</p>
                </div>
            </div>
        )
    }
    return (
        <form onSubmit={handleSubmit} className='flex gap-6 lg:p-6 md:p-5 p-4 w-full sm:flex-row flex-col'>
            <div className='w-full lg:w-1/2 flex flex-col gap-4'>
                <div className='relative aspect-square w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden hover:border-primary transition-colors'>
                    <img 
                        src={preview} 
                        alt="Preview" 
                        className='w-full h-full object-cover'
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
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? (
                        <span className='flex items-center justify-center gap-2'>
                            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                            Mengubah....
                        </span>
                    ) : (
                        'Edit Jasa'
                    )}
                </Button>
            </div>
            {modalEdit && (
                <ModalEditService onBack={() => navigate('/dashboard/manage-services')}/>
            )}
        </form>
    )
}

export default FormEditService;