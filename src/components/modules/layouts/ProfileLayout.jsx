import React, { useEffect } from 'react'
import { Link, NavLink, Outlet, useOutletContext, useParams } from 'react-router-dom'
import Button from '../../common/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailServicesById, selectDetailService, selectDetailServiceStatus } from '../../../features/serviceSlice'

const ProfileLayout = () => {
    const {id} = useParams()

    const dispatch = useDispatch()
    const profile = useSelector(selectDetailService)
    const status = useSelector(selectDetailServiceStatus)

    useEffect(() => {
        if(id){
            dispatch(getDetailServicesById(id))
        }
    },[dispatch, id])

    const success = status === 'success'

    if(status === 'loading'){
        return (
            <div>Sedang memuat..</div>
        )
    }

    if(status === 'error'){
        return (
            <div>data error</div>
        )
    }

    if(!status){
        return (
            <div>data tidak ada</div>
        )
    }

  return (
    <div className='flex flex-col'>
        <div className='w-full h-[12vh] bg-amber-200'></div>
        <div className='flex w-full h-[83vh] gap-[10px] md:gap-[20px] lg:gap-[30px]'>
            <div className='w-1/4 h-full flex flex-col items-center lg:px-[20px] lg:py-[35px] md:px-[15px] md:py-[30px] px-[10px] py-[25px] gap-[15px]'>
              <div className='bg-amber-100 lg:w-[110px] lg:h-[110px] md:w-[90px] md:h-[90px] w-[75px] h-[75px] rounded-full'/>
              <div className='text-center'>
                <p className='lg:text-h3 md:text-h4 text-h5 leading-5 font-medium'>{success && profile.full_name}</p>
                <p className='md:text-h5 text-h6 font-light leading-5.5'>{success && profile.location_city}</p>
              </div>
              <Button variant='primary' className='md:text-h5 text-h6 text-white rounded-[20px] lg:w-[200px] md:w-[180px] w-[100px]'>Kontak Saya</Button>
              <div className='flex flex-col gap-[10px] lg:w-[200px] md:w-[180px] w-[100px]'>
                <p className='text-left md:text=h5 text-h6'>Ahli Dalam</p>
                <div>
                  <p className='px-[10px] py-[5px] border-2 border-gray-200 rounded-[20px] text-h6 w-fit'>Pertukangan</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col w-3/4'>
                <div className='w-full flex lg:gap-[40px] md:gap-[30px] gap-[20px] md:text-h5 text-h6 items-center lg:px-[30px] lg:py-[25px] px-[15px] py-[10px] font-medium'>
                  <NavLink 
                    to=''
                    end
                    className={({ isActive }) => 
                        isActive ? 'text-primary border-b-2 border-primary' : 'text-black'
                    }
                  >
                      Informasi
                  </NavLink>

                  <NavLink 
                    to='services'
                    className={({ isActive }) => 
                        isActive ? 'text-primary border-b-2 border-primary' : 'text-black'
                    }
                  >
                      Jasa
                  </NavLink>

                  <NavLink 
                    to='reviews'
                    className={({ isActive }) => 
                        isActive ? 'text-primary border-b-2 border-primary' : 'text-black'
                    }
                  >
                      Ulasan
                  </NavLink>

                  <NavLink 
                    to='photos'
                    className={({ isActive }) => 
                        isActive ? 'text-primary border-b-2 border-primary' : 'text-black'
                    }
                  >
                    Foto
                  </NavLink>

                </div>
                <div>
                    <Outlet context={{profileData : profile}}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileLayout