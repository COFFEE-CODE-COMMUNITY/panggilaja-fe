import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../features/authSlice';
import Button from '../../../components/common/Button';
import { addDocs, getDocsById, selectAddSellerStatus } from '../../../features/sellerSlice';
import { useNavigate } from 'react-router-dom';
import ModalDocsAdded from '../../../components/modules/Modal/ModalDocsAdded';

const FormAddDocs = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            await dispatch(addDocs(formData)).unwrap();
            setShowModal(true);
        } catch (error) {
            alert(`Gagal menambahkan dokumentasi: ${error}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='flex gap-6 lg:p-6 md:p-5 p-4 w-full sm:flex-row flex-col bg-white rounded-xl shadow-sm border border-gray-100'>
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
                                        setFile(null);
                                        setPreview(null);
                                    }}
                                    className='absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600'
                                >
                                    Hapus
                                </button>
                            </>
                        ) : (
                            <div className='text-center p-8'>
                                <p className='mt-2 text-sm text-gray-600'>Klik untuk upload gambar</p>
                                <p className='mt-1 text-xs text-gray-500'>PNG, JPG, WebP (max 5MB)</p>
                            </div>
                        )}
                        <input
                            type='file'
                            accept='image/*'
                            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                <div className='w-full lg:w-1/2 flex flex-col gap-4 justify-center'>
                    <h2 className='text-2xl font-semibold mb-2'>Tambah Dokumentasi</h2>
                    <p className='text-gray-500 mb-4'>
                        Upload foto dokumentasi pekerjaan Anda untuk meyakinkan calon pelanggan.
                    </p>

                    <Button
                        type='submit'
                        variant='primary'
                        className='w-full text-white py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90'
                        disabled={!file || isSubmitting}
                    >
                        {isSubmitting ? 'Mengupload...' : 'Upload Dokumentasi'}
                    </Button>
                </div>
            </form>
            {showModal && (
                <ModalDocsAdded
                    onBack={() => navigate(`/dashboard/manage-profile/${user.id_seller}/photos`)}
                />
            )}
        </>
    );
};

export default FormAddDocs;
