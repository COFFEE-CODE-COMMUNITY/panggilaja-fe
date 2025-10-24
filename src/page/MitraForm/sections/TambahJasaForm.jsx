import React from "react";
import Button from "../../../components/common/Button"; 
import InputForm from "../../../components/modules/form/InputForm"; 

function TambahJasaForm({ onFormSubmit }) { 
    const handleSelesai = (e) => {
        e.preventDefault();
        onFormSubmit(); 
    };

    return (
        <div className="flex items-center justify-center"> 
            <form 
                onSubmit={handleSelesai} 
                className="p-6 md:p-10 w-full max-w-3xl space-y-6" 
            >
                {/* judul */}
                <h2 className="text-[25px] font-semibold text-left">
                    Tambahkan jasa pertamamu 
                </h2>

                <div 
                    className="
                        space-y-6 
                        md:space-y-0 md:grid md:grid-cols-4 
                        md:gap-x-6 md:gap-y-6        
                        lg:gap-x-8 lg:gap-y-8
                    "
                >
                    
                    {/* foto jasa */}
                    <label className="block text-[15px] font-medium text-gray-700 md:pt-2 md:col-span-1"> 
                        Unggah Foto Jasa 
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3"> 
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gray-100 border flex items-center justify-center text-gray-400 text-sm hover:bg-gray-200 cursor-pointer"> {/* rounded-lg */}
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

                    {/* nama jasa */}
                    <label htmlFor="nama_jasa" className="block text-[15px] font-medium text-gray-700 md:col-span-1">
                        Nama Jasa 
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3">
                        <InputForm
                            type="text"
                            id="nama_jasa" 
                            placeholder="Masukkan nama" 
                        />
                    </div>

                    {/* deskripsi jasa */}
                    <label htmlFor="deskripsi_jasa" className="block text-[15px] font-medium text-gray-700 md:pt-2 md:col-span-1"> 
                        Deskripsi Jasa 
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3"> 
                        <InputForm
                            as="textarea" 
                            id="deskripsi_jasa" 
                            rows="4" 
                            placeholder="Masukkan deskripsi Jasa" 
                        />
                    </div>

                    {/* harga */}
                    <label className="block text-[15px] font-medium text-gray-700 md:col-span-1"> 
                        Harga
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3"> 
                        <div className="flex items-center gap-2 md:gap-4">
                            <InputForm type="number" placeholder="" className="w-1/2"/> 
                            <span className="text-gray-500 text-sm">sampai</span>
                            <InputForm type="number" placeholder="" className="w-1/2"/> 
                        </div>
                    </div>

                    {/* kategori jasa */}
                    <label htmlFor="kategori_jasa" className="block text-[15px] font-medium text-gray-700 md:col-span-1">
                        Kategori Jasa
                    </label>
                    <div className="mt-1 md:mt-0 md:col-span-3">
                        <select 
                          id="kategori_jasa" 
                          className="block w-full border border-gray-300 rounded-md p-2 focus:ring-green-600 focus:border-green-600 text-sm text-gray-500" 
                        >
                          <option value="">Pilih Kategori</option>
                          <option value="kesehatan">Perbaikan Rumah Tangga</option>
                          <option value="kesehatan">Teknisi & Elektronik</option>
                          <option value="kesehatan">Kerajinan & Resparasi Kreatif</option>
                          <option value="kesehatan">Pembersihan & Kerbersihan</option>
                          <option value="kesehatan">Perawatan & Gaya Hidup</option>
                          <option value="kesehatan">Edukasi & Pelatihan</option>
                        </select>
                    </div>

                    {/* button selesai */}
                    <div className="hidden md:block md:col-span-1"></div> 
                    <div className="md:col-span-3 flex justify-end"> 
                        <Button type="submit" variant="secondary" className="px-6 py-2 rounded-[20px] text-white"> 
                          Selesai 
                        </Button>
                    </div>
                </div> 
            </form>
        </div>
    );
}

export default TambahJasaForm;