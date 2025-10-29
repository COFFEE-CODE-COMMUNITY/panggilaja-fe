import React, { useEffect } from "react";
import Button from "../../../components/common/Button"; 
import InputForm from "../../../components/modules/form/InputForm"; 
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryService, selectCategoryService, selectCategoryServiceStatus } from "../../../features/serviceSlice";

function ProfileMitraForm({ onFormSubmit }) {
    const category = useSelector(selectCategoryService)
    const status = useSelector(selectCategoryServiceStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategoryService())
    },[dispatch])

    const handleLanjut = (e) => {
        e.preventDefault();
        onFormSubmit();
    };

    console.log(category)
    return (
        <div className="flex items-center justify-center"> 
            <form 
                onSubmit={handleLanjut} 
                className="p-6 md:p-10 w-full max-w-3xl space-y-6" 
            >
                {/* judul */}
                <h2 className="text-[25px] font-semibold text-left">
                    Tentang Tokomu
                </h2>

                <div 
                    className="
                        space-y-6 
                        md:space-y-0 md:grid md:grid-cols-4 
                        md:gap-x-6 md:gap-y-6        
                        lg:gap-x-8 lg:gap-y-8
                    "
                >
                    
                    {/* upload profile */}
                    <label className="block text-[15px] font-medium text-gray-700 md:pt-2 md:col-span-1"> 
                        Unggah Profil
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3"> 
                        <div className="flex items-center gap-4">
                            
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 border flex items-center justify-center text-gray-400 text-sm hover:bg-gray-200 cursor-pointer">
                                <span className="text-[12px] md:text-[14px]">Foto</span>
                            </div>
                            <Button
                                type="button"
                                variant="secondary" 
                                className="text-[15px] px-4 py-2 rounded-[20px] text-white"
                            >
                                Unggah
                            </Button>
                        </div>
                    </div>

                    {/* email */}
                    <label htmlFor="email" className="block text-[15px] font-medium text-gray-700 md:col-span-1"> 
                        Email
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3"> 
                        <InputForm
                            type="email"
                            id="email"
                            placeholder="Masukkan email"
                        />
                    </div>

                    {/* kategori */}
                    <label htmlFor="name" className="block text-[15px] font-medium text-gray-700 md:col-span-1">
                        Kategori
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3">
                        <select>
                            
                        </select>
                    </div>

                    {/* pengalaman */}
                    <label htmlFor="name" className="block text-[15px] font-medium text-gray-700 md:col-span-1">
                        Pengalaman
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3">
                        <InputForm
                            type="text"
                            id="name"
                            placeholder="Masukkan pengalaman"
                        />
                    </div>

                    {/* keahlian */}
                    <label htmlFor="name" className="block text-[15px] font-medium text-gray-700 md:col-span-1">
                        Keahlian
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3">
                        <InputForm
                            type="text"
                            id="name"
                            placeholder="Masukkan keahlian"
                        />
                    </div>

                    {/* deskripsi toko */}
                    <label htmlFor="deskripsi" className="block text-[15px] font-medium text-gray-700 md:pt-2 md:col-span-1"> 
                        Deskripsi Toko
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3"> 
                        <InputForm
                            as="textarea" 
                            id="deskripsi"
                            rows="4" 
                            placeholder="Masukkan deskripsi toko"
                        />
                    </div>

                    {/* alamat */}
                    <label className="block text-[15px] font-medium text-gray-700 md:pt-2 md:col-span-1"> 
                        Alamat
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3"> 
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                            <InputForm type="text" placeholder="Provinsi" />
                            <InputForm type="text" placeholder="Kota" />
                            <InputForm type="text" placeholder="Kecamatan" />
                            <InputForm type="text" placeholder="Kode Pos" />
                        </div>
                    </div>

                    {/* button selanjut nya */}
                    <div className="hidden md:block md:col-span-1"></div> 
                    <div className="md:col-span-3 flex justify-end"> 
                        <Link to='/partner/mitra-form/add-service'>
                            <Button type="submit" variant="secondary" className="px-6 py-2 rounded-[20px] text-white"> 
                                Selanjutnya
                            </Button>
                        </Link>
                    </div>
                </div> 
            </form>
        </div>
    );
}

export default ProfileMitraForm;