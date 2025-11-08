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
            dispatch(changeAccount({targetRole : 'seller'}))
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
        <div className="flex items-center justify-center py-5 px-4 lg:px-0">
            <form 
                onSubmit={handleSubmit}
                autoComplete="off"
                className="w-full max-w-4xl py-[25px] px-4 md:px-0 space-y-6"
            >
                
                {/* Judul Form */}
                <div>
                    <h2 className="text-[25px] md:text-[25px] lg:text-[26px] font-semibold text-left">Tentang Tokomu</h2>
                    <p className="text-gray-600 text-sm md:text-sm lg:text-base">Lengkapi informasi berikut agar pelanggan lebih mudah mengenal tokomu.</p>
                </div>

                {/* Grid Form Utama */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 md:gap-x-6 lg:gap-x-8 gap-y-8 md:gap-y-8 lg:gap-y-10"> {/* pakai border = border border-gray-200 rounded-lg p-6 md:p-8 */}

                    {/* Upload Profil */}
                    <div>
                        <label className="block text-[15px] md:text-[15px] lg:text-[16px] font-medium text-gray-700">Unggah Profil</label>
                        <div className="mt-2 flex items-center gap-4 md:gap-4 lg:gap-5">
                            <input 
                                type='file' 
                                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gray-100 border flex items-center justify-center text-gray-400 text-sm md:text-sm lg:text-base hover:bg-gray-200 cursor-pointer"
                                onChange={handleFileChange}
                            />
                            <span className="text-sm md:text-sm lg:text-base text-gray-500">(jpg/png)</span>
                        </div>
                    </div>

                    {/* Kategori Toko */}
                    <div>
                        <label htmlFor="kategori_toko" className="block text-[15px] md:text-[15px] lg:text-[16px] font-medium text-gray-700">Kategori Toko</label>
                        <div className="mt-2">
                            <select 
                                id="kategori_toko"
                                className="w-full bg-gray-white px-[20px] py-[15px] rounded-[15px] outline-1 outline-gray-200 text-sm md:text-sm lg:text-base"
                                onChange={(e) => setKategori(e.target.value)}
                            >
                                <option disabled>Kategori Jasa</option>
                                {categorys?.status === 'success' && 
                                    categorys.data.map((category) => (
                                        <option key={category.id} value={category.id}>{category.kategori}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    {/* Deskripsi Toko */}
                    <div className="md:col-span-2">
                        <label htmlFor="deskripsi_toko" className="block text-[15px] md:text-[15px] lg:text-[16px] font-medium text-gray-700">Deskripsi Toko</label>
                        <div className="mt-2"> 
                            <textarea 
                                id="deskripsi_toko"
                                className="w-full h-[100px] md:h-[100px] lg:h-[110px] outline-1 outline-gray-200 p-[15px] md:p-[15px] lg:p-[16px] rounded-[15px] md:rounded-[15px] lg:rounded-[16px]" 
                                placeholder="Masukkan deskripsi toko"
                                onChange={(e) => setDeskripsi_Toko(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Pengalaman */}
                    <div>
                        <label htmlFor="pengalaman" className="block text-[15px] md:text-[15px] lg:text-[16px] font-medium text-gray-700">Pengalaman</label>
                        <div className="mt-2">
                            <InputForm
                                type="text"
                                id="pengalaman"
                                placeholder="Masukkan Detail Pengalaman Anda"
                                onChange={(e) => setPengalaman(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Keahlian */}
                    <div>
                        <label htmlFor="keahlian" className="block text-[15px] md:text-[15px] lg:text-[16px] font-medium text-gray-700">Keahlian</label>
                        <div className="mt-2">
                            <InputForm
                                type="text"
                                id="keahlian"
                                placeholder="Masukkan Keahlian"
                                onChange={(e) => setSkill(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Alamat */}
                    <div className="md:col-span-2">
                        <label htmlFor="alamat" className="block text-[15px] md:text-[15px] lg:text-[16px] font-medium text-gray-700">Alamat</label>
                        <div className="mt-2">
                            <textarea 
                                id="alamat"
                                className="w-full h-[100px] md:h-[100px] lg:h-[110px] outline-1 outline-gray-200 p-[15px] md:p-[15px] lg:p-[16px] rounded-[15px] md:rounded-[15px] lg:rounded-[16px]" 
                                placeholder="Masukkan Detail Alamat Anda"
                                onChange={(e) => setAlamat(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Domisili */}
                    <div className="md:col-span-2"> 
                        <label className="block text-[15px] md:text-[15px] lg:text-[16px] font-medium text-gray-700">Domisili</label>
                        <div className="mt-2"> 
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
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
                    </div>

                </div>

                {/* Tombol Selanjutnya */}
                <div className="flex justify-end pt-4"> 
                    <Button 
                        type="submit" 
                        variant="secondary" 
                        className="px-6 py-2 rounded-[20px] text-white"
                    > 
                        Selanjutnya
                    </Button>
                </div>

            </form>
        </div>
    );
}

export default ProfileMitraForm;