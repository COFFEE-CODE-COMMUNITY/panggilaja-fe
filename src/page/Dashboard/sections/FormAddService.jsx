import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../features/authSlice';
import InputForm from '../../../components/modules/form/InputForm';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { addService, selectAddServiceStatus } from '../../../features/serviceSlice';
import { useNavigate } from 'react-router-dom';

const FormAddService = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser); 
    const status = useSelector(selectAddServiceStatus); 
    const navigate = useNavigate()
    
    const [file, setFile] = useState(null);
    const [nama_jasa, setNama_Jasa] = useState('');
    const [base_price, setBase_Price] = useState('');
    const [top_price, setTop_Price] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    
    const kategori_id = '744a6833-b60d-4873-b5ee-42876yui987y';

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!file) {
            alert("Harap pilih file gambar jasa.");
            return;
        }
        
        const serviceData = {
            nama_jasa: nama_jasa,
            deskripsi: deskripsi,
            base_price: base_price ? parseInt(base_price) : 0,
            top_price: top_price ? parseInt(top_price) : 0,
            kategori_id: kategori_id,
        };
        
        const formData = new FormData();
        
        formData.append('file', file);
        
        formData.append('data', JSON.stringify(serviceData));
        
        dispatch(addService(formData));
        
    };

    useEffect(() => {
        if(status === 'success'){
            alert('Data berhasil masuk')
            navigate('/dashboard/manage-services')
        }
    },[status])

    return (
        <form onSubmit={handleSubmit} className='flex'>
            <div className='w-1/2 flex items-center justify-center p-[30px]'>
                <input 
                    type='file' 
                    className='aspect-square w-full bg-gray-50 px-[50px] py-[200px]'
                    onChange={handleFileChange}
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
                            value='Kategori Default'
                            disabled
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

export default FormAddService;