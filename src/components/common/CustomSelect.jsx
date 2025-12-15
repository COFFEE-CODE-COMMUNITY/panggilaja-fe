import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaCheck, FaTimes } from 'react-icons/fa';

const CustomSelect = ({
    options = [],
    value,
    onChange,
    placeholder = "Pilih...",
    label,
    multiple = false,
    className = "",
    disabled = false,
    required = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const wrapperRef = useRef(null);

    // Handle clicking outside to close
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

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
        <div className={`relative ${className}`} ref={wrapperRef}>
            {label && <label className="block text-[15px] md:text-[15px] lg:text-[16px] font-medium text-gray-700 mb-2">{label} {required && <span className="text-red-500">*</span>}</label>}

            <div
                className={`w-full bg-white border border-gray-200 rounded-xl px-4 py-3 cursor-pointer flex items-center justify-between transition-all outline-none hover:border-primary focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <div className="flex-1 flex flex-wrap gap-2 items-center overflow-hidden">
                    {multiple && Array.isArray(value) && value.length > 0 ? (
                        value.map(val => (
                            <span key={val} className="bg-primary/10 text-primary text-sm px-2 py-1 rounded-md flex items-center gap-1 font-medium">
                                {getDisplayLabel(val)}
                                <FaTimes
                                    size={10}
                                    className="cursor-pointer hover:text-red-500"
                                    onClick={(e) => handleRemoveTag(e, val)}
                                />
                            </span>
                        ))
                    ) : (
                        !multiple && value ? (
                            <span className="text-gray-800">{getDisplayLabel(value)}</span>
                        ) : (
                            <span className="text-gray-400">{placeholder}</span>
                        )
                    )}
                </div>
                <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-100 origin-top">
                    {options.length > 5 && (
                        <div className="p-2 border-b border-gray-100 bg-gray-50/50">
                            <input
                                type="text"
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                                placeholder="Cari..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                autoFocus
                            />
                        </div>
                    )}

                    <div className="overflow-y-auto flex-1 p-1 custom-scrollbar">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt) => (
                                <div
                                    key={opt.value}
                                    className={`px-3 py-2.5 rounded-lg text-sm cursor-pointer flex items-center justify-between transition-colors ${isSelected(opt.value) ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                    onClick={() => handleSelect(opt.value)}
                                >
                                    <span>{opt.label}</span>
                                    {isSelected(opt.value) && <FaCheck size={12} />}
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-400">
                                Tidak ditemukan
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
