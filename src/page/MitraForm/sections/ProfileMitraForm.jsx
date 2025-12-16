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
import ModalSelect from "../../../components/common/ModalSelect"; // Updated import
import AddressPickerModal from "../../../components/modules/form/AddressPickerModal"; // New import

function ProfileMitraForm() {
    const categorys = useSelector(selectCategoryService)
    const status = useSelector(selectCategoryServiceStatus)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const statusAdd = useSelector(selectAddSellerStatus)

    const [file, setFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const [deskripsi_toko, setDeskripsi_Toko] = useState('')
    // const [kategori_toko, setKategori] = useState('') // Removed
    const [selectedSkillIds, setSelectedSkillIds] = useState([]) // New multi-select state
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
        if (!categorys) {
            dispatch(getCategoryService())
        }
    }, [dispatch])

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

        // Derive skill string and primary category
        const skillString = selectedSkillIds.map(id => {
            const cat = categorys?.data?.find(c => c.id === id);
            return cat ? cat.kategori : '';
        }).filter(Boolean).join(', ');

        const primaryCategory = selectedSkillIds.length > 0 ? selectedSkillIds[0] : '';

        const serviceData = {
            deskripsi_toko,
            kategori_toko: primaryCategory, // Use first selected skill as primary category
            skill: skillString, // Keep skill for Skill table compatibility
            pengalaman: skillString, // Map to pengalaman for display
            alamat: alamat.toLowerCase(),
            provinsi: provinsiName.toLowerCase(),
            kota: kotaName.toLowerCase(),
            kecamatan: kecamatanName.toLowerCase(),
            kode_pos
        };

        const formData = new FormData();

        formData.append('file', file);

        formData.append('data', JSON.stringify(serviceData));

        dispatch(addSeller(formData)).unwrap()
            .then(() => {
                dispatch(changeAccount({ targetRole: 'seller' }))
            })
    };

    useEffect(() => {
        if (statusChange === 'success') {
            dispatch(resetChangeAccountStatus());
            navigate('add-service')
        }
    }, [statusChange])

    useEffect(() => {
        if (provinces.length === 0 && alamatStatus === 'idle') {
            dispatch(fetchProvinces())
        }
    }, [dispatch, provinces.length, alamatStatus])

    const handleProvinceChange = (code) => {
        setProvinsi(code)
        setKota('')
        setKecamatan('')
        dispatch(resetRegencies())

        if (code) {
            dispatch(fetchRegencies(code))
        }
    }

    const handleRegencyChange = (code) => {
        setKota(code)
        setKecamatan('')
        dispatch(resetDistricts())

        if (code) {
            dispatch(fetchDistricts(code))
        }
    }

    const handleDistrictChange = (code) => {
        setKecamatan(code)
    }

    // Options for ModalSelect (Keahlian)
    const categoryOptions = categorys?.data?.map(c => ({ value: c.id, label: c.kategori })) || [];

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

                    {/* Keahlian (Multi-select Modal) */}
                    <div>
                        <ModalSelect
                            label="Keahlian"
                            title="Pilih Keahlian"
                            placeholder="Pilih Keahlian (Bisa lebih dari satu)"
                            options={categoryOptions}
                            value={selectedSkillIds}
                            onChange={setSelectedSkillIds}
                            multiple={true}
                        />
                    </div>

                    {/* Alamat */}
                    <div className="md:col-span-2">
                        <label htmlFor="alamat" className="block text-[15px] md:text-[15px] lg:text-[16px] font-medium text-gray-700">Alamat Lengkap</label>
                        <div className="mt-2">
                            <textarea
                                id="alamat"
                                className="w-full h-[100px] md:h-[100px] lg:h-[110px] outline-1 outline-gray-200 p-[15px] md:p-[15px] lg:p-[16px] rounded-[15px] md:rounded-[15px] lg:rounded-[16px]"
                                placeholder="Masukkan Detail Alamat Anda (Jalan, No. Rumah, dll)"
                                onChange={(e) => setAlamat(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Domisili (Address Picker Modal) */}
                    <div className="md:col-span-2">
                        <AddressPickerModal
                            provinces={provinces}
                            regencies={regencies}
                            districts={districts}
                            onProvinceChange={handleProvinceChange}
                            onRegencyChange={handleRegencyChange}
                            onDistrictChange={handleDistrictChange}
                            currentProvince={provinsi}
                            currentRegency={kota}
                            currentDistrict={kecamatan}
                            loading={alamatStatus === 'loading'}
                        />
                        <div className="mt-4">
                            <label className="block text-[15px] font-medium text-gray-700 mb-2">Kode Pos</label>
                            <Input
                                placeholder='Contoh: 40132'
                                className='border-1 border-gray-200 rounded-lg w-full px-4 py-3 focus:border-blue-500 focus:outline-none'
                                onChange={(e) => setKode_Pos(e.target.value)}
                                value={kode_pos}
                                required
                            />
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