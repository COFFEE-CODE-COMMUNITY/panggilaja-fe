import React from 'react';
import Input from '../../common/Input';

const combineClass = ((baseClass, customClass) => {
    return `${baseClass} ${customClass}`.trim();
})

const InputForm = ({label, id, placeholder, className, variant, type, onChange, height}) => {
    let baseClass = ''
    if(height){
        baseClass = `lg:h-[62px] md:h-[53px] h-[45px] px-4 py-2 rounded-[15px] border-2 border-gray-100 bg-white pl-[20px] lg:text-h4 md:text-h5 text-h6 md:placeholder:text-h5 placeholder:text-h6`;
    }else {
        baseClass = `px-4 py-2 rounded-[15px] border-2 border-gray-100 bg-white pl-[20px] lg:text-h4 md:text-h5 text-h6 md:placeholder:text-h5 placeholder:text-h6`;
    }
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
        <Input className={finalClass} id={id} placeholder={placeholder} type={type} onChange={onChange}/>
    </div>
  )
}

export default InputForm