import React, { useState, useEffect, useRef } from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const EditableText = ({
    initialValue,
    onSave,
    isEditable = false,
    tag: Tag = 'div',
    type = 'text',
    className = '',
    inputClassName = '',
    placeholder = '',
    formatter = (val) => val,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef(null);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleBlur = async () => {
        setIsEditing(false);
        if (value !== initialValue) {
            try {
                await onSave(value);
            } catch (error) {
                console.error("Failed to save:", error);
                setValue(initialValue); // Revert on error
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && type !== 'textarea') {
            handleBlur();
        }
        if (e.key === 'Escape') {
            setValue(initialValue);
            setIsEditing(false);
        }
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    if (!isEditable) {
        return <Tag className={className}>{formatter(value)}</Tag>;
    }

    if (isEditing) {
        if (type === 'textarea') {
            return (
                <textarea
                    ref={inputRef}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full p-2 border border-primary rounded-md outline-none focus:ring-2 focus:ring-primary/50 bg-white text-gray-900 ${inputClassName}`}
                    rows={4}
                />
            );
        }
        return (
            <input
                ref={inputRef}
                type={type}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`w-full p-1 border-b-2 border-primary outline-none bg-transparent text-gray-900 ${inputClassName}`}
            />
        );
    }

    return (
        <Tag
            onClick={() => setIsEditing(true)}
            className={`cursor-pointer group relative hover:bg-gray-50/50 rounded px-1 -mx-1 transition-colors ${className}`}
            title="Click to edit"
        >
            {formatter(value) || <span className="text-gray-400 italic">{placeholder || 'Empty'}</span>}
            <span className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-gray-400">
                <FaPencilAlt size={12} />
            </span>
        </Tag>
    );
};

export default EditableText;
