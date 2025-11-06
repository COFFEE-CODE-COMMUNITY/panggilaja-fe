import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../features/authSlice'
import { getAllServicesByIdSeller, resetServiceSeller, selectSellerServices, selectSellerStatus, selectServiceSellerStatus } from '../../../features/sellerSlice'
import { Link } from 'react-router-dom'
import { deleteService, resetDeleteStatus, selectDeleteServiceStatus } from '../../../features/serviceSlice'
import Button from '../../../components/common/Button'

const TableServices = () => {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    const servicesSeller = useSelector(selectSellerServices)
    const status = useSelector(selectServiceSellerStatus)

    const statusDelete = useSelector(selectDeleteServiceStatus)

    useEffect(() => {
        if (user && user.id_seller) { 
            dispatch(getAllServicesByIdSeller(user.id_seller));
        }
    }, [dispatch, user]); 

    useEffect(() => {
        if (statusDelete === 'success') {
            alert('Layanan berhasil dihapus!'); 
            if (user?.id_seller) {
                dispatch(getAllServicesByIdSeller(user?.id_seller));
                dispatch(resetDeleteStatus())
                dispatch(resetServiceSeller())
            }
        }
    }, [dispatch, statusDelete])

    console.log(servicesSeller)
  return (
    <div className="flex flex-col gap-2">
        <div className='flex justify-end'>
            <Link to={`/dashboard/manage-services/add-service`}>
                <Button
                    variant='primary'
                    className='px-5 py-2 text-white rounded-xl'
                >
                    Tambah Jasa
                </Button>
            </Link>
        </div>
    {/* Table */}
        <table className="w-full text-left border border-gray-400 rounded-xl overflow-hidden">
            {/* Header */}
            <thead className="bg-primary text-white font-bold ">
                <tr>
                <th className="p-4 w-[20%] col-span-2">
                    Gambar
                </th>
                <th className="px-4 py-3 w-[15%]">
                    Nama
                </th>
                <th className="px-4 py-3 w-[18%]">Title 03</th>
                <th className="px-4 py-3 w-[15%]">Title 04</th>
                <th className="px-4 py-3 w-[22%]">Title 01</th>
                <th className="px-4 py-3 w-[10%]"></th>
                </tr>
            </thead>
            {/* Body */}
            <tbody>
                {servicesSeller?.data.map((service) => (
                    <tr className="border-t border-gray-400 ">
                        <td className="px-4 py-3  w-[20%]">
                            <div className="flex items-center space-x-2 w-full">
                                <img src={service?.foto_product} />
                            </div>
                        </td>
                        <td className="px-4 py-3 w-[15%] align-text-top">
                            {service.nama_jasa}
                        </td>
                        <td className="px-4 py-3 w-[18%] align-text-top">Placeholder</td>
                        <td className="px-4 py-3 w-[15%] align-text-top">
                            <div className="w-full flex items-center">
                            <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                            <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                            <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>
                            <div className="bg-gray-100 rounded-full h-7 w-7 border border-white -mx-0.5"></div>

                            <span className="-ml-0.5 bg-gray-100 border border-white flex items-center justify-center rounded-full h-7 w-7 text-xs">
                                +5
                            </span>
                            </div>
                        </td>
                        <td className="px-4 py-3 w-[22%] align-text-top">
                            <div className="bg-gray-100 w-full h-1 rounded-full"></div>
                        </td>
                        <td className="px-4 py-3 w-[10%] align-text-top">
                            <div className=" flex w-full justify-end">
                            <button className="flex flex-col gap-y-1 text-black hover:text-gray-600 mr-5">
                                <span className="bg-black h-1 w-1 rounded-full"></span>
                                <span className="bg-black h-1 w-1 rounded-full"></span>
                                <span className="bg-black h-1 w-1 rounded-full"></span>
                            </button>
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