import { Link } from 'react-router-dom'
import bgAuth from '../../../assets/bgAuth.jpg'

const AuthLayout = ({title, subtitle, children, type, reset}) => {
  return (
    <div className='flex h-screen relative overflow-hidden'>
      <div className='w-full md:w-1/2 h-full'>
        <Link to='/' className='text-h4 lg:text-h3 font-bold cursor-pointer text-primary lg:p-[10px] md:p-[8px] px-[5px] py-[10px] pl-[10px] fixed top-0 left-0 z-100'>
          Panggil Aja
        </Link>
        <div className='flex justify-center items-center h-full rounded-tl-[40px] relative'>
          <div className='px-[30px] py-[20px] w-[532px] flex flex-col gap-[10px]'>
            <div>
              <h2 className='md:text-h3 text-h2  font-medium'>{title}</h2>
              <p className='md:text-h5 text-h6 lg:text-secondary '>{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>

      <div className='hidden md:block fixed top-0 bottom-0 right-0 md:w-1/2'>
        <div className='rounded-tl-[20px] rounded-bl-[20px] h-full w-full' style={{
          backgroundImage : `url(${bgAuth})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center',  
          backgroundRepeat: 'no-repeat'
        }}></div>
      </div>
    </div>
  )
}

export default AuthLayout