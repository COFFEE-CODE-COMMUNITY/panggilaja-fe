import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice";
import InputForm from "../../components/modules/form/InputForm";
import {
    resetUpdateProfile,
    seeAddress,
    seeProfile,
    selectSeeAddress,
    selectSeeProfile,
    selectUpdateProfileError,
    selectUpdateProfileStatus,
    updateProfile
} from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCamera, FaSave, FaMapMarkedAlt, FaUserEdit } from "react-icons/fa";
import { fetchDistricts, fetchProvinces, fetchRegencies, resetDistricts, resetRegencies, selectAlamatStatus, selectAllDistricts, selectAllProvinces, selectAllRegencies } from "../../features/addressSlice";
import ModalSelect from "../../components/common/ModalSelect";

const EditProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate()
    const statusEdit = useSelector(selectUpdateProfileStatus)
    const statusMessage = useSelector(selectUpdateProfileError)
    const address = useSelector(selectSeeAddress)
    const profile = useSelector(selectSeeProfile)

    const provinces = useSelector(selectAllProvinces)
    const regencies = useSelector(selectAllRegencies)
    const districts = useSelector(selectAllDistricts)
    const alamatStatus = useSelector(selectAlamatStatus)

    const [fullname, setFullname] = useState('');
    const [alamat, setAlamat] = useState('');
    const [provinsi, setProvinsi] = useState('');
    const [kota, setKota] = useState('');
    const [kecamatan, setKecamatan] = useState('');
    const [kode_pos, setKode_Pos] = useState('');

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [isFileChanged, setIsFileChanged] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [shouldLoadKota, setShouldLoadKota] = useState(false);
    const [shouldLoadKecamatan, setShouldLoadKecamatan] = useState(false);

    const normalizeString = (str) => {
        return str ? str.toLowerCase().trim() : '';
    };

    useEffect(() => {
        if (profile && address?.data && provinces.length > 0 && !isDataLoaded) {
            setFullname(profile.fullname || '');
            setAlamat(address.data.alamat || '');
            setKode_Pos(address.data.kode_pos || '');
            setPreview(profile.foto_buyer || '');

            const provinsiFromDB = normalizeString(address.data.provinsi);
            const foundProvinsi = provinces.find(p =>
                normalizeString(p.name) === provinsiFromDB
            );

            if (foundProvinsi) {
                setProvinsi(foundProvinsi.code);
                setShouldLoadKota(true);
            }

            setIsDataLoaded(true);
        }
    }, [profile, address, provinces, isDataLoaded]);

    useEffect(() => {
        if (provinces.length === 0 && alamatStatus === 'idle') {
            dispatch(fetchProvinces());
        }
    }, [dispatch, provinces.length, alamatStatus]);

    useEffect(() => {
        if (provinsi && shouldLoadKota) {
            dispatch(fetchRegencies(provinsi));
            setShouldLoadKota(false);
        }
    }, [provinsi, shouldLoadKota, dispatch]);

    useEffect(() => {
        if (regencies.length > 0 && address?.data?.kota && isDataLoaded && !kota) {
            const kotaFromDB = normalizeString(address.data.kota);
            const foundKota = regencies.find(r =>
                normalizeString(r.name) === kotaFromDB
            );

            if (foundKota) {
                setKota(foundKota.code);
                setShouldLoadKecamatan(true);
            }
        }
    }, [regencies, address?.data?.kota, isDataLoaded, kota]);

    useEffect(() => {
        if (kota && shouldLoadKecamatan) {
            dispatch(fetchDistricts(kota));
            setShouldLoadKecamatan(false);
        }
    }, [kota, shouldLoadKecamatan, dispatch]);

    useEffect(() => {
        if (districts.length > 0 && address?.data?.kecamatan && isDataLoaded && !kecamatan) {
            const kecamatanFromDB = normalizeString(address.data.kecamatan);
            const foundKecamatan = districts.find(d =>
                normalizeString(d.name) === kecamatanFromDB
            );

            if (foundKecamatan) {
                setKecamatan(foundKecamatan.code);
            }
        }
    }, [districts, address?.data?.kecamatan, isDataLoaded, kecamatan]);

    useEffect(() => {
        const fetchExistingImage = async () => {
            if (profile?.foto_buyer && !isFileChanged) {
                try {
                    const response = await fetch(profile.foto_buyer);
                    const blob = await response.blob();
                    const fileName = profile.foto_buyer.split('/').pop() || 'profile.jpg';
                    const existingFile = new File([blob], fileName, { type: blob.type });
                    setFile(existingFile);
                } catch (error) {
                    console.error("Error fetching existing image:", error);
                }
            }
        };
        fetchExistingImage();
    }, [profile?.foto_buyer, isFileChanged]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (!allowed.includes(selectedFile.type)) {
            console.error("Format file harus JPG/PNG/WebP");
            return;
        }

        if (selectedFile.size > 5 * 1024 * 1024) {
            console.error("Ukuran maksimal 5MB");
            return;
        }

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setIsFileChanged(true);
    };

    const handleProvinceChange = (code) => {
        setProvinsi(code);
        setKota('');
        setKecamatan('');
        dispatch(resetRegencies());
        dispatch(resetDistricts());

        if (code) {
            dispatch(fetchRegencies(code));
        }
    };

    const handleRegencyChange = (code) => {
        setKota(code);
        setKecamatan('');
        dispatch(resetDistricts());

        if (code) {
            dispatch(fetchDistricts(code));
        }
    };

    const handleDistrictChange = (code) => {
        setKecamatan(code);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!fullname || !alamat || !provinsi || !kota || !kecamatan || !kode_pos) {
            console.error("Harap lengkapi semua field!");
            return;
        }

        // Ambil nama dari data referensi yang sudah di-load
        const provinsiName = provinces.find(p => p.code === provinsi)?.name || '';
        const kotaName = regencies.find(r => r.code === kota)?.name || '';
        const kecamatanName = districts.find(d => d.code === kecamatan)?.name || '';

        // Kirim nama wilayah, bukan kode
        const dataJson = {
            fullname,
            alamat,
            provinsi: provinsiName.toLowerCase(),
            kota: kotaName.toLowerCase(),
            kecamatan: kecamatanName.toLowerCase(),
            kode_pos,
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(dataJson));
        formData.append("file", file);

        dispatch(updateProfile({ id: address?.data?.id, data: formData }));
    };


    useEffect(() => {
        if (!address?.data && !profile) {
            dispatch(seeAddress(user?.id_buyer));
            dispatch(seeProfile(user?.id_buyer));
        }
    }, [dispatch, address?.data, profile, user?.id_buyer]);

    useEffect(() => {
        if (statusEdit === 'success') {
            dispatch(resetUpdateProfile());
            dispatch(seeAddress(user?.id_buyer));
            dispatch(seeProfile(user?.id_buyer));
            navigate('/setting/profile');
        }
    }, [statusEdit, dispatch, user?.id_buyer, navigate]);

    return (
        <div className="w-full animate-fade-in">
            {/* Header */}
            <div className='flex items-center gap-4 mb-8'>
                <button
                    onClick={() => navigate('/setting/profile')}
                    className='md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors'
                >
                    <FaArrowLeft className='text-gray-600' />
                </button>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 cursor-pointer'>Edit Profil</h1>
                    <p className='text-gray-500 text-sm mt-1'>Perbarui informasi profil dan alamat anda</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <form onSubmit={handleSubmit}>
                    {/* Profile Image Section */}
                    <div className="p-6 sm:p-8 border-b border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center gap-4">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full p-1 bg-white shadow-sm border border-gray-200">
                                <img
                                    src={preview || "https://via.placeholder.com/150"}
                                    className="w-full h-full rounded-full object-cover"
                                    alt="Preview"
                                />
                            </div>
                            <label
                                htmlFor="file-upload"
                                className="absolute bottom-1 right-1 bg-primary text-white p-2.5 rounded-full cursor-pointer hover:bg-primary/90 transition-all shadow-lg border-2 border-white"
                            >
                                <FaCamera size={16} />
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        <p className="text-sm text-gray-500 font-medium">Klik ikon kamera untuk mengubah foto</p>
                    </div>

                    <div className="p-6 sm:p-8 space-y-8">
                        {/* Personal Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                <FaUserEdit className="text-primary" />
                                <h2 className="font-semibold text-gray-900">Informasi Pribadi</h2>
                            </div>

                            <div className="max-w-2xl">
                                <InputForm
                                    label="Nama Lengkap"
                                    type="text"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    required
                                    className="bg-gray-50 focus:bg-white transition-colors"
                                />
                            </div>
                        </div>

                        {/* Address Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                <FaMapMarkedAlt className="text-primary" />
                                <h2 className="font-semibold text-gray-900">Alamat Lengkap</h2>
                            </div>

                            <div className="grid gap-6 max-w-3xl">
                                <div>
                                    <label htmlFor="alamat" className="block text-sm font-medium mb-2">Alamat Lengkap</label>
                                    <textarea
                                        id="alamat"
                                        rows="3"
                                        className='border border-gray-300 px-4 py-3 rounded-lg bg-white w-full focus:border-primary focus:ring-4 focus:ring-primary/10 resize-none'
                                        value={alamat}
                                        onChange={(e) => setAlamat(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <ModalSelect
                                            label="Provinsi"
                                            placeholder={provinces.length === 0 && alamatStatus === 'loading' ? 'Memuat...' : 'Pilih Provinsi'}
                                            options={provinces.map(p => ({ value: p.code, label: p.name }))}
                                            value={provinsi}
                                            onChange={handleProvinceChange}
                                            disabled={alamatStatus === 'loading' && provinces.length === 0}
                                            title="Pilih Provinsi"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <ModalSelect
                                            label="Kota/Kabupaten"
                                            placeholder={!provinsi ? 'Pilih Provinsi Dulu' : regencies.length === 0 && alamatStatus === 'loading' ? 'Memuat...' : 'Pilih Kota/Kabupaten'}
                                            options={regencies.map(r => ({ value: r.code, label: r.name }))}
                                            value={kota}
                                            onChange={handleRegencyChange}
                                            disabled={!provinsi || (alamatStatus === 'loading' && regencies.length === 0)}
                                            title="Pilih Kota/Kabupaten"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <ModalSelect
                                            label="Kecamatan"
                                            placeholder={!kota ? 'Pilih Kota Dulu' : districts.length === 0 && alamatStatus === 'loading' ? 'Memuat...' : 'Pilih Kecamatan'}
                                            options={districts.map(d => ({ value: d.code, label: d.name }))}
                                            value={kecamatan}
                                            onChange={handleDistrictChange}
                                            disabled={!kota || (alamatStatus === 'loading' && districts.length === 0)}
                                            title="Pilih Kecamatan"
                                            required
                                        />
                                    </div>

                                    <InputForm
                                        label="Kode Pos"
                                        type="number"
                                        value={kode_pos}
                                        onChange={(e) => setKode_Pos(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/setting/profile')}
                                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                disabled={statusEdit === 'loading'}
                            >
                                <FaSave size={16} />
                                <span>Simpan Perubahan</span>
                            </button>
                        </div>

                        {statusEdit === 'error' && statusMessage && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm text-center">
                                {statusMessage}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;