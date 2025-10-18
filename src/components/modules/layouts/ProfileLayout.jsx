import React, { useEffect } from 'react'
import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
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
        <div className='flex w-full h-[83vh]'>
            <div className='w-1/4 h-full flex flex-col items-center px-[10px] py-[25px] gap-[15px]'>
              <div className='bg-amber-100 w-[110px] h-[110px] rounded-full'/>
              <div className='text-center'>
                <p className='text-h3 font-medium'>{success && profile.full_name}</p>
                <p className='text-h5 font-light leading-5.5'>{success && profile.location_city}</p>
              </div>
              <Button variant='primary' className='text-h5 text-white rounded-[20px]'>Kontak Saya</Button>
              <div className='w-full flex flex-col gap-[10px]'>
                <p className='text-left'>Ahli Dalam</p>
                <div>
                  <p className='px-[10px] py-[5px] border-2 border-gray-200 rounded-[20px] text-h6 w-fit'>Pertukangan</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col w-full'>
                <div className='w-full h-[35px] flex gap-[40px] text-h5 items-center px-[30px] py-[25px] font-medium'>
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