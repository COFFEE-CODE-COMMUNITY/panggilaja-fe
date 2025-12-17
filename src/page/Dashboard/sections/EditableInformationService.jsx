import React from 'react';
import { FaStar } from 'react-icons/fa';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import ModalSelect from '../../../components/common/ModalSelect';

const EditableInformationService = ({
    serviceName,
    setServiceName,
    basePrice,
    setBasePrice,
    topPrice,
    setTopPrice,
    description,
    setDescription,
    category,
    setCategory,
    categories,
    sellerName,
    totalReview,
    totalReviewSeller,
    onSave,
    isLoading
}) => {
    return (
        <div className="h-full flex-1 w-full flex flex-col gap-6 lg:py-0 py-6">
            <div className="flex flex-col gap-6">
                {/* header */}
                <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                        <div className="space-y-3 w-full">
                            <div className="text-sm font-medium text-primary flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                                    {sellerName?.charAt(0) || 'S'}
                                </div>
                                {sellerName}
                            </div>

                            {/* Editable Name */}
                            <input
                                type="text"
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                                className="w-full text-2xl md:text-3xl font-bold text-gray-900 border-b-2 border-transparent hover:border-gray-200 focus:border-primary focus:outline-none bg-transparent transition-colors placeholder-gray-400"
                                placeholder="Nama Jasa"
                            />

                            {/* Category Dropdown */}
                            <div className="w-48">
                                <ModalSelect
                                    placeholder="Pilih Kategori"
                                    title="Pilih Kategori"
                                    options={categories?.data?.map(cat => ({ value: cat.id, label: cat.kategori })) || []}
                                    value={category}
                                    onChange={(val) => setCategory(val)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400" />
                            <span className="font-medium text-gray-900">{totalReview || 0}</span>
                            <span>({totalReview || 0} ulasan)</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <div>{totalReviewSeller || 0} Pesanan selesai</div>
                    </div>
                </div>

                <div className="h-px bg-gray-100"></div>

                {/* harga selection */}
                <div>
                    <p className="text-sm text-gray-500 mb-2">Mulai dari</p>
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1 max-w-[200px]">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">Rp</span>
                            <Input
                                type="number"
                                value={basePrice}
                                onChange={(e) => setBasePrice(e.target.value)}
                                className="w-full pl-10 py-2 text-xl font-bold text-primary border-2 border-gray-100 rounded-lg focus:border-primary focus:outline-none"
                                placeholder="Min"
                            />
                        </div>
                        <span className="text-gray-400 font-bold">-</span>
                        <div className="relative flex-1 max-w-[200px]">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">Rp</span>
                            <Input
                                type="number"
                                value={topPrice}
                                onChange={(e) => setTopPrice(e.target.value)}
                                className="w-full pl-10 py-2 text-xl font-bold text-primary border-2 border-gray-100 rounded-lg focus:border-primary focus:outline-none"
                                placeholder="Max"
                            />
                        </div>
                    </div>
                </div>

                {/* deskripsi selection */}
                <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Deskripsi Layanan</h3>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-600 text-sm leading-relaxed focus:border-primary focus:outline-none h-40 resize-none"
                        placeholder="Jelaskan detail jasa yang Anda tawarkan..."
                    />
                </div>

                {/* button */}
                <div className="flex gap-3 mt-2">
                    <Button
                        variant="primary"
                        className="flex-1 rounded-lg text-white font-medium h-[50px] hover:bg-primary/90 flex items-center justify-center w-full shadow-lg shadow-primary/30"
                        onClick={onSave}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className='flex items-center justify-center gap-2'>
                                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                                Menyimpan...
                            </span>
                        ) : (
                            'Simpan Perubahan'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditableInformationService;
