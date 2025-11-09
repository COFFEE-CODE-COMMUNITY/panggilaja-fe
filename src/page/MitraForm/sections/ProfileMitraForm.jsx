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
    
    const provinces = useSelector(selectAllProvinces)
    const regencies = useSelector(selectAllRegencies)
    const districts = useSelector(selectAllDistricts)
    const alamatStatus = useSelector(selectAlamatStatus)

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
                            <div className='grid grid-cols-4 gap-3'>
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