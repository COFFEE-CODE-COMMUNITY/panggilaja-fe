import { NavLink } from "react-router-dom";

export const SidebarDashboard = () => {
  return (
    <div className="w-1/5 bg-white border-r border-gray-200 hidden lg:flex lg:flex-col lg:px-[15px] lg:py-[25px] gap-[15px] h-full fixed left-0">
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
  );
};