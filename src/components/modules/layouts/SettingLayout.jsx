import React from 'react'
import { FaArrowRight, FaUser, FaRegHeart, FaClipboardList } from 'react-icons/fa'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

const SettingLayout = () => {
  const location = useLocation()
  const isRootSetting = location.pathname === '/setting'

  return (
    <div className='md:h-[calc(100vh-140px)] min-h-screen md:min-h-0'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full'>
        <div className='flex flex-col md:flex-row gap-8 h-full'>
          {/* sidebar */}
          <div className={`md:w-64 flex-shrink-0 ${!isRootSetting ? 'hidden md:block' : 'block'} h-full`}>
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full md:h-auto'>
              <nav className='flex flex-col p-2'>
                <NavLink
                  to='profile'
                  className={({ isActive }) => `
                                    flex items-center justify-between p-3 rounded-lg transition-all duration-200
                                    ${isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                                `}
                >
                  <div className='flex items-center gap-3'>
                    <FaUser size={18} />
                    <span>Profil Saya</span>
                  </div>
                  <FaArrowRight size={14} className='opacity-50' />
                </NavLink>
                <NavLink
                  to='favorite'
                  className={({ isActive }) => `
                                    flex items-center justify-between p-3 rounded-lg transition-all duration-200
                                    ${isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                                `}
                >
                  <div className='flex items-center gap-3'>
                    <FaRegHeart size={18} />
                    <span>Favorit</span>
                  </div>
                  <FaArrowRight size={14} className='opacity-50' />
                </NavLink>
                <NavLink
                  to='order'
                  className={({ isActive }) => `
                                    flex items-center justify-between p-3 rounded-lg transition-all duration-200
                                    ${isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                                `}
                >
                  <div className='flex items-center gap-3'>
                    <FaClipboardList size={18} />
                    <span>Pesanan</span>
                  </div>
                  <FaArrowRight size={14} className='opacity-50' />
                </NavLink>
                {/* nambah fitur jika ada */}
              </nav>
            </div>
          </div>

          {/* isi placeholder */}
          <div className={`flex-1 ${isRootSetting ? 'hidden md:block' : 'block'} md:h-full md:overflow-y-auto scrollbar-hide pb-20 md:pb-0`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingLayout