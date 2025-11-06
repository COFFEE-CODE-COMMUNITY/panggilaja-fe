import React, { useEffect } from 'react'
import { Link, NavLink, Outlet,useParams } from 'react-router-dom'
import Button from '../../common/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getAllServicesByIdSeller, getSellerById, selectSelectedSeller, selectSellerServices, selectSellerStatus, selectServiceSellerStatus } from '../../../features/sellerSlice'
import Bannerr from '../../../assets/Bannerr.jpeg'

const ProfileLayout = () => {
    const {id} = useParams()

    const dispatch = useDispatch()
    const seller = useSelector(selectSelectedSeller)
    const status = useSelector(selectSellerStatus)

    const sellerService = useSelector(selectSellerServices)
    const sellerServiceStatus = useSelector(selectServiceSellerStatus)

    useEffect(() => {
      dispatch(getAllServicesByIdSeller(id))
    },[dispatch, id])

    useEffect(() => {
      if(id){
        dispatch(getSellerById(id))
      }
    },[id, dispatch])

    if (status === 'loading') {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
                    <p className='mt-4 text-gray-600'>Memuat data...</p>
                </div>
            </div>
        )
    }

    console.log(sellerServiceStatus)

    if(status === 'success'){
      const skills = seller?.kategori_toko.split(' & ')
      return(
        <div className='flex flex-col h-full '>
          <div className='w-full h-[12vh]' style={{
              backgroundImage : `url(${Bannerr})`,
              backgroundSize : 'cover' 
          }}></div>
          <div className='xl:px-[150px] lg:px-[100px] md:px-[55px] sm:px-[35px] px-[10px] sm:flex sm:flex-row flex-col w-full h-full gap-[10px] md:gap-[20px] lg:gap-[30px] mx-auto'>
            <div className='sm:h-full flex sm:flex-col sm:items-center lg:px-[20px] lg:py-[35px] md:px-[15px] md:py-[30px] px-[10px] sm:py-[25px] py-[15px] gap-[15px]'>
              <img src={seller?.foto_toko} className='bg-gray-200 lg:w-[110px] lg:h-[110px] md:w-[90px] md:h-[90px] w-[75px] h-[75px] rounded-full aspect-square'/>
              <div className='sm:text-center w-full'>
                <p className='lg:text-h3 md:text-h4 text-h5 font-medium w-full'>{seller?.nama_toko}</p>
                <p className='md:text-h5 text-h6 font-light'>Jalan cibaduyut</p>
              </div>
              <Button variant='primary' className='sm:block hidden md:text-h5 text-h6 text-white rounded-[40px] lg:w-[220px] md:w-[180px] w-[100px] py-[10px]'>Kontak Saya</Button>
              <div className='sm:flex hidden flex-col gap-[10px] lg:w-[200px] md:w-[180px] w-[100px]'>
                <p className='text-left md:text=h5 text-h6'>Ahli Dalam</p>
                <div className='w-full flex'>
                  {skills.map((skill) => (
                    <p className='px-[10px] py-[5px] border-2 border-gray-200 rounded-[20px] text-h6 w-fit'>{skill}</p>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className='flex flex-col sm:hidden gap-[10px]'>
                <div className='w-full flex'>
                  {skills.map((skill) => (
                    <p className='px-[10px] py-[5px] border-2 border-gray-200 rounded-[20px] text-h6 w-fit'>{skill}</p>
                  ))}
                </div>
                <Button variant='primary' className='md:text-h5 text-h6 text-white rounded-[40px] lg:w-[220px] md:w-[180px] py-[10px] w-full'>Kontak Saya</Button>
              </div>
            </div>
            <div className='flex flex-col sm:w-5/7 w-full sm:my-0 my-[10px]'>
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
                    <Outlet />
                </div>
            </div>
          </div>
        </div>
      )
    }
}

export default ProfileLayout