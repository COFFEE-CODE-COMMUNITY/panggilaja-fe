import React, { useEffect, useState } from "react";
import Button from "../../../components/common/Button"; 
import InputForm from "../../../components/modules/form/InputForm"; 
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryService, selectCategoryService, selectCategoryServiceStatus } from "../../../features/serviceSlice";
import { addSeller, selectAddSellerStatus } from "../../../features/sellerSlice";
import { changeAccount, resetChangeAccountStatus, selectChangeAccountStatus } from "../../../features/authSlice";
import { fetchDistricts, fetchProvinces, fetchRegencies, resetDistricts, resetRegencies, selectAlamatStatus, selectAllDistricts, selectAllProvinces, selectAllRegencies } from "../../../features/addressSlice";
import Input from "../../../components/common/Input";

function ProfileMitraForm() {
    const categorys = useSelector(selectCategoryService)
    const status = useSelector(selectCategoryServiceStatus)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const statusAdd = useSelector(selectAddSellerStatus)

    const [file, setFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const [deskripsi_toko, setDeskripsi_Toko] = useState('')
    const [kategori_toko, setKategori] = useState('')
    const [pengalaman, setPengalaman] = useState('')
    const [skill, setSkill] = useState('')
    const [alamat, setAlamat] = useState('')
    const [provinsi, setProvinsi] = useState('')
    const [kota, setKota] = useState('')
    const [kecamatan, setKecamatan] = useState('')
    const [kode_pos, setKode_Pos] = useState('')

    const provinces = useSelector(selectAllProvinces)
    const regencies = useSelector(selectAllRegencies)
    const districts = useSelector(selectAllDistricts)
    const alamatStatus = useSelector(selectAlamatStatus)

    useEffect(() => {
        if(!categorys){
            dispatch(getCategoryService())
        }
    },[dispatch])

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            // Buat preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const statusChange = useSelector(selectChangeAccountStatus)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!file) {
            alert("Harap pilih file gambar jasa.");
            return;
        }

        const provinsiName = provinces.find(p => p.code === provinsi)?.name || ''; 
        const kotaObject = regencies.find(r => r.code === kota); 
        const kotaName = kotaObject ? kotaObject.name : ''; 
        const kecamatanName = districts.find(d => d.code === kecamatan)?.name

        const serviceData = {   
            deskripsi_toko,
            kategori_toko,
            pengalaman,
            skill,
            alamat : alamat.toLowerCase(),
            provinsi : provinsiName.toLowerCase(),
            kota : kotaName.toLowerCase(),
            kecamatan : kecamatanName.toLowerCase(),
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
            dispatch(resetChangeAccountStatus());
            navigate('add-service')
        }
    },[statusChange])

    useEffect(() => {
        if (provinces.length === 0 && alamatStatus === 'idle') {
            dispatch(fetchProvinces())
        }
    }, [dispatch, provinces.length, alamatStatus])

    const handleProvinceChange = (e) => {
        const code = e.target.value
        setProvinsi(code) 
        setKota('')
        setKecamatan('')
        dispatch(resetRegencies())

        if (code) {
            dispatch(fetchRegencies(code))
        }
    }

    const handleRegencyChange = (e) => {
        const code = e.target.value
        setKota(code) 
        setKecamatan('') 
        dispatch(resetDistricts()) 

        if (code) {
            dispatch(fetchDistricts(code))
        }
    }
    
    const handleDistrictChange = (e) => {
        const code = e.target.value
        setKecamatan(code)
    }
    
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 md:gap-x-6 lg:gap-x-8 gap-y-8 md:gap-y-8 lg:gap-y-10">

                    {/* Upload Profil - IMPROVED */}
                    <div>
                        <label className="block text-[15px] md:text-[15px] lg:text-[16px] font-medium text-gray-700 mb-3">Unggah Profil</label>
                        <div className="flex items-center gap-4">
                            {/* Preview Area */}
                            <div className="relative">
                                <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
                                    {previewUrl ? (
                                        <img 
                                            src={previewUrl} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <svg 
                                            className="w-10 h-10 md:w-12 md:h-12 text-gray-400" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth="2" 
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    )}
                                </div>
                                
                                {/* Camera Icon Button */}
                                <label 
                                    htmlFor="file-upload" 
                                    className="absolute bottom-0 right-0 w-8 h-8 md:w-9 md:h-9 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-green-800 transition-colors shadow-lg"
                                >
                                    <svg 
                                        className="w-4 h-4 md:w-5 md:h-5 text-white" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" 
                                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                        />
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" 
                                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </label>
                                
                                <input 
                                    id="file-upload"
                                    type="file" 
                                    accept="image/jpeg,image/png,image/jpg"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                            
                            {/* Info Text */}
                            <div className="flex flex-col gap-1">
                                <p className="text-sm md:text-base font-medium text-gray-700">
                                    {file ? file.name : 'Pilih foto profil'}
                                </p>
                                <p className="text-xs md:text-sm text-gray-500">
                                    Format: JPG, PNG (Maks. 2MB)
                                </p>
                                {!file && (
                                    <label 
                                        htmlFor="file-upload"
                                        className="text-xs md:text-sm text-primary hover:text-green-800 font-medium cursor-pointer underline"
                                    >
                                        Pilih File
                                    </label>
                                )}
                            </div>
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
                            <div className='grid md:grid-cols-4 grid-cols-2 gap-3'>
                                <select 
                                    className='border-1 border-gray-200 px-4 py-3 rounded-lg bg-white w-full focus:border-blue-500 focus:outline-none'
                                    onChange={handleProvinceChange}
                                    value={provinsi} 
                                    required
                                    disabled={alamatStatus === 'loading' && provinces.length === 0}
                                >
                                    <option value="">
                                        {provinces.length === 0 && alamatStatus === 'loading' ? 'Memuat Provinsi...' : 'Pilih Provinsi'}
                                    </option>
                                    {provinces.map((p) => (
                                        <option key={p.code} value={p.code}>{p.name}</option>
                                    ))}
                                </select>

                                <select 
                                    className='border-1 border-gray-200 px-4 py-3 rounded-lg bg-white w-full focus:border-blue-500 focus:outline-none'
                                    onChange={handleRegencyChange}  
                                    value={kota} 
                                    required
                                    disabled={!provinsi || (alamatStatus === 'loading' && regencies.length === 0)}
                                >
                                    <option value="">
                                        {provinsi && regencies.length === 0 && alamatStatus === 'loading' ? 'Memuat Kota/Kabupaten...' : 'Pilih Kota/Kabupaten'}
                                    </option>
                                    {regencies.map((r) => (
                                        <option key={r.code} value={r.code}>{r.name}</option>
                                    ))}
                                </select>
                                
                                <select 
                                    className='border-1 border-gray-200 px-4 py-3 rounded-lg bg-white w-full focus:border-blue-500 focus:outline-none'
                                    onChange={handleDistrictChange}
                                    value={kecamatan} 
                                    required
                                    disabled={!kota || (alamatStatus === 'loading' && districts.length === 0)}
                                >
                                    <option value="">
                                        {kota && districts.length === 0 && alamatStatus === 'loading' ? 'Memuat Kecamatan...' : 'Pilih Kecamatan'}
                                    </option>
                                    {districts.map((d) => (
                                        <option key={d.code} value={d.code}>{d.name}</option>
                                    ))}
                                </select>
                                
                                <Input  
                                    placeholder='Kode Pos (contoh: 40132)' 
                                    className='border-1 border-gray-200 rounded-lg w-full px-4 py-3 focus:border-blue-500 focus:outline-none'
                                    onChange={(e) => setKode_Pos(e.target.value)}
                                    value={kode_pos}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Tombol Selanjutnya */}
                <div className="flex justify-end pt-4"> 
                    <Button 
                        type="submit" 
                        variant="primary" 
                        className="px-6 py-2 rounded-lg text-white"
                    > 
                        Selanjutnya
                    </Button>
                </div>

            </form>
        </div>
    );
}

export default ProfileMitraForm;