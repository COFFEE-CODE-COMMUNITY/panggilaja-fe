import React from 'react';
import Input from '../../common/Input';

const combineClass = ((baseClass, customClass) => {
    return `${baseClass} ${customClass}`.trim();
})

const InputForm = ({label, id, placeholder, className, variant, type}) => {
    const baseClass = 'px-4 py-2 rounded-[15px] shadow-md bg-white lg:h-[62px] md:h-[53px] h-[45px] pl-[20px] lg:text-h4 md:text-h5 text-h6 md:placeholder:text-h5 placeholder:text-h6';
    let layout = ''

    if(variant === 'cols' && label){
        layout = 'flex flex-col'
    }else if(variant === 'rows' && label){
        layout = 'flex flex-row items-center'
    }

    const finalClass = combineClass(baseClass, className)

  return (
    <div className={layout}>
        {label && <label htmlFor={id} className='lg:text-h4 md:text-h5 text-h6'>{label}</label>}
        <Input className={finalClass} id={id} placeholder={placeholder} type={type}/>
    </div>
  )
}

export default InputForm