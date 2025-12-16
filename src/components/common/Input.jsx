import React, { Children } from "react";

const combineClass = (baseClass, customClass) => {
  return `${baseClass} ${customClass}`.trim();
};

const Input = React.forwardRef(({
  className,
  onChange = () => "",
  placeholder,
  type = "text",
  onFocus,
  value,
  children,
}, ref) => {
  const baseClass = "w-full py-3 px-4 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none";

  const finalClass = combineClass(baseClass, className);

  return (
    <input
      ref={ref}
      placeholder={placeholder}
      onChange={onChange}
      className={finalClass}
      type={type}
      onFocus={onFocus}
      value={value}
    >
      {children}
    </input>
  );
});

Input.displayName = "Input";

export default Input;
