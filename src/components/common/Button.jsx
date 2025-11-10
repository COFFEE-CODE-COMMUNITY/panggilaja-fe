import { Link } from "react-router-dom"

const combineClass = ((baseClass, customClass) => {
    return `${baseClass} ${customClass}`.trim()
})

const Button = ({className, onClick = (() => ''), children, variant, to}) => {
    let baseColor = ''
    if(variant === 'primary'){
        baseColor = ' bg-primary'
    }else if(variant === 'secondary'){
        baseColor = ' bg-secondary'
    }
    const baseClass = 'cursor-pointer' + baseColor;

    const finalClass = combineClass(baseClass, className);

  return (
    <>
      {!to ? (
        <button className={finalClass} onClick={onClick}>{children}</button>
      ) : (
        <Link 
          className={finalClass} onClick={onClick}
          to={to}
        >
          {children}
        </Link>
      )}
    </>
  )
}

export default Button