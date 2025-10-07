import React, { Children } from 'react'

const combineClass = ((baseClass, customClass) => {
    return `${baseClass} ${customClass}`.trim()
})

const Button = ({className, onClick = (() => ''), children, variant}, link) => {
    let baseColor = ''
    if(variant === 'primary'){
        baseColor = ' bg-primary'
    }else if(variant === 'secondary'){
        baseColor = ' bg-secondary'
    }
    const baseClass = 'px-4 py-2 cursor-pointer' + baseColor;

    const finalClass = combineClass(baseClass, className);

  return (
    <button className={finalClass} onClick={onClick}>{children}</button>
  )
}

export default Button