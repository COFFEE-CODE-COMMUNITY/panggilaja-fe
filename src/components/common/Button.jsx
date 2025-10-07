import React, { Children } from 'react'

const combineClass = ((baseClass, customClass) => {
    return `${baseClass} ${customClass}`.trim()
})

const Button = ({className, onClick = (() => ''), text, variant = 'primary'}) => {
    let baseColor = ''
    if(variant === 'primary'){
        baseColor = ' bg-primary'
    }else{
        baseColor = ' bg-secondary'
    }
    const baseClass = 'px-4 py-2' + baseColor;

    const finalClass = combineClass(baseClass, className);

  return (
    <button className={finalClass} onClick={onClick}>{text}</button>
  )
}

export default Button