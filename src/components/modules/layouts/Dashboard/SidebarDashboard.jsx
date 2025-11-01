import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeAccount, resetChangeAccountStatus, selectChangeAccountMessage, selectChangeAccountStatus } from "../../../../features/authSlice";

export const SidebarDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const statusChange = useSelector(selectChangeAccountStatus)
  const messageChange = useSelector(selectChangeAccountMessage)
  
  useEffect(() => {
      if(statusChange === 'success'){
          dispatch(resetChangeAccountStatus())
          navigate('/')
      }
  },[statusChange])

  if (statusChange === 'loading') {
    return (
        <div className='z-100 bg-white flex justify-center items-center min-h-screen fixed w-full'>
            <div className='text-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
                <p className='mt-4 text-gray-600'>Memuat data...</p>
            </div>
        </div>
    )
  }
  return (
    <div className="w-1/5 bg-white border-r border-gray-200 hidden lg:flex lg:flex-col lg:px-[15px] lg:py-[25px] h-full fixed left-0">
      <div className="h-full flex flex-col gap-[15px]">
        <NavLink 
          to={null} 
          end
          className={({ isActive }) => 
            isActive ? 'px-[20px] py-[15px] rounded-[35px] bg-gray-50' : 'text-black px-[20px] py-[15px] font-light'
        }>
            Kelola Pesanan
        </NavLink>
        <NavLink 
          to='manage-services' 
          className={({ isActive }) => 
            isActive ? 'px-[20px] py-[15px] rounded-[35px] bg-gray-50' : 'text-black px-[20px] py-[15px] font-light'
        }>
            Kelola Jasa
        </NavLink>
        <NavLink 
          to='manage-profile' 
          className={({ isActive }) => 
            isActive ? 'px-[20px] py-[15px] rounded-[35px] bg-gray-50' : 'text-black px-[20px] py-[15px] font-light'
        }>
            Kelola Profile
        </NavLink>
      </div>
      <div>
        <Button 
          variant='primary'
          className='w-full text-white py-[10px] rounded-[25px]'
          onClick={() => dispatch(changeAccount({targetRole : "buyer"}))}
        >Change Account</Button>
      </div>
    </div>
  );
};