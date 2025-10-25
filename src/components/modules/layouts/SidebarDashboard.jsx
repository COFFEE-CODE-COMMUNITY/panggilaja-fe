import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import { useDispatch, useSelector } from "react-redux";
// import { changeAccountToBuyer, selectChangeAccountToBuyerStatus } from "../../../features/authSlice";
import { useEffect } from "react";
import { changeAccountToBuyer, selectChangeAccountToBuyerStatus } from "../../../features/authSlice";

export const SidebarDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const statusChange = useSelector(selectChangeAccountToBuyerStatus)
  useEffect(() => {
      if(statusChange === 'success'){
          navigate('/')
      }
  },[statusChange])

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
          onClick={() => dispatch(changeAccountToBuyer())}
        >Change Account</Button>
      </div>
    </div>
  );
};