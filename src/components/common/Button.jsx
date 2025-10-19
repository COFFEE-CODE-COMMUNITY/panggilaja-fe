const combineClass = ((baseClass, customClass) => {
    return `${baseClass} ${customClass}`.trim()
})

const Button = ({className, onClick = (() => ''), children, variant, link}) => {
    let baseColor = ''
    if(variant === 'primary'){
        baseColor = ' bg-primary'
    }else if(variant === 'secondary'){
        baseColor = ' bg-secondary'
    }
    const baseClass = 'lg:px-[20px] lg:py-[15px] md:px-[15px] md:py-[10px] px-[10px] py-[5px]   cursor-pointer' + baseColor;

    const finalClass = combineClass(baseClass, className);

  return (
    <button className={finalClass} onClick={onClick}>{children}</button>
  )
}

export default Button