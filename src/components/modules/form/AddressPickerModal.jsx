import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaMapMarkerAlt, FaChevronRight, FaTimes, FaArrowLeft, FaCheck } from 'react-icons/fa';

const AddressPickerModal = ({
    provinces = [],
    regencies = [],
    districts = [],
    onProvinceChange,
    onRegencyChange,
    onDistrictChange,
    currentProvince,
    currentRegency,
    currentDistrict,
    loading = false,
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1); // 1: Province, 2: Regency, 3: District
    const [searchTerm, setSearchTerm] = useState("");

    // Reset step when reopening
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (!currentProvince) setStep(1);
            else if (!currentRegency) setStep(2);
            else if (!currentDistrict) setStep(3);
            else setStep(1); // Default to start if all filled, allows editing
        } else {
            document.body.style.overflow = 'unset';
            setSearchTerm("");
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, currentProvince, currentRegency, currentDistrict]);

    const getOptions = () => {
        switch (step) {
            case 1: return provinces.map(p => ({ value: p.code, label: p.name }));
            case 2: return regencies.map(r => ({ value: r.code, label: r.name }));
            case 3: return districts.map(d => ({ value: d.code, label: d.name }));
            default: return [];
        }
    };

    const getTitle = () => {
        switch (step) {
            case 1: return "Pilih Provinsi";
            case 2: return "Pilih Kota/Kabupaten";
            case 3: return "Pilih Kecamatan";
            default: return "";
        }
    };

    const handleSelect = (val) => {
        if (step === 1) {
            onProvinceChange(val);
            setStep(2);
            setSearchTerm("");
        } else if (step === 2) {
            onRegencyChange(val);
            setStep(3);
            setSearchTerm("");
        } else if (step === 3) {
            onDistrictChange(val);
            setIsOpen(false); // Done
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
            setSearchTerm("");
        }
    };

    const filteredOptions = getOptions().filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getDisplayAddress = () => {
        if (!currentProvince) return "Pilih Alamat Lengkap";
        const p = provinces.find(x => x.code === currentProvince)?.name || "";
        const r = regencies.find(x => x.code === currentRegency)?.name || "";
        const d = districts.find(x => x.code === currentDistrict)?.name || "";

        let display = p;
        if (r) display += `, ${r}`;
        if (d) display += `, ${d}`;
        return display;
    };

    return (
        <div className="relative w-full">
            <label className="block text-[15px] md:text-[15px] lg:text-[16px] font-medium text-gray-700 mb-2">Domisili</label>

            {/* Trigger Button */}
            <div
                onClick={() => setIsOpen(true)}
                className={`w-full bg-white border border-gray-200 rounded-xl px-4 py-3 cursor-pointer flex items-center justify-between transition-all hover:border-primary hover:shadow-sm active:scale-[99%] ${className}`}
            >
                <div className="flex items-center gap-3 text-gray-700">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary">
                        <FaMapMarkerAlt />
                    </div>
                    <span className={`font-medium ${!currentProvince ? 'text-gray-400' : 'text-gray-800'}`}>
                        {getDisplayAddress()}
                    </span>
                </div>
                <FaChevronRight className="text-gray-400 text-sm" />
            </div>

            {/* Modal Portal */}
            {isOpen && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                            {step > 1 && (
                                <button onClick={handleBack} className="cursor-pointer p-2 hover:bg-gray-200 rounded-full transition-colors">
                                    <FaArrowLeft className="text-gray-600" />
                                </button>
                            )}
                            <div className="flex-1">
                                <h3 className="font-bold text-lg text-gray-800">{getTitle()}</h3>
                                <div className="flex gap-1 mt-1">
                                    <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                                    <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                                    <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="cursor-pointer p-2 hover:bg-gray-200 rounded-full text-gray-500">
                                <FaTimes />
                            </button>
                        </div>

                        {/* Search */}
                        <div className="p-4 pb-2">
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                                placeholder={`Cari ${getTitle().replace("Pilih ", "")}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                        </div>

                        {/* List */}
                        <div className="overflow-y-auto flex-1 p-2 custom-scrollbar">
                            {loading ? (
                                <div className="flex justify-center p-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : filteredOptions.length > 0 ? (
                                <div className="grid gap-1">
                                    {filteredOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => handleSelect(opt.value)}
                                            className="cursor-pointer w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-between group"
                                        >
                                            <span className="text-gray-700 font-medium group-hover:text-primary transition-colors">{opt.label}</span>
                                            <FaChevronRight className="text-gray-300 text-xs group-hover:text-primary" />
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center p-8 text-gray-400">Tidak ditemukan</div>
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default AddressPickerModal;
