import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';
import { createPortal } from 'react-dom';

const ModalSelect = ({
    options = [],
    value,
    onChange,
    placeholder = "Pilih...",
    label,
    multiple = false,
    className = "",
    disabled = false,
    required = false,
    title = "Pilih Opsi"
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setSearchTerm("");
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSelect = (optionValue) => {
        if (multiple) {
            const currentValues = Array.isArray(value) ? value : [];
            const isSelected = currentValues.includes(optionValue);

            let newValues;
            if (isSelected) {
                newValues = currentValues.filter(v => v !== optionValue);
            } else {
                newValues = [...currentValues, optionValue];
            }
            onChange(newValues);
        } else {
            onChange(optionValue);
            setIsOpen(false);
        }
    };

    const handleRemoveTag = (e, valToRemove) => {
        e.stopPropagation();
        const newValues = (Array.isArray(value) ? value : []).filter(v => v !== valToRemove);
        onChange(newValues);
    }

    const getDisplayLabel = (val) => {
        const option = options.find(opt => opt.value === val);
        return option ? option.label : val;
    };

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isSelected = (val) => {
        if (multiple) {
            return Array.isArray(value) && value.includes(val);
        }
        return value === val;
    };

    return (
        <div className={`relative ${className}`}>
            {label && <label className="block text-[15px] md:text-[15px] lg:text-[16px] font-medium text-gray-700 mb-2">{label} {required && <span className="text-red-500">*</span>}</label>}

            {/* Trigger Button */}
            <div
                className={`w-full bg-white border border-gray-200 rounded-xl px-4 py-3 cursor-pointer flex items-center justify-between transition-all outline-none hover:border-primary focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                onClick={() => !disabled && setIsOpen(true)}
            >
                <div className="flex-1 flex flex-wrap gap-2 items-center overflow-hidden">
                    {multiple && Array.isArray(value) && value.length > 0 ? (
                        <>
                            {value.slice(0, 3).map(val => (
                                <span key={val} className="bg-primary/10 text-primary text-sm px-2 py-1 rounded-md flex items-center gap-1 font-medium">
                                    {getDisplayLabel(val)}
                                    <FaTimes
                                        size={10}
                                        className="cursor-pointer hover:text-red-500"
                                        onClick={(e) => handleRemoveTag(e, val)}
                                    />
                                </span>
                            ))}
                            {value.length > 3 && (
                                <span className="text-gray-500 text-sm">+{value.length - 3} lainnya</span>
                            )}
                        </>
                    ) : (
                        !multiple && value ? (
                            <span className="text-gray-800">{getDisplayLabel(value)}</span>
                        ) : (
                            <span className="text-gray-400">{placeholder}</span>
                        )
                    )}
                </div>
                <FaChevronDown className="text-gray-400 text-xs" />
            </div>

            {/* Modal Portal */}
            {isOpen && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="font-bold text-lg text-gray-800">{title}</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Search */}
                        <div className="p-4 pb-2">
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                                    placeholder="Cari..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Options List */}
                        <div className="overflow-y-auto flex-1 p-2 custom-scrollbar">
                            {filteredOptions.length > 0 ? (
                                <div className="grid grid-cols-1 gap-1">
                                    {filteredOptions.map((opt) => (
                                        <div
                                            key={opt.value}
                                            className={`px-4 py-3 rounded-xl text-sm cursor-pointer flex items-center justify-between transition-all ${isSelected(opt.value) ? 'bg-primary/10 text-primary font-bold border border-primary/20' : 'text-gray-600 hover:bg-gray-50 border border-transparent'}`}
                                            onClick={() => handleSelect(opt.value)}
                                        >
                                            <span>{opt.label}</span>
                                            {isSelected(opt.value) && (
                                                <div className="bg-primary text-white p-1 rounded-full text-[10px]">
                                                    <FaCheck />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center flex flex-col items-center text-gray-400">
                                    <FaSearch size={32} className="mb-2 opacity-50" />
                                    <p>Tidak ditemukan</p>
                                </div>
                            )}
                        </div>

                        {/* Footer (for multiple) */}
                        {multiple && (
                            <div className="p-4 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95"
                                >
                                    Selesai ({Array.isArray(value) ? value.length : 0})
                                </button>
                            </div>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default ModalSelect;
