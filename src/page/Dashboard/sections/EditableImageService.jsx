import React, { useRef, useMemo } from 'react';
import { FaCamera } from 'react-icons/fa';

const EditableImageService = ({ image, onImageChange }) => {
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onImageChange(file);
        }
    };

    const imageSrc = useMemo(() => {
        if (!image) return 'https://via.placeholder.com/400?text=No+Image';
        if (typeof image === 'string') return image;
        try {
            return URL.createObjectURL(image);
        } catch (error) {
            console.error("Error creating object URL:", error);
            return 'https://via.placeholder.com/400?text=Error';
        }
    }, [image]);

    return (
        <div
            className="bg-white w-full lg:w-[40rem] xl:w-[42rem] overflow-hidden rounded-2xl border border-gray-100 shadow-sm relative group cursor-pointer"
            onClick={handleImageClick}
        >
            <img
                src={imageSrc}
                alt="Service"
                className='w-full h-full object-cover aspect-square group-hover:opacity-75 transition-opacity'
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                <div className="bg-white/90 p-3 rounded-full shadow-lg">
                    <FaCamera className="text-gray-700 text-xl" />
                </div>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
        </div>
    );
};

export default EditableImageService;
