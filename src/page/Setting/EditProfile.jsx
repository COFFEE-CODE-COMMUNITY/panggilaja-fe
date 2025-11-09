import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice";
import InputForm from "../../components/modules/form/InputForm";
import { 
    selectSeeAddress, 
    selectUpdateProfileError, 
    selectUpdateProfileStatus, 
    updateProfile 
} from "../../features/userSlice";

const EditProfile = ({ isOpen, onClose, initialProfile, initialAddress }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    
    const statusEdit = useSelector(selectUpdateProfileStatus)
    const statusMessage = useSelector(selectUpdateProfileError)
    
    const addressDetails = initialAddress?.data || {}; 
    const address = useSelector(selectSeeAddress)

    const [fullname, setFullname] = useState(initialProfile?.fullname || "");
    const [alamat, setAlamat] = useState(addressDetails.alamat || "");
    const [provinsi, setProvinsi] = useState(addressDetails.provinsi || "");
    const [kota, setKota] = useState(addressDetails.kota || "");
    const [kecamatan, setKecamatan] = useState(addressDetails.kecamatan || "");
    const [kode_pos, setKode_Pos] = useState(addressDetails.kode_pos || "");

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(initialProfile?.foto_buyer || "");

    useEffect(() => {
        if (initialProfile && Object.keys(initialProfile).length > 0) {
            const details = initialAddress?.data || {};
            setFullname(initialProfile.fullname || "");
            setAlamat(details.alamat || "");
            setProvinsi(details.provinsi || "");
            setKota(details.kota || "");
            setKecamatan(details.kecamatan || "");
            setKode_Pos(details.kode_pos || "");
            setPreview(initialProfile.foto_buyer || "");
            setFile(initialProfile.foto_buyer);
        }
    }, [initialProfile, initialAddress]);
    

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

        // ✅ Hanya kirim file jika ada
        if (file) {
            formData.append("file", file);
        }

        dispatch(updateProfile({ id: addressDetails.id, data: formData }));
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
            <div className="bg-white max-w-2xl w-full rounded-xl p-6 relative shadow-xl">
                <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-5">Edit Profil</h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="flex flex-col items-center gap-3">
                        <img
                            src={preview}
                            className="w-24 h-24 rounded-full object-cover border shadow"
                            alt="Preview"
                        />
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>

                    <InputForm
                        label="Nama Lengkap"
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />

                    <InputForm
                        label="Alamat Lengkap"
                        type="text"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputForm
                            label="Provinsi"
                            type="text"
                            value={provinsi}
                            onChange={(e) => setProvinsi(e.target.value)}
                        />

                        <InputForm
                            label="Kota/Kabupaten"
                            type="text"
                            value={kota}
                            onChange={(e) => setKota(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputForm
                            label="Kecamatan"
                            type="text"
                            value={kecamatan}
                            onChange={(e) => setKecamatan(e.target.value)}
                        />

                        <InputForm
                            label="Kode Pos"
                            type="number"
                            value={kode_pos}
                            onChange={(e) => setKode_Pos(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
                        disabled={statusEdit === 'loading'}
                    >
                        {statusEdit === 'loading' ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>

                    {statusEdit === 'error' && statusMessage && (
                        <p className="text-red-500 text-sm mt-2 text-center">Gagal: {statusMessage}</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
