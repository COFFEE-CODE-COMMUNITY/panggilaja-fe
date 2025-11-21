import React, { useEffect } from 'react'
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

  let lengthService = 0
  servicesSeller?.data?.map(() => {
    lengthService += 1
  })

  console.log(servicesSeller)
  return (
    <div class="grid grid-cols-3 gap-4 w-full">
      <div class="bg-white lg:p-8 md:p-6 p-4 rounded-lg shadow-md w-full">
        <div class="flex justify-between w-full md:items-end">
          <div class="flex flex-col">
            <p class=" text-h5 font-bold text-gray-500 mb-3 md:mb-6">
              Total Jasa
            </p>
            <p class="font-semibold text-xl md:text-3xl">
              {lengthService}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white lg:p-8 md:p-6 p-4 rounded-lg shadow-md w-full">
        <div class="flex justify-between w-full md:items-end">
          <div class="flex flex-col">
            <p class="font-bold text-h5 text-gray-500 mb-3 md:mb-6">
              Aktif
            </p>
            <p class="font-semibold text-xl md:text-3xl">
              {lengthService}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white lg:p-8 md:p-6 p-4 rounded-lg shadow-md w-full">
        <div class="flex justify-between w-full md:items-end">
          <div class="flex flex-col">
            <p class="text-h5 font-bold text-gray-500 mb-3 md:mb-6">
              Non Aktif
            </p>
            <p class="font-semibold text-xl md:text-3xl">
              0
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatCardService