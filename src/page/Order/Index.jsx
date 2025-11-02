import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/common/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getServicesById, selectdServiceById, selectSelectedService, selectSelectedServiceStatus } from '../../features/serviceSlice'
import { useEffect, useState } from 'react'
import { selectCurrentUser } from '../../features/authSlice'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

const OrderPage = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const service = useSelector(selectSelectedService)
    const status = useSelector(selectSelectedServiceStatus)
    const user = useSelector(selectCurrentUser)

    const [detailMobile, setDetailMobile] = useState(false)

    let expand = ''

    if(detailMobile){
        expand = 'h-[100px] w-full'
    } else {
        expand = 'hidden'
    }

    if(status === 'loading')(
        <div>
            loading
        </div>
    )

    useEffect(() => {
        if(id){
            dispatch(getServicesById(id))
        }
    },[id, dispatch])

    console.log(user)

  return (
    <div className='min-h-screen py-[25px]'>
        <div className='w-full flex justify-center p-[20px]'>
            <div className='lg:w-7/10 md:w-8/10 w-full md:flex md:flex-row flex flex-col gap-[10px]'>
                <div className='md:hidden border-2 border-gray-100 px-[10px] py-[5px] flex flex-col gap-[10px]' onClick={() => setDetailMobile(!detailMobile)}>
                    <div className='flex items-center'>
                        <p className='w-full'>Detail Jasa</p>
                        {!detailMobile ? (
                            <FaChevronUp className='text-[15px] text-gray-600'/>
                        ) : (
                            <FaChevronDown className='text-[15px] text-gray-600'/>
                        )}
                    </div>
                    <div className={`flex gap-[5px] ${expand} transition-all duration-500 overflow-hidden gap-[15px]`}>
                        <img src={`${service.foto_product}`} className='w-1/3 object-cover rounded-[10px]'></img>
                        <div className='flex flex-col justify-center'>
                            <p>{service.nama_jasa}</p>
                            <p>{service.base_price} - {service.top_price}</p>
                        </div>
                    </div>
                </div>
                <div className='md:w-3/4 w-full md:h-full lg:px-[30px] md:px-[15px] px-[10px] lg:py-[25px] md:py-[10px] py-[5px] flex flex-col gap-[10px] border-2 border-gray-100'>
                    <div>
                        <div>
                            <p className=''>Alamat</p>
                            <div className='w-full px-[15px] py-[10px] bg-gray-50 rounded-[15px]'>
                                <div className='flex font-light gap-[20px]'>
                                    <p>{user.username}</p>
                                    <p className=''>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum, saepe id. Impedit porro quos aut fugit consequuntur aspernatur eos dignissimos!</p>
                                </div>
                            </div>
                            <form action="" className='flex flex-col gap-[15px]'>
                                <div className='flex flex-col'>
                                    <label htmlFor="Harga">Harga</label>
                                    <input type='number' placeholder='Masukkan penawaran harga' className='px-[15px] py-[10px] focus:bg-secondary/10 focus:outline-0 focus:shadow-sm rounded-[15px] border-2 border-gray-100'></input>
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="pesan">Pesan</label>
                                    <textarea name="pesan" id="pesan" placeholder='Masukkan pesan' className='h-[300px] border-2 border-gray-100 p-[15px] rounded-[15px] focus:bg-secondary/10 focus:outline-0 focus:shadow-sm'></textarea>
                                </div>
                                <Button variant='primary' className='text-white px-[20px] py-[15px] w-full rounded-[25px]'>
                                    Kirim
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='md:w-1/4 hidden h-full border-2 border-gray-100 px-[10px] py-[5px] md:flex md:flex-col gap-[10px]'>
                    <p>Detail Jasa</p>
                    <div className='flex flex-col gap-[5px] px-[10px]'>
                        <div 
                            className='w-full bg-amber-100 h-[200px] rounded-[15px]'
                            style={{
                                backgroundImage : `url(${service.foto_product})`,
                                backgroundPosition : 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}
                        ></div>
                        <div>
                            <p className='text-h4'>{service.nama_jasa}</p>
                            <p>{service.base_price} - {service.top_price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderPage