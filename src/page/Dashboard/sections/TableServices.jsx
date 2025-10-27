import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../features/authSlice'
import { getAllServicesByIdSeller, selectSellerServices, selectSellerStatus } from '../../../features/sellerSlice'
import { Link } from 'react-router-dom'
import { deleteService, selectDeleteServiceStatus } from '../../../features/serviceSlice'

const TableServices = () => {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    const servicesSeller = useSelector(selectSellerServices)
    const status = useSelector(selectSellerStatus)

    const statusDelete = useSelector(selectDeleteServiceStatus)

    console.log(statusDelete)
    useEffect(() => {
        if(user?.id_seller){
            dispatch(getAllServicesByIdSeller(user.id_seller))
        }
    },[dispatch, user?.id_seller])

    useEffect(() => {
        if (statusDelete === 'success') {
            alert('Layanan berhasil dihapus!'); 
            if (user?.id_seller) {
                dispatch(getAllServicesByIdSeller(user.id_seller));
            }
        }
    }, [statusDelete, dispatch, user?.id_seller])


  return (
    <div className='h-full'>
        <table className='w-full table-auto text-left rounded-[15px] overflow-hidden'>
            <thead className='bg-gray-50'>
                <tr>
                    <th className='p-[10px] w-1/3'>Jasa</th>
                    <th className='p-[10px] w-1/3'>Status</th>
                    <th className='p-[10px] w-1/3'>Aksi</th>
                </tr>
            </thead>
            <tbody className='bg-gray-50/60'>
                {status === 'success' && servicesSeller.map((service) => (
                    <tr key={service.id}>
                        <td className='py-[15px] px-[10px]'>
                            <div className='flex gap-[15px] items-center'>
                                <div>
                                    <img src={service.foto_product} className='w-[100px] h-[100px] bg-amber-100'/>
                                </div>
                                <p className='w-full h-full'>{service.nama_jasa}</p>
                            </div>
                        </td>
                        <td className='py-[15px] px-[10px]'>
                            <span className='px-[10px] py-[5px] border-2 border-primary text-primary rounded-[45px]'>Aktif</span>
                        </td>
                        <td className='py-[15px] px-[10px]'>
                            <div className='flex gap-[5px]'>
                                <span 
                                    className='px-[10px] py-[5px] border-2 border-red-600 text-red-600 rounded-[45px] cursor-pointer'
                                    onClick={() => dispatch(deleteService(service.id))}
                                >        
                                Hapus</span>
                                <Link to={`edit-service/${service.id}`} className='px-[10px] py-[5px] border-2 border-yellow-600 text-yellow-600 rounded-[45px]'>Edit</Link>
                                <span className='px-[10px] py-[5px] border-2 border-primary text-primary rounded-[45px]'>Arsip</span>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default TableServices