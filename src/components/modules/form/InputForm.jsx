import React, { useState } from "react";
import Input from "../../common/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const combineClass = (baseClass, customClass) => {
  return `${baseClass} ${customClass}`.trim();
};

const InputForm = ({
  label,
  id,
  placeholder,
  className,
  variant,
  type,
  onChange,
  height,
  value,
  icon: Icon, // Icon component dari react-icons
  showPasswordToggle = false, // Untuk enable password toggle
  onFocus,
  onBlur,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Tentukan tipe input berdasarkan password toggle
  const inputType = showPasswordToggle && showPassword ? "text" : type;

  // Base class untuk modern input style
  const baseClass = `w-full h-12 md:h-14 px-4 ${Icon ? "pl-12" : "pl-4"} ${
    showPasswordToggle ? "pr-12" : "pr-4"
  } border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none`;

  // Layout variants
  let layout = "";
  if (variant === "cols" && label) {
    layout = "flex flex-col";
  } else if (variant === "rows" && label) {
    layout = "flex flex-row items-center gap-4";
  }

  const finalClass = combineClass(baseClass, className);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <div className={layout}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-semibold text-gray-700 mb-2 ${
            variant === "rows" ? "w-[250px] mb-0" : ""
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative w-full">
        {/* Left Icon */}
        {Icon && (
          <div
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
              isFocused ? "text-primary" : "text-gray-400"
            }`}
          >
            <Icon size={18} />
          </div>
        )}

        {/* Input Field */}
        <Input
          className={finalClass}
          id={id}
          placeholder={placeholder}
          type={inputType}
          onChange={onChange}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
        />

        {/* Password Toggle Button */}
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-300 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputForm;
