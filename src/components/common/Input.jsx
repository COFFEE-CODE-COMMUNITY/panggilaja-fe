import React, { Children } from 'react'

const combineClass = ((baseClass, customClass) => {
    return `${baseClass} ${customClass}`.trim()
})

const Input = ({className, onChange = (() => ''), placeholder, type = 'text', onFocus}) => {
    const baseClass = 'px-4 py-2 focus:outline-none w-full';

    const finalClass = combineClass(baseClass, className);

  return (
    <input placeholder={placeholder} onChange={onChange} className={finalClass} type={type} onFocus={onFocus}></input>
  )
}

export default Input