import React, { useEffect, useState } from 'react'
import { selectCurrentUser } from '../../../features/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getAllServicesByIdSeller, selectSellerServices, selectServiceSellerStatus } from '../../../features/sellerSlice'
import { selectDeleteServiceStatus } from '../../../features/serviceSlice'

const StatCardService = () => {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const servicesSeller = useSelector(selectSellerServices)
  const status = useSelector(selectServiceSellerStatus)

  useEffect(() => {
    if (user && user.id_seller) {
      dispatch(getAllServicesByIdSeller(user.id_seller));
    }
  }, [dispatch, user]);

  const [isArtificialLoading, setIsArtificialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsArtificialLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  let lengthService = 0
  servicesSeller?.data?.map(() => {
    lengthService += 1
  })

  if (status === 'loading' || isArtificialLoading) {
    return (
      <div className="grid grid-cols-3 gap-4 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white lg:p-8 md:p-6 p-4 rounded-lg shadow-md w-full animate-pulse">
            <div className="flex justify-between w-full md:items-end">
              <div className="flex flex-col w-full">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-3 md:mb-6"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  console.log(servicesSeller)
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      <div className="bg-white lg:p-8 md:p-6 p-4 rounded-lg shadow-md w-full">
        <div className="flex justify-between w-full md:items-end">
          <div className="flex flex-col">
            <p className=" text-h5 font-bold text-gray-500 mb-3 md:mb-6">
              Total Jasa
            </p>
            <p className="font-semibold text-xl md:text-3xl">
              {lengthService}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white lg:p-8 md:p-6 p-4 rounded-lg shadow-md w-full">
        <div className="flex justify-between w-full md:items-end">
          <div className="flex flex-col">
            <p className="font-bold text-h5 text-gray-500 mb-3 md:mb-6">
              Aktif
            </p>
            <p className="font-semibold text-xl md:text-3xl">
              {lengthService}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white lg:p-8 md:p-6 p-4 rounded-lg shadow-md w-full">
        <div className="flex justify-between w-full md:items-end">
          <div className="flex flex-col">
            <p className="text-h5 font-bold text-gray-500 mb-3 md:mb-6">
              Non Aktif
            </p>
            <p className="font-semibold text-xl md:text-3xl">
              0
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatCardService