import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../features/authSlice';
import InputForm from '../../../components/modules/form/InputForm';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { addService, editService, resetEditStatus, selectAddServiceStatus, selectEditServicesServiceError, selectEditServicesServiceStatus } from '../../../features/serviceSlice';
import { useNavigate } from 'react-router-dom';

const FormEditService = ({serviceName, basePrice, topPrice, description, category, id}) => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser); 
    const status = useSelector(selectEditServicesServiceStatus); 
    const navigate = useNavigate()

    const [nama_jasa, setNama_Jasa] = useState(serviceName);
    const [base_price, setBase_Price] = useState(basePrice);
    const [top_price, setTop_Price] = useState(topPrice);
    const [deskripsi, setDeskripsi] = useState(description);
    
    const kategori_id = '744a6833-b60d-4873-b5ee-42876yui987y';


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
        
    };

    useEffect(() => {
        if(status === 'success'){
            alert('Data berhasil masuk')
            navigate('/dashboard/manage-services')
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
        <form onSubmit={handleSubmit} className='flex'>
            <div className='w-1/2 flex items-center justify-center p-[30px]'>
                <input 
                    type='file' 
                    className='aspect-square w-full bg-gray-50 px-[50px] py-[200px]'
                />
            </div>
            <div className='w-1/2 flex items-center justify-center'>
                <div className='w-full'>
                    <div className='flex flex-col gap-[15px]'>
                        <InputForm
                            label='Nama Jasa'
                            type='text'
                            placeholder='Masukkan Nama Jasa'
                            value={nama_jasa}
                            onChange={(e) => setNama_Jasa(e.target.value)}
                        />
                        <InputForm
                            label='Kategori Jasa'
                            type='text'
                            placeholder='Kategori Default'
                            disabled
                            value={category}
                        />
                        <div>
                            <label htmlFor="harga">Harga</label>
                            <div className='flex items-center gap-[5px]'>
                                <Input 
                                    className='border-2 border-gray-100 rounded-[15px]' 
                                    placeholder='Terendah'
                                    type='number' 
                                    value={base_price}
                                    onChange={(e) => setBase_Price(e.target.value)}
                                />
                                <p className='text-h6 font-light'>sampai</p>
                                <Input 
                                    className='border-2 border-gray-100 rounded-[15px]' 
                                    placeholder='Tertinggi'
                                    type='number' 
                                    value={top_price}
                                    onChange={(e) => setTop_Price(e.target.value)}
                                />
                            </div>
                        </div>
                        <InputForm
                            label='Deskripsi'
                            type='text'
                            placeholder='Masukkan deskripsi jasa'
                            className='h-[200px]'
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                        />
                        <Button type='submit' variant='primary' className='w-full text-white py-[15px] rounded-[35px]'>
                            Tambahkan
                        </Button>
                    </div>
                </div>
            </div>
        </form>    
    )
}

export default FormEditService;