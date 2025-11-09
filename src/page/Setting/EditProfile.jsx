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

const EditProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate()
    const statusEdit = useSelector(selectUpdateProfileStatus)
    const statusMessage = useSelector(selectUpdateProfileError)
    const address = useSelector(selectSeeAddress)
    const profile = useSelector(selectSeeProfile)

    const [fullname, setFullname] = useState(profile?.fullname );
    const [alamat, setAlamat] = useState(address?.data?.alamat );
    const [provinsi, setProvinsi] = useState(address?.data?.provinsi );
    const [kota, setKota] = useState(address?.data?.kota );
    const [kecamatan, setKecamatan] = useState(address?.data?.kecamatan );
    const [kode_pos, setKode_Pos] = useState(address?.data?.kode_pos );

    const [file, setFile] = useState(profile?.foto_buyer);
    const [preview, setPreview] = useState(profile?.foto_buyer );    

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
        formData.append("file", file);

        dispatch(updateProfile({ id: address?.data?.id, data: formData }));
    };

    useEffect(() => {
        if(statusEdit === 'success'){
            dispatch(resetUpdateProfile())
            dispatch(seeAddress(user?.id_buyer))
            dispatch(seeProfile(user?.id_buyer))
            navigate('/setting')
        }
    },[statusEdit])
    return (
        <div className="flex p-4 overflow-x-auto w-full min-h-screen">
            <div className="bg-white max-w-2xl w-full p-6 relative ">
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
