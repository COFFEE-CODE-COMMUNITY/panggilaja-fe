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
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import { fetchDistricts, fetchProvinces, fetchRegencies, resetDistricts, resetRegencies, selectAlamatStatus, selectAllDistricts, selectAllProvinces, selectAllRegencies } from "../../features/addressSlice";

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

    const handleProvinceChange = (e) => {
        const code = e.target.value;
        setProvinsi(code);
        setKota('');
        setKecamatan('');
        dispatch(resetRegencies());
        dispatch(resetDistricts());

        if (code) {
            dispatch(fetchRegencies(code));
        }
    };

    const handleRegencyChange = (e) => {
        const code = e.target.value;
        setKota(code);
        setKecamatan('');
        dispatch(resetDistricts());

        if (code) {
            dispatch(fetchDistricts(code));
        }
    };

    const handleDistrictChange = (e) => {
        const code = e.target.value;
        setKecamatan(code);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!fullname || !alamat || !provinsi || !kota || !kecamatan || !kode_pos) {
            console.error("Harap lengkapi semua field!");
            return;
        }

        const dataJson = {
            fullname,
            alamat,
            provinsi,
            kota,
            kecamatan,
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
        <div className="flex lg:p-4 md:p-3 p-1 overflow-x-auto w-full flex-col gap-10 min-h-screen">
            <div className='flex items-center gap-10 lg:py-5 md:py-3'>
                <FaArrowLeft 
                    className='text-gray-700 sm:hidden block cursor-pointer'
                    onClick={() => navigate('/setting/profile')}
                />
                <p className='lg:text-h3 md:text-h4 text-h5 font-medium'>Edit Profil</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                        <img
                            src={preview}
                            className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 shadow-md"
                            alt="Preview"
                        />
                        <label 
                            htmlFor="file-upload" 
                            className="absolute bottom-0 right-0 bg-primary text-white p-2.5 rounded-full cursor-pointer hover:bg-opacity-90 transition-all shadow-lg"
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
                    <p className="text-sm text-gray-500">Klik ikon kamera untuk mengubah foto</p>
                </div>

                <InputForm
                    label="Nama Lengkap"
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                />

                <InputForm
                    label="Alamat Lengkap"
                    type="text"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="province" className="block text-sm font-medium mb-2">Provinsi</label>
                        <select 
                            className='border border-gray-300 px-4 py-3 rounded-lg bg-white w-full focus:border-primary focus:outline-none'
                            onChange={handleProvinceChange}
                            value={provinsi} 
                            required
                            disabled={alamatStatus === 'loading' && provinces.length === 0}
                            id="province"
                        >
                            <option value="">
                                {provinces.length === 0 && alamatStatus === 'loading' ? 'Memuat Provinsi...' : 'Pilih Provinsi'}
                            </option>
                            {provinces.map((p) => (
                                <option key={p.code} value={p.code}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="regency" className="block text-sm font-medium mb-2">Kota/Kabupaten</label>
                        <select 
                            className='border border-gray-300 px-4 py-3 rounded-lg bg-white w-full focus:border-primary focus:outline-none'
                            onChange={handleRegencyChange}
                            value={kota} 
                            required
                            disabled={!provinsi || (alamatStatus === 'loading' && regencies.length === 0)}
                            id="regency"
                        >
                            <option value="">
                                {!provinsi ? 'Pilih Provinsi Dulu' : regencies.length === 0 && alamatStatus === 'loading' ? 'Memuat Kota...' : 'Pilih Kota/Kabupaten'}
                            </option>
                            {regencies.map((r) => (
                                <option key={r.code} value={r.code}>{r.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="district" className="block text-sm font-medium mb-2">Kecamatan</label>
                        <select 
                            className='border border-gray-300 px-4 py-3 rounded-lg bg-white w-full focus:border-primary focus:outline-none'
                            onChange={handleDistrictChange}
                            value={kecamatan} 
                            required
                            disabled={!kota || (alamatStatus === 'loading' && districts.length === 0)}
                            id="district"
                        >
                            <option value="">
                                {!kota ? 'Pilih Kota Dulu' : districts.length === 0 && alamatStatus === 'loading' ? 'Memuat Kecamatan...' : 'Pilih Kecamatan'}
                            </option>
                            {districts.map((d) => (
                                <option key={d.code} value={d.code}>{d.name}</option>
                            ))}
                        </select>
                    </div>

                    <InputForm
                        label="Kode Pos"
                        type="number"
                        value={kode_pos}
                        onChange={(e) => setKode_Pos(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                    disabled={statusEdit === 'loading'}
                >
                    {statusEdit === 'loading' ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>

                {statusEdit === 'error' && statusMessage && (
                    <p className="text-red-500 text-sm mt-2 text-center">Gagal: {statusMessage}</p>
                )}
            </form>
        </div>
    );
};

export default EditProfile;