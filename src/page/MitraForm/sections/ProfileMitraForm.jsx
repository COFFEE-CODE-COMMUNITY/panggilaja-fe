import React, { useEffect, useState } from "react";
import Button from "../../../components/common/Button"; 
import InputForm from "../../../components/modules/form/InputForm"; 
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryService, selectCategoryService, selectCategoryServiceStatus } from "../../../features/serviceSlice";
import { addSeller, selectAddSellerStatus } from "../../../features/sellerSlice";
import { changeAccount, selectChangeAccountStatus } from "../../../features/authSlice";

function ProfileMitraForm() {
    const categorys = useSelector(selectCategoryService)
    const status = useSelector(selectCategoryServiceStatus)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const statusAdd = useSelector(selectAddSellerStatus)

    const [file, setFile] = useState(null)

    const [deskripsi_toko, setDeskripsi_Toko] = useState('')
    const [kategori_toko, setKategori] = useState('')
    const [pengalaman, setPengalaman] = useState('')
    const [skill, setSkill] = useState('')
    const [alamat, setAlamat] = useState('')
    const [provinsi, setProvinsi] = useState('')
    const [kota, setKota] = useState('')
    const [kecamatan, setKecamatan] = useState('')
    const [kode_pos, setKode_Pos] = useState('')

    useEffect(() => {
        if(!categorys){
            dispatch(getCategoryService())
        }
    },[dispatch])

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const statusChange = useSelector(selectChangeAccountStatus)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!file) {
            alert("Harap pilih file gambar jasa.");
            return;
        }

        const serviceData = {   
            deskripsi_toko,
            kategori_toko,
            pengalaman,
            skill,
            alamat,
            provinsi,
            kota,
            kecamatan,
            kode_pos
        };
        
        const formData = new FormData();
        
        formData.append('file', file);
        
        formData.append('data', JSON.stringify(serviceData));

        dispatch(addSeller(formData)).unwrap()
        .then(() => {
            dispatch(changeAccount())
        })
        .catch((error) => {
            alert(`Gagal membuat profil mitra: ${error.message || 'Terjadi kesalahan'}`);
        });
    };

    useEffect(() => {
        if(statusChange === 'success'){
            navigate('add-service')
        }
    },[statusChange])

    console.log(statusAdd)
    return (
        <div className="flex items-center justify-center h-full"> 
            <form 
                onSubmit={handleSubmit} 
                className="w-full max-w-3xl py-[25px]" 
            >
                {/* judul */}
                <h2 className="text-[25px] font-semibold text-left">
                    Tentang Tokomu
                </h2>

                <div 
                    className="
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
                            <input 
                                type='file' 
                                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 border flex items-center justify-center text-gray-400 text-sm hover:bg-gray-200 cursor-pointer"
                                onChange={handleFileChange}
                            >
                            </input>
                        </div>
                    </div>

                    {/* email */}
                    <label htmlFor="email" className="block text-[15px] font-medium text-gray-700 md:col-span-1"> 
                        Deskripsi Toko
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3"> 
                        <textarea 
                            className="w-full h-[100px] outline-1 outline-gray-200 p-[15px] rounded-[15px]" placeholder="Masukkan deskripsi toko"
                            onChange={(e) => setDeskripsi_Toko(e.target.value)}
                        >

                        </textarea>
                    </div>

                    {/* nama */}
                    <label htmlFor="name" className="block text-[15px] font-medium text-gray-700 md:col-span-1">
                        Kategori
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3">
                        <select 
                            className="bg-gray-white px-[20px] py-[15px] rounded-[15px] outline-1 outline-gray-200"
                            onChange={(e) => setKategori(e.target.value)}
                        >
                            <option disabled>Kategori Jasa</option>
                            {categorys?.status === 'success' && 
                                categorys.data.map((category) => (
                                    <option value={category.id}>{category.kategori}</option>
                                ))
                            }
                        </select>
                    </div>

                    {/* nama */}
                    <label htmlFor="name" className="block text-[15px] font-medium text-gray-700 md:col-span-1">
                        Pengalaman
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3">
                        <InputForm
                            type="text"
                            id="name"
                            placeholder="Masukkan Detail Pengalaman Anda"
                            onChange={(e) => setPengalaman(e.target.value)}
                        />
                    </div>

                    {/* nama */}
                    <label htmlFor="name" className="block text-[15px] font-medium text-gray-700 md:col-span-1">
                        Keahlian
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3">
                        <InputForm
                            type="text"
                            id="name"
                            placeholder="Masukkan Keahlian"
                            onChange={(e) => setSkill(e.target.value)}
                        />
                    </div>

                    <label htmlFor="name" className="block text-[15px] font-medium text-gray-700 md:col-span-1">
                        Alamat 
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3">
                        <InputForm
                            type="text"
                            id="name"
                            placeholder="Masukkan Detail Alamat Anda"
                            onChange={(e) => setAlamat(e.target.value)}
                        />
                    </div>

                    {/* alamat */}
                    <label className="block text-[15px] font-medium text-gray-700 md:pt-2 md:col-span-1"> 
                        Domisili
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3"> 
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                            <InputForm 
                                type="text" 
                                placeholder="Provinsi" 
                                onChange={(e) => setProvinsi(e.target.value)}
                            />
                            <InputForm 
                                type="text" 
                                placeholder="Kota" 
                                onChange={(e) => setKota(e.target.value)}
                            />
                            <InputForm 
                                type="text" 
                                placeholder="Kecamatan" 
                                onChange={(e) => setKecamatan(e.target.value)}
                            />
                            <InputForm 
                                type="text" 
                                placeholder="Kode Pos" 
                                onChange={(e) => setKode_Pos(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* button selanjut nya */}
                    <div className="hidden md:block md:col-span-1"></div> 
                    <div className="md:col-span-3 flex justify-end"> 
                        <Button type="submit" variant="secondary" className="px-6 py-2 rounded-[20px] text-white"> 
                            Selanjutnya
                        </Button>
                    </div>
                </div> 
            </form>
        </div>
    );
}

export default ProfileMitraForm;