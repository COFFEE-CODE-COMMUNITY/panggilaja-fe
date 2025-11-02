import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeAccount, resetChangeAccountStatus, selectChangeAccountMessage, selectChangeAccountStatus, selectCurrentUser } from "../../../../features/authSlice";
import { FaRegComment, FaShoppingCart, FaUser } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import { getSellerById, selectSelectedSeller } from "../../../../features/sellerSlice";

export const SidebarDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(selectCurrentUser)

  const sellerProfile = useSelector(selectSelectedSeller)

  const statusChange = useSelector(selectChangeAccountStatus)
  const messageChange = useSelector(selectChangeAccountMessage)
  
  const [mouseEnter, setMouseEnter] = useState(false)

  useEffect(() => {
    if(user && user.id_seller){
      dispatch(getSellerById(user.id_seller))
    }
  },[dispatch, user.id_seller])

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
    <div 
      className="w-[100px] hover:w-1/5  border-r border-gray-200 hidden lg:flex lg:flex-col lg:px-[10px] lg:py-[25px] h-screen sticky left-0 transition-all duration-500 z-100"
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
    >
      <div className={`h-full flex flex-col gap-[15px] ${!setMouseEnter ? 'items-center' : ''}`}>
        <NavLink 
          to={null} 
          end
          className={({ isActive }) => 
            isActive ? 'px-[20px] py-[15px] rounded-[35px] bg-gray-50' : 'text-black px-[20px] py-[15px] font-light'
        }>
          {mouseEnter ? <span className="flex items-center gap-[15px]"><FaShoppingCart/>Kelola Pesanan</span> : <FaShoppingCart/>}
        </NavLink>
        <NavLink 
          to='manage-services' 
          className={({ isActive }) => 
            isActive ? 'px-[20px] py-[15px] rounded-[35px] bg-gray-50' : 'text-black px-[20px] py-[15px] font-light'
        }>
          {mouseEnter ? <span className="flex items-center gap-[15px]"><FaGears/>Kelola Jasa</span> : <FaGears/>}
        </NavLink>
        <NavLink 
          to='manage-profile' 
          className={({ isActive }) => 
            isActive ? 'px-[20px] py-[15px] rounded-[35px] bg-gray-50' : 'text-black px-[20px] py-[15px] font-light'
        }>
          {mouseEnter ? <span className="flex items-center gap-[15px]"><FaUser/>Kelola Profile</span> : <FaUser/>}
        </NavLink>
        <NavLink 
          to='chat' 
          className={({ isActive }) => 
            isActive ? 'px-[20px] py-[15px] rounded-[35px] bg-gray-50' : 'text-black px-[20px] py-[15px] font-light'
        }>
          {mouseEnter ? <span className="flex items-center gap-[15px]"><FaRegComment/>Pesan</span> : <FaRegComment/>}
        </NavLink>
      </div>
      <div className="flex justify-center">
        {mouseEnter ? (
          <div className="flex w-full gap-[5px]">
            {sellerProfile?.foto_toko ? (
              <>
                <div 
                  className="w-[50px] aspect-square rounded-full bg-gray-50 p-[15px]"
                  style={{
                    backgroundImage : `url(${sellerProfile?.foto_toko})`,
                    backgroundPosition : 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                /> 
                <Button 
                  variant='primary'
                  className='w-full text-white py-[10px] rounded-[25px]'
                  onClick={() => dispatch(changeAccount({targetRole : "buyer"}))}
                >
                  Ganti Akun
                </Button>
              </>
            ) : (
              <>
                <div className="w-[50px] aspect-square rounded-full bg-gray-50 p-[15px]">
                  <FaUser className="text-2xl"/>
                </div>
                <Button 
                  variant='primary'
                  className='w-full text-white py-[10px] rounded-[25px]'
                  onClick={() => dispatch(changeAccount({targetRole : "buyer"}))}
                >
                  Ganti Akun
                </Button>
              </>
            )}
          </div>
        ) : (
          <>
            {sellerProfile?.foto_toko ? (
              <div 
                className="w-[50px] aspect-square rounded-full bg-gray-50 p-[15px]"
                style={{
                  backgroundImage : `url(${sellerProfile?.foto_toko})`,
                  backgroundPosition : 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              /> 
            ) : (
              <div className="aspect-square rounded-full bg-gray-50 p-[15px]">
                <FaUser className="text-2xl"/>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};