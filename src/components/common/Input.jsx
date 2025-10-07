import React, { Children } from 'react'

const combineClass = ((baseClass, customClass) => {
    return `${baseClass} ${customClass}`.trim()
})

const Input = ({className, onChange = (() => ''), placeholder}) => {
    const baseClass = 'px-4 py-2 focus:outline-none border-[0.1px]';

    const finalClass = combineClass(baseClass, className);

  return (
    <input placeholder={placeholder} onChange={onChange} className={finalClass}></input>
  )
}

export default Input